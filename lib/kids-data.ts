export type QuizQuestion = { question: string; options: string[]; answer: number; fact: string }
export type QuizTopic = { id: string; title: string; blurb: string; questions: QuizQuestion[] }

export const quizTopics: QuizTopic[] = [
  {
    id: 'animals',
    title: 'Amazing Animals',
    blurb: 'How well do you know our furry, scaly and feathery friends?',
    questions: [
      { question: 'Which animal is known as the "King of the Jungle"?', options: ['Elephant', 'Lion', 'Tiger', 'Bear'], answer: 1, fact: 'Lions actually live in grasslands, not jungles!' },
      { question: 'What is a baby kangaroo called?', options: ['Cub', 'Kit', 'Joey', 'Pup'], answer: 2, fact: 'A joey lives in a cosy pouch for about 6 months.' },
      { question: 'Which bird is India’s national bird?', options: ['Parrot', 'Peacock', 'Sparrow', 'Eagle'], answer: 1, fact: 'Peacocks spread their colourful feathers to dance.' },
      { question: 'How many legs does a spider have?', options: ['6', '8', '10', '4'], answer: 1, fact: 'Spiders are arachnids, not insects - insects have 6 legs.' },
      { question: 'Which animal is the largest on Earth?', options: ['Blue whale', 'Elephant', 'Giraffe', 'Shark'], answer: 0, fact: 'A blue whale’s heart is as big as a small car!' },
    ],
  },
  {
    id: 'planet',
    title: 'Our Green Planet',
    blurb: 'Learn how to look after the Earth we all share.',
    questions: [
      { question: 'What do plants need to make their food?', options: ['Sunlight', 'Moonlight', 'Music', 'Sand'], answer: 0, fact: 'This process is called photosynthesis.' },
      { question: 'Which of these can be recycled?', options: ['Banana peel', 'Plastic bottle', 'Used tissue', 'Chewing gum'], answer: 1, fact: 'Banana peels are better for compost!' },
      { question: 'What gas do trees give out that we breathe?', options: ['Carbon dioxide', 'Oxygen', 'Helium', 'Smoke'], answer: 1, fact: 'One big tree can give oxygen for up to 4 people.' },
      { question: 'What should you do when you leave a room?', options: ['Open the fridge', 'Switch off the lights', 'Turn on the fan', 'Run the tap'], answer: 1, fact: 'Saving electricity helps the planet stay cool.' },
      { question: 'Which planet do we live on?', options: ['Mars', 'Venus', 'Earth', 'Jupiter'], answer: 2, fact: 'Earth is the only planet known to have life.' },
    ],
  },
  {
    id: 'safety',
    title: 'Stay Safe Heroes',
    blurb: 'Smart choices that keep you and your friends safe.',
    questions: [
      { question: 'If you get lost in a crowd, what should you do?', options: ['Run around looking', 'Stay where you are and find a police officer or shop worker', 'Go home alone', 'Hide'], answer: 1, fact: 'Your safety tag helps the helper reach the right people fast!' },
      { question: 'Should you share your home address with strangers online?', options: ['Yes', 'Only if they are nice', 'No, never', 'Only on weekends'], answer: 2, fact: 'Always ask a trusted adult before sharing anything online.' },
      { question: 'Which number can you call for help in an emergency in India?', options: ['112', '555', '000', '789'], answer: 0, fact: '112 connects you to police, fire and ambulance help.' },
      { question: 'Before crossing the road, you should…', options: ['Close your eyes', 'Look left, right, and left again', 'Run fast', 'Play a game'], answer: 1, fact: 'Always use the zebra crossing when you can.' },
      { question: 'Who is a “trusted adult”?', options: ['Anyone with sweets', 'A teacher, carer, or police officer', 'Someone you just met', 'A cartoon character'], answer: 1, fact: 'Make a list of your trusted adults with your teacher.' },
    ],
  },
  {
    id: 'kindness',
    title: 'Kindness Club',
    blurb: 'Small acts of kindness make a big difference.',
    questions: [
      { question: 'A new kid is sitting alone at lunch. What can you do?', options: ['Ignore them', 'Invite them to sit with you', 'Laugh', 'Take their lunch'], answer: 1, fact: 'Being included makes people feel they belong.' },
      { question: 'Which word is a kind word?', options: ['Silly', 'Thank you', 'Go away', 'Boring'], answer: 1, fact: '“Please” and “thank you” are magic words!' },
      { question: 'Your friend is sad. What helps?', options: ['Listen to them', 'Walk away', 'Tease them', 'Shout'], answer: 0, fact: 'Listening is one of the kindest things you can do.' },
      { question: 'How can you help a street dog on a hot day?', options: ['Throw stones', 'Leave a bowl of water', 'Chase it', 'Shout at it'], answer: 1, fact: 'Our “Feed a Dog” drive helps animals every year.' },
      { question: 'Sharing toys with others is…', options: ['Kind', 'Unfair', 'Scary', 'Boring'], answer: 0, fact: 'Our Toy Drives share thousands of toys with children!' },
    ],
  },
]

export const memoryEmojis = [
  { id: 'sun', label: 'Sun', char: 'Sun' },
  { id: 'tree', label: 'Tree', char: 'Tree' },
  { id: 'fish', label: 'Fish', char: 'Fish' },
  { id: 'star', label: 'Star', char: 'Star' },
  { id: 'heart', label: 'Heart', char: 'Heart' },
  { id: 'bird', label: 'Bird', char: 'Bird' },
]

export const wordList = [
  { word: 'APPLE', hint: 'A red or green fruit' },
  { word: 'TIGER', hint: 'India’s national animal' },
  { word: 'RIVER', hint: 'Flowing water' },
  { word: 'SMILE', hint: 'What you do when you are happy' },
  { word: 'PLANT', hint: 'It grows from a seed' },
  { word: 'FRIEND', hint: 'Someone you love to play with' },
  { word: 'SCHOOL', hint: 'Where you learn every day' },
  { word: 'RAINBOW', hint: 'Seven colours in the sky' },
  { word: 'KINDNESS', hint: 'Being nice and caring' },
  { word: 'ELEPHANT', hint: 'Big animal with a trunk' },
]

export const learnCards = [
  { letter: 'A', word: 'Ant', fact: 'Ants can carry 50 times their own weight.' },
  { letter: 'B', word: 'Butterfly', fact: 'Butterflies taste with their feet.' },
  { letter: 'C', word: 'Cloud', fact: 'Clouds are made of tiny water drops.' },
  { letter: 'D', word: 'Dolphin', fact: 'Dolphins sleep with one eye open.' },
  { letter: 'E', word: 'Earth', fact: 'Earth spins once every 24 hours.' },
  { letter: 'F', word: 'Frog', fact: 'Frogs drink water through their skin.' },
  { letter: 'G', word: 'Giraffe', fact: 'A giraffe’s tongue is about 50 cm long.' },
  { letter: 'H', word: 'Honey', fact: 'Honey never goes bad.' },
  { letter: 'I', word: 'Ice', fact: 'Ice floats because it is lighter than water.' },
  { letter: 'J', word: 'Jackfruit', fact: 'Jackfruit is the biggest tree fruit in the world.' },
  { letter: 'K', word: 'Kite', fact: 'Kites were invented over 2,000 years ago.' },
  { letter: 'L', word: 'Lotus', fact: 'The lotus is India’s national flower.' },
]
