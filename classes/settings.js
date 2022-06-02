let gameOptions = {
  gemSize: 100,
  fallSpeed: 100,
  destroySpeed: 200,
  offsetX: 50,
  offsetY: 250,
  gameMode: 'time', //moves, challenge
  defaultTime: 60,



}
let extraObjects = [
  {
    id: 0,
    name: 'Health',
    index: 0,
    type: 'collect'
  },
  {
    id: 1,
    name: 'Time',
    index: 1,
    type: 'collect'
  },
  {
    id: 2,
    name: 'Ammo',
    index: 2,
    type: 'collect'
  },
  {
    id: 3,
    name: 'Power',
    index: 3,
    type: 'objective'
  },
  {
    id: 4,
    name: 'Laptop',
    index: 4,
    type: 'objective'
  },
  {
    id: 5,
    name: 'Satalite Dish',
    index: 5,
    type: 'objective'
  },
  {
    id: 6,
    name: 'WiFi',
    index: 6,
    type: 'objective'
  },
  {
    id: 7,
    name: 'Security Camera',
    index: 7,
    type: 'objective'
  },
  {
    id: 8,
    name: 'Server',
    index: 8,
    type: 'objective'
  },
  {
    id: 9,
    name: 'Alarm Keypad',
    index: 9,
    type: 'objective'
  },
  {
    id: 10,
    name: 'Documents',
    index: 10,
    type: 'objective'
  }

]
let easy = true
let gameMode = 'map'
let onMission = 0
let onPractice = 0
let onMap = 0
let gameData;
var defaultValues = {
  easy: true,
  map: 0,
  mission: 0,
  missions: [
    {
      id: 0,
      scoreEasy: 0,
      scoreHard: 0,
      completeEasy: false,
      completeHard: false
    }
  ],
  practice: [
    {
      highScore: 0,
      numTargets: 0,
      easy: true
    },
    {
      highScore: 0,
      numTargets: 0,
      easy: true
    },
    {
      highScore: 0,
      numTargets: 0,
      easy: true
    }
  ],
  practiceHard: [
    {
      highScore: 0,
      numTargets: 0,
      easy: false
    },
    {
      highScore: 0,
      numTargets: 0,
      easy: false
    },
    {
      highScore: 0,
      numTargets: 0,
      easy: false
    }
  ],
  onPractice: 0,

}