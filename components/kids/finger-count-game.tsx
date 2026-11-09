'use client'

import { HandLandmarker, FilesetResolver } from '@mediapipe/tasks-vision'
import { Camera, Hand, RotateCcw, Sparkles } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

const MODEL_URL = 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task'
const WASM_URL = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22/wasm'

function countRaisedFingers(landmarks: { x: number; y: number }[], handedness: string) {
  const fingers = [
    landmarks[8].y < landmarks[6].y,
    landmarks[12].y < landmarks[10].y,
    landmarks[16].y < landmarks[14].y,
    landmarks[20].y < landmarks[18].y,
  ]
  const thumb = handedness === 'Right' ? landmarks[4].x < landmarks[3].x : landmarks[4].x > landmarks[3].x
  return Number(thumb) + fingers.filter(Boolean).length
}

export function FingerCountGame() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const landmarkerRef = useRef<HandLandmarker | null>(null)
  const animationRef = useRef<number | null>(null)
  const solvedRef = useRef(false)
  const [cameraOn, setCameraOn] = useState(false)
  const [detected, setDetected] = useState<number | null>(null)
  const [target, setTarget] = useState(() => Math.floor(Math.random() * 5) + 1)
  const [score, setScore] = useState(0)
  const [status, setStatus] = useState('Show one hand to the camera')
  const [error, setError] = useState<string | null>(null)

  const nextTarget = useCallback(() => {
    setTarget((current) => {
      const next = Math.floor(Math.random() * 5) + 1
      return next === current ? (next % 5) + 1 : next
    })
    solvedRef.current = false
    setDetected(null)
    setStatus('Show the new number with your fingers')
  }, [])

  useEffect(() => {
    let stream: MediaStream | null = null
    let cancelled = false

    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false })
        if (cancelled || !videoRef.current) return
        videoRef.current.srcObject = stream
        await videoRef.current.play()
        const vision = await FilesetResolver.forVisionTasks(WASM_URL)
        landmarkerRef.current = await HandLandmarker.createFromOptions(vision, {
          baseOptions: { modelAssetPath: MODEL_URL, delegate: 'GPU' },
          runningMode: 'VIDEO',
          numHands: 1,
        })
        setCameraOn(true)
      } catch {
        setError('Camera access is needed for this game. Please allow the camera and try again.')
      }
    }

    void startCamera()
    return () => {
      cancelled = true
      stream?.getTracks().forEach((track) => track.stop())
    }
  }, [cameraOn])

  useEffect(() => {
    if (!cameraOn) return
    const detect = () => {
      const video = videoRef.current
      const landmarker = landmarkerRef.current
      if (video && landmarker && video.readyState >= 2) {
        const result = landmarker.detectForVideo(video, performance.now())
        if (result.landmarks[0]) {
          const handedness = result.handedness[0]?.[0]?.categoryName ?? 'Right'
          const count = countRaisedFingers(result.landmarks[0], handedness)
          setDetected(count)
          if (count === target) {
            if (!solvedRef.current) {
              solvedRef.current = true
              setScore((current) => current + 1)
            }
            setStatus('That is it. Great counting!')
          } else {
            setStatus(`You showed ${count}. Try showing ${target}.`)
          }
        } else {
          setDetected(null)
          setStatus('I can’t see a hand yet')
        }
      }
      animationRef.current = requestAnimationFrame(detect)
    }
    animationRef.current = requestAnimationFrame(detect)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [cameraOn, target])

  useEffect(() => () => {
    landmarkerRef.current?.close()
  }, [])

  return (
    <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm">
      <div className="grid gap-8 p-5 md:grid-cols-[1.15fr_.85fr] md:p-8">
        <div className="relative aspect-video overflow-hidden rounded-3xl bg-[#183a2c]">
          <video ref={videoRef} className="size-full object-cover [transform:scaleX(-1)]" playsInline muted aria-label="Camera view for counting fingers" />
          {!cameraOn && !error && <div className="absolute inset-0 grid place-items-center text-center text-white"><div><Camera className="mx-auto size-10 opacity-80" aria-hidden="true" /><p className="mt-3 text-sm">Starting the hand camera…</p></div></div>}
          {error && <div className="absolute inset-0 grid place-items-center p-6 text-center text-white"><div><Hand className="mx-auto size-10 text-[#f5d77d]" aria-hidden="true" /><p className="mt-3 text-sm leading-6">{error}</p></div></div>}
          <div className="absolute left-4 top-4 rounded-full bg-black/45 px-3 py-1 text-xs font-semibold text-white backdrop-blur">MediaPipe hand tracking</div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-semibold uppercase tracking-[.18em] text-sage">Your challenge</p>
            <p className="text-sm font-semibold text-muted-foreground">Score {score}</p>
          </div>
          <div className="mt-4 flex items-end gap-3">
            <span className="font-serif text-8xl leading-none text-primary">{target}</span>
            <span className="pb-2 text-lg text-muted-foreground">fingers</span>
          </div>
          <p className="mt-5 min-h-12 text-lg leading-7 text-primary">{status}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={nextTarget} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
              <RotateCcw className="size-4" aria-hidden="true" /> New number
            </button>
            {detected !== null && <span className="inline-flex items-center gap-2 rounded-full bg-[#eef4e8] px-4 py-3 text-sm font-semibold text-primary"><Sparkles className="size-4" aria-hidden="true" /> I see {detected}</span>}
          </div>
          <p className="mt-5 text-xs leading-5 text-muted-foreground">Camera processing happens in your browser. Nothing is recorded or uploaded.</p>
        </div>
      </div>
    </div>
  )
}
