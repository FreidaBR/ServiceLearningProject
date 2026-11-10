'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Camera, CameraOff, Hand, RotateCcw } from 'lucide-react'
import type { HandLandmarker } from '@mediapipe/tasks-vision'
import { pillClass } from '@/components/site/primitives'

const MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task'
const VISION_WASM_URL = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.2.2/wasm'
const NUMBER_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five']
const HOLD_TO_ANSWER_MS = 850
const FEEDBACK_MS = 1100

function distance(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.hypot(a.x - b.x, a.y - b.y)
}

function countFingers(landmarks: { x: number; y: number }[]) {
  const wrist = landmarks[0]
  let count = 0

  if (
    distance(landmarks[4], landmarks[5]) >
    distance(landmarks[3], landmarks[5]) * 1.12
  ) {
    count += 1
  }

  for (const [tip, pip] of [
    [8, 6],
    [12, 10],
    [16, 14],
    [20, 18],
  ]) {
    if (
      landmarks[tip].y < landmarks[pip].y &&
      distance(landmarks[tip], wrist) > distance(landmarks[pip], wrist)
    ) {
      count += 1
    }
  }

  return count
}

function cameraErrorMessage(error: unknown) {
  if (error instanceof DOMException) {
    if (error.name === 'NotAllowedError' || error.name === 'SecurityError') {
      return 'Camera access was blocked. Allow camera access in your browser settings, then try again.'
    }
    if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
      return 'No camera was found. Connect a camera and try again.'
    }
    if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
      return 'The camera could not start. Close other apps using it and try again.'
    }
  }
  return error instanceof Error ? error.message : 'The camera or hand model could not start. Please try again.'
}

export function FingerNumberGame() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const landmarkerRef = useRef<HandLandmarker | null>(null)
  const animationRef = useRef<number | null>(null)
  const nextNumberTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const targetRef = useRef(0)
  const matchStartedAtRef = useRef<number | null>(null)
  const feedbackUntilRef = useRef(0)
  const answeredRef = useRef(false)
  const scoreRef = useRef(0)

  const [target, setTarget] = useState(0)
  const [detected, setDetected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState('Press start when you are ready.')

  const stopCamera = useCallback(() => {
    if (animationRef.current !== null) cancelAnimationFrame(animationRef.current)
    animationRef.current = null
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
    landmarkerRef.current?.close()
    landmarkerRef.current = null
    if (nextNumberTimeoutRef.current) clearTimeout(nextNumberTimeoutRef.current)
    nextNumberTimeoutRef.current = null
    setIsActive(false)
    setIsLoading(false)
    setDetected(null)
    matchStartedAtRef.current = null
    answeredRef.current = false
  }, [])

  useEffect(() => stopCamera, [stopCamera])

  function chooseNextNumber(previous: number) {
    const choices = NUMBER_WORDS.map((_, index) => index).filter((number) => number !== previous)
    const next = choices[Math.floor(Math.random() * choices.length)]
    targetRef.current = next
    setTarget(next)
    return next
  }

  async function startCamera() {
    setError(null)
    setIsLoading(true)
    setMessage('Starting the camera and loading the hand model…')

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error('Camera access needs a secure connection (HTTPS) or localhost.')
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
      })
      streamRef.current = stream

      const video = videoRef.current
      if (!video) throw new Error('The camera preview is not ready. Please try again.')
      video.srcObject = stream
      await video.play()

      const { FilesetResolver, HandLandmarker } = await import('@mediapipe/tasks-vision')
      const vision = await FilesetResolver.forVisionTasks(VISION_WASM_URL)
      landmarkerRef.current = await HandLandmarker.createFromOptions(vision, {
        baseOptions: { modelAssetPath: MODEL_URL },
        runningMode: 'VIDEO',
        numHands: 1,
      })

      scoreRef.current = 0
      setScore(0)
      targetRef.current = 0
      setTarget(0)
      setIsActive(true)
      setIsLoading(false)
      setMessage('Hold your hand upright with your palm facing the camera.')

      let lastDetectionAt = 0
      const detectFrame = () => {
        const currentVideo = videoRef.current
        const landmarker = landmarkerRef.current
        if (!currentVideo || !landmarker || currentVideo.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
          animationRef.current = requestAnimationFrame(detectFrame)
          return
        }

        const now = performance.now()
        if (now - lastDetectionAt < 80) {
          animationRef.current = requestAnimationFrame(detectFrame)
          return
        }
        lastDetectionAt = now

        let fingerCount: number | null
        try {
          const result = landmarker.detectForVideo(currentVideo, now)
          const landmarks = result.landmarks[0]
          fingerCount = landmarks ? countFingers(landmarks) : null
        } catch (detectionError) {
          stopCamera()
          setError(detectionError instanceof Error ? detectionError.message : 'Hand detection stopped unexpectedly.')
          setMessage('Hand detection stopped.')
          return
        }
        setDetected((previous) => (previous === fingerCount ? previous : fingerCount))

        if (now >= feedbackUntilRef.current && fingerCount === targetRef.current) {
          matchStartedAtRef.current ??= now
          if (now - matchStartedAtRef.current >= HOLD_TO_ANSWER_MS && !answeredRef.current) {
            answeredRef.current = true
            matchStartedAtRef.current = null
            feedbackUntilRef.current = now + FEEDBACK_MS
            scoreRef.current += 1
            setScore(scoreRef.current)
            const completedNumber = targetRef.current
            setMessage(`Great job! You showed ${NUMBER_WORDS[completedNumber]} correctly.`)
            nextNumberTimeoutRef.current = setTimeout(() => {
              const next = chooseNextNumber(completedNumber)
              answeredRef.current = false
              setMessage(`Now show ${NUMBER_WORDS[next]} fingers.`)
            }, FEEDBACK_MS)
          }
        } else if (fingerCount !== targetRef.current) {
          matchStartedAtRef.current = null
          answeredRef.current = false
        }

        animationRef.current = requestAnimationFrame(detectFrame)
      }

      animationRef.current = requestAnimationFrame(detectFrame)
    } catch (startError) {
      stopCamera()
      setError(cameraErrorMessage(startError))
      setMessage('Camera not started.')
    }
  }

  function restart() {
    stopCamera()
    setError(null)
    scoreRef.current = 0
    setScore(0)
    setTarget(0)
    targetRef.current = 0
    setMessage('Press start when you are ready.')
  }

  return (
    <section className="rounded-[2rem] bg-card p-5 shadow-sm md:p-8" aria-label="Finger number game">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="inline-flex items-center gap-2 font-semibold text-primary">
          <Hand className="size-5" aria-hidden="true" />
          Numbers learned: {score}
        </p>
        {isActive && (
          <button type="button" onClick={restart} className={pillClass('outline', 'py-2')}>
            <RotateCcw className="size-4" aria-hidden="true" /> Start over
          </button>
        )}
      </div>

      <div className="mt-6 grid items-center gap-6 md:grid-cols-[1fr_1.2fr]">
        <div className="rounded-3xl bg-[#eef4e8] p-6 text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Show this number</p>
          <p className="mt-2 font-serif text-8xl leading-none text-primary" aria-live="polite">
            {target}
          </p>
          <p className="mt-2 text-2xl font-semibold capitalize text-primary">{NUMBER_WORDS[target]}</p>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Hold up that many fingers, with your palm facing the camera and fingers pointing up.
          </p>
        </div>

        <div>
          <div className="overflow-hidden rounded-3xl bg-primary">
            <video
              ref={videoRef}
              className="aspect-[4/3] w-full -scale-x-100 object-cover"
              autoPlay
              muted
              playsInline
              aria-label="Mirrored camera preview for finger number recognition"
            />
            {!isActive && (
              <div className="grid aspect-[4/3] place-items-center px-6 text-center text-primary-foreground">
                <div>
                  <Camera className="mx-auto size-10" aria-hidden="true" />
                  <p className="mt-3 font-semibold">Your camera preview will appear here</p>
                  <p className="mt-1 text-sm text-primary-foreground/75">Video is processed on this device only.</p>
                </div>
              </div>
            )}
          </div>
          <p className="mt-3 min-h-6 text-center text-sm font-medium text-primary" aria-live="polite">
            {message}
          </p>
          {detected !== null && isActive && (
            <p className="text-center text-sm text-muted-foreground" aria-live="polite">
              Fingers detected: {detected}
            </p>
          )}
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-5 rounded-xl bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {!isActive && (
          <button
            type="button"
            onClick={startCamera}
            disabled={isLoading}
            className={pillClass('primary', 'px-7 py-3')}
          >
            <Camera className="size-4" aria-hidden="true" />
            {isLoading ? 'Loading…' : 'Start camera'}
          </button>
        )}
        {isActive && (
          <button type="button" onClick={stopCamera} className={pillClass('outline', 'px-7 py-3')}>
            <CameraOff className="size-4" aria-hidden="true" /> Stop camera
          </button>
        )}
      </div>
      <p className="mt-5 text-center text-xs leading-5 text-muted-foreground">
        Camera use is optional. Your video is analyzed on this device and is not recorded or uploaded. Allow camera
        access only with a parent or teacher nearby.
      </p>
    </section>
  )
}
