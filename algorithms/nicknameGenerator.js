// Random Couple Nickname Generator Algorithm

// Cute words list
const cuteWords = [
    "Love",
    "Honey",
    "Sweet",
    "Moon",
    "Star",
    "Angel",
    "Baby",
    "Heart",
    "Snuggle",
    "Bunny",
    "Sugar",
    "Cherry",
    "Cuddle",
    "Peach",
    "Magic",
    "Darling",
    "Sweetie",
    "Precious",
    "Beloved",
    "Treasure",
    "Gem",
    "Jewel",
    "Sunshine",
    "Starlight",
    "Moonbeam",
    "Radiant",
    "Bliss",
    "Dream",
    "Wonder",
    "Joy",
    "Delight",
    "Charm",
    "Grace",
    "Beauty",
    "Elegance",
    "Romance",
    "Passion",
    "Spark",
    "Flame",
    "Fire",
    "Eden",
    "Paradise",
    "Haven",
    "Serenity",
    "Peace",
    "Harmony",
    "Unity",
    "Forever",
    "Always",
    "Eternal",
    "Infinite",
    "Cosmic",
    "Divine",
    "Sacred",
    "Pure",
    "Gentle",
    "Tender",
    "Loving",
    "Sweet",
    "Kind",
    "Faithful",
    "True",
    "Honest",
    "Loyal",
    "Devoted",
    "Adore",
    "Cherish",
    "Admire",
    "Embrace",
    "Whisper",
    "Echo",
    "Melody",
    "Harmony",
    "Symphony",
    "Dance",
    "Waltz",
    "Tango",
    "Kiss",
    "Caress",
    "Touch",
    "Hold",
    "Embrace",
    "Wings",
    "Feathers",
    "Dove",
    "Swan",
    "Phoenix",
    "Butterfly",
    "Blossom",
    "Rose",
    "Lily",
    "Iris",
    "Tulip",
    "Daisy",
    "Petal",
    "Fragrance",
    "Aroma",
    "Glow",
    "Shimmer",
    "Glimmer",
    "Sparkle"
];


// Animal / ending words
const endings = [
    "Bears",
    "Hearts",
    "Lovers",
    "Birds",
    "Souls",
    "Stars",
    "Angels",
    "Couple",
    "Pair",
    "Duo",
    "Butterflies",
    "Doves",
    "Swans",
    "Flowers",
    "Petals",
    "Roses",
    "Dreams",
    "Wishes",
    "Tales",
    "Chronicles",
    "Bliss",
    "Eden",
    "Paradise",
    "Forever",
    "Always",
    "Eternity",
    "Infinity",
    "Cosmos",
    "Galaxy",
    "Universe",
    "Harmony",
    "Symphony",
    "Melody",
    "Rhythm",
    "Dance",
    "Waltz",
    "Tango",
    "Flames",
    "Sparks",
    "Glimmer",
    "Radiance",
    "Light",
    "Sunshine",
    "Moonlight",
    "Starlight",
    "Aurora",
    "Twilight",
    "Dawn",
    "Dusk",
    "Sunset",
    "Sunrise",
    "Rainbow",
    "Gem",
    "Jewels",
    "Treasures",
    "Crown",
    "Royalty",
    "King",
    "Queen",
    "Prince",
    "Princess",
    "Knight",
    "Fairy",
    "Nymph",
    "Sprite",
    "Whispers",
    "Echoes",
    "Secrets",
    "Promises",
    "Vows",
    "Bonds",
    "Ties",
    "Knots",
    "Wings",
    "Feathers",
    "Nest",
    "Garden",
    "Haven",
    "Sanctuary",
    "Temple",
    "Palace",
    "Castle",
    "Tower",
    "Isle",
    "Ocean",
    "Sea",
    "Tide",
    "Wave",
    "Stream",
    "River",
    "Aqua",
    "Pearl",
    "Coral",
    "Shell",
    "Voyage",
    "Journey",
    "Quest",
    "Adventure",
    "Escape",
    "Wanderers",
    "Dreamers",
    "Believers",
    "Seekers",
    "Finders",
    "Keepers",
    "Guardians",
    "Protectors",
    "Companions",
    "Friends",
    "Soulmates"
];


// Function: Generate fully random nickname
export function generateRandomNickname() {

  const randomCute =
    cuteWords[Math.floor(Math.random() * cuteWords.length)];

  const randomEnding =
    endings[Math.floor(Math.random() * endings.length)];

  return randomCute + randomEnding;
}

// Function: Generate nickname from two names
export function generateNicknameFromNames(name1, name2) {

  if (!name1 || !name2) {
    return generateRandomNickname();
  }

  // Clean names
  name1 = name1.trim();
  name2 = name2.trim();

  // Split names in half
  const half1 = name1.substring(0, Math.ceil(name1.length / 2));
  const half2 = name2.substring(Math.floor(name2.length / 2));

  const combined = half1 + half2;

  // Optional cute ending
  const randomEnding =
    endings[Math.floor(Math.random() * endings.length)];

  return combined + randomEnding;
}

// Master function: supports both modes
export function generateCoupleNickname(name1 = "", name2 = "") {

  // If both names provided → use name combination
  if (name1 && name2) {
    return generateNicknameFromNames(name1, name2);
  }

  // Otherwise → generate fully random nickname
  return generateRandomNickname();
}
