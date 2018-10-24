const characters = [
  {
    /* ===== Madame Zostra ===== */
    cid: 1,
    name: 'Madame Zostra',
    image: {
      name: 'blue_1.png',
      knowledge: {
        default: 4,
        min: { x: 293, y: 308 },
        max: { x: 335, y: 180 },
        steps: [0, 1, 3, 4, 4, 4, 5, 6, 6],
      },
      might: {
        default: 4,
        min: { x: 83, y: 152 },
        max: { x: 191, y: 74 },
        steps: [0, 2, 3, 3, 4, 5, 5, 5, 6],
      },
      sanity: {
        default: 3,
        min: { x: 323, y: 152 },
        max: { x: 215, y: 72 },
        steps: [0, 4, 4, 4, 5, 6, 7, 8, 8],
      },
      speed: {
        default: 3,
        min: { x: 111, y: 308 },
        max: { x: 71, y: 178 },
        steps: [0, 2, 3, 3, 5, 5, 6, 6, 7],
      },
    },
    age: 37,
    birthday: { m: 12, d: 10 },
    height: 152,
    weight: 68,
    hobbies: [
      'Astrology',
      'Cooking',
      'Baseball',
    ],
  },

  /* ===== Vivian Lopez ===== */
  {
    cid: 2,
    name: 'Vivian Lopez',
    image: {
      name: 'blue_2.png',
      knowledge: {
        default: 4,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 4, 5, 5, 5, 5, 6, 6, 7],
      },
      might: {
        default: 3,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 2, 2, 2, 4, 4, 5, 6, 6],
      },
      sanity: {
        default: 3,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 4, 4, 4, 5, 6, 7, 8, 8],
      },
      speed: {
        default: 4,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 3, 4, 4, 4, 4, 6, 7, 8],
      },
    },
    age: 42,
    birthday: { m: 1, d: 11 },
    height: 165,
    weight: 64.4,
    hobbies: [
      'Old Movies',
      'Horses',
    ],
  },

  /* ===== Brandon Jaspers ===== */
  {
    cid: 3,
    name: 'Brandon Jaspers',
    image: {
      name: 'green_1.png',
      knowledge: {
        default: 3,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 1, 3, 3, 5, 5, 6, 6, 7],
      },
      might: {
        default: 4,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 2, 3, 3, 4, 5, 6, 6, 7],
      },
      sanity: {
        default: 4,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 3, 3, 3, 4, 5, 6, 7, 8],
      },
      speed: {
        default: 3,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 3, 4, 4, 4, 5, 6, 7, 8],
      },
    },
    age: 12,
    birthday: { m: 5, d: 21 },
    height: 155,
    weight: 49.4,
    hobbies: [
      'Computers',
      'Camping',
      'Hockey',
    ],
  },

  /* ===== Peter Akimoto ===== */
  {
    cid: 4,
    name: 'Peter Akimoto',
    image: {
      name: 'green_2.png',
      knowledge: {
        default: 3,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 3, 4, 4, 5, 6, 7, 7, 8],
      },
      might: {
        default: 3,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 2, 3, 3, 4, 5, 5, 6, 8],
      },
      sanity: {
        default: 4,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 3, 4, 4, 4, 5, 6, 6, 7],
      },
      speed: {
        default: 4,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 3, 3, 3, 4, 6, 6, 7, 7],
      },
    },
    age: 13,
    birthday: { m: 9, d: 3 },
    height: 150,
    weight: 44.5,
    hobbies: [
      'Bugs',
      'Basketball',
    ],
  },

  /* ===== Heather Granville ===== */
  {
    cid: 5,
    name: 'Heather Granville',
    image: {
      name: 'purple_1.png',
      knowledge: {
        default: 5,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 2, 3, 3, 4, 5, 6, 7, 8],
      },
      might: {
        default: 3,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 3, 3, 3, 4, 5, 6, 7, 8],
      },
      sanity: {
        default: 3,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 3, 3, 3, 4, 5, 6, 6, 6],
      },
      speed: {
        default: 3,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 3, 3, 4, 5, 6, 6, 7, 8],
      },
    },
    age: 18,
    birthday: { m: 8, d: 2 },
    height: 158,
    weight: 54.4,
    hobbies: [
      'Television',
      'Shopping',
    ],
  },

  /* ===== Jenny LeClerc ===== */
  {
    cid: 6,
    name: 'Jenny LeClerc',
    image: {
      name: 'purple_2.png',
      knowledge: {
        default: 3,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 2, 3, 3, 4, 4, 5, 6, 8],
      },
      might: {
        default: 3,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 3, 4, 4, 4, 4, 5, 6, 8],
      },
      sanity: {
        default: 5,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 1, 1, 2, 4, 4, 4, 5, 6],
      },
      speed: {
        default: 4,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 2, 3, 4, 4, 4, 5, 6, 8],
      },
    },
    age: 21,
    birthday: { m: 3, d: 4 },
    height: 170,
    weight: 64.4,
    hobbies: [
      'Reading',
      'Soccer',
    ],
  },

  /* ===== Darrin "Flash" Williams ===== */
  {
    cid: 7,
    name: 'Darrin "Flash" Williams',
    image: {
      name: 'red_1.png',
      knowledge: {
        default: 3,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 2, 3, 3, 4, 5, 5, 5, 7],
      },
      might: {
        default: 3,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 2, 3, 3, 4, 5, 6, 6, 7],
      },
      sanity: {
        default: 3,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 1, 2, 3, 4, 5, 5, 5, 7],
      },
      speed: {
        default: 5,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 4, 4, 4, 5, 6, 7, 7, 8],
      },
    },
    age: 20,
    birthday: { m: 6, d: 6 },
    height: 180,
    weight: 85.3,
    hobbies: [
      'Track',
      'Music',
      'Shakespearean Literature',
    ],
  },

  /* ===== Ox Bellows ===== */
  {
    cid: 8,
    name: 'Ox Bellows',
    image: {
      name: 'red_2.png',
      knowledge: {
        default: 3,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 2, 2, 3, 3, 5, 5, 6, 6],
      },
      might: {
        default: 3,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 4, 5, 5, 6, 6, 7, 8, 8],
      },
      sanity: {
        default: 5,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 2, 2, 3, 4, 5, 5, 6, 7],
      },
      speed: {
        default: 4,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 2, 2, 2, 3, 4, 5, 5, 6],
      },
    },
    age: 23,
    birthday: { m: 10, d: 18 },
    height: 193,
    weight: 130.6,
    hobbies: [
      'Football',
      'Shiny Objects',
    ],
  },

  /* ===== Professor Longfellow ===== */
  {
    cid: 9,
    name: 'Professor Longfellow',
    image: {
      name: 'white_1.png',
      knowledge: {
        default: 5,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 4, 5, 5, 5, 5, 6, 7, 8],
      },
      might: {
        default: 3,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 1, 2, 3, 4, 5, 5, 6, 6],
      },
      sanity: {
        default: 3,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 1, 3, 3, 4, 5, 5, 6, 7],
      },
      speed: {
        default: 4,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 2, 2, 4, 4, 5, 5, 6, 6],
      },
    },
    age: 57,
    birthday: { m: 7, d: 27 },
    height: 180,
    weight: 69.4,
    hobbies: [
      'Gaelic Music',
      'Drama',
      'Fine Wines',
    ],
  },

  /* ===== Father Rhinehardt ===== */
  {
    cid: 10,
    name: 'Father Rhinehardt',
    image: {
      name: 'purple_2.png',
      knowledge: {
        default: 4,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 1, 3, 3, 4, 5, 6, 6, 8],
      },
      might: {
        default: 3,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 1, 2, 2, 4, 4, 5, 5, 7],
      },
      sanity: {
        default: 5,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 3, 4, 5, 5, 6, 7, 7, 8],
      },
      speed: {
        default: 3,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 2, 3, 3, 4, 5, 6, 7, 7],
      },
    },
    age: 62,
    birthday: { m: 4, d: 29 },
    height: 175,
    weight: 83.9,
    hobbies: [
      'Fencing',
      'Gardening',
    ],
  },

  /* ===== Zoe Ingstrom ===== */
  {
    cid: 11,
    name: 'Zoe Ingstrom',
    image: {
      name: 'yellow_1.png',
      knowledge: {
        default: 3,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 1, 2, 3, 4, 4, 5, 5, 5],
      },
      might: {
        default: 4,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 2, 2, 3, 3, 4, 4, 6, 7],
      },
      sanity: {
        default: 3,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 3, 4, 5, 5, 6, 6, 7, 8],
      },
      speed: {
        default: 4,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 4, 4, 4, 4, 5, 6, 8, 8],
      },
    },
    age: 8,
    birthday: { m: 11, d: 5 },
    height: 114,
    weight: 22.2,
    hobbies: [
      'Dolls',
      'Music',
    ],
  },

  /* ===== Missy Dubourde ===== */
  {
    cid: 12,
    name: 'Missy Dubourde',
    image: {
      name: 'yellow_2.png',
      knowledge: {
        default: 4,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 2, 3, 4, 4, 5, 6, 6, 6],
      },
      might: {
        default: 4,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 2, 3, 3, 3, 4, 5, 6, 7],
      },
      sanity: {
        default: 3,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 1, 2, 3, 4, 5, 5, 6, 7],
      },
      speed: {
        default: 3,
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
        steps: [0, 3, 4, 5, 6, 6, 6, 7, 7],
      },
    },
    age: 9,
    birthday: { m: 2, d: 14 },
    height: 127,
    weight: 28.1,
    hobbies: [
      'Swimming',
      'Medicine',
    ],
  },
];

export default characters;
