// Random Couple Nickname Generator Algorithm

// Cute words list
const cuteWords = [
  "Love","Honey","Sweet","Moon","Star","Angel","Baby","Heart","Snuggle","Bunny",
  "Sugar","Cherry","Cuddle","Peach","Magic","Darling","Sweetie","Precious","Beloved",
  "Treasure","Gem","Jewel","Sunshine","Starlight","Moonbeam","Radiant","Bliss",
  "Dream","Wonder","Joy","Delight","Charm","Grace","Beauty","Elegance","Romance",
  "Passion","Spark","Flame","Fire","Eden","Paradise","Haven","Serenity","Peace",
  "Harmony","Unity","Forever","Always","Eternal","Infinite","Cosmic","Divine",
  "Sacred","Pure","Gentle","Tender","Loving","Sweet","Kind","Faithful","True",
  "Honest","Loyal","Devoted","Adore","Cherish","Admire","Embrace","Whisper","Echo",
  "Melody","Harmony","Symphony","Dance","Waltz","Tango","Kiss","Caress","Touch",
  "Hold","Embrace","Wings","Feathers","Dove","Swan","Phoenix","Butterfly","Blossom",
  "Rose","Lily","Iris","Tulip","Daisy","Petal","Fragrance","Aroma","Glow",
  "Shimmer","Glimmer","Sparkle"
];

// Ending words
const endings = [
  "Bears","Hearts","Lovers","Birds","Souls","Stars","Angels","Couple","Pair","Duo",
  "Butterflies","Doves","Swans","Flowers","Petals","Roses","Dreams","Wishes",
  "Tales","Chronicles","Bliss","Eden","Paradise","Forever","Always","Eternity",
  "Infinity","Cosmos","Galaxy","Universe","Harmony","Symphony","Melody","Rhythm",
  "Dance","Waltz","Tango","Flames","Sparks","Glimmer","Radiance","Light",
  "Sunshine","Moonlight","Starlight","Aurora","Twilight","Dawn","Dusk","Sunset",
  "Sunrise","Rainbow","Gem","Jewels","Treasures","Crown","Royalty","King","Queen",
  "Prince","Princess","Knight","Fairy","Nymph","Sprite","Whispers","Echoes",
  "Secrets","Promises","Vows","Bonds","Ties","Knots","Wings","Feathers","Nest",
  "Garden","Haven","Sanctuary","Temple","Palace","Castle","Tower","Isle","Ocean",
  "Sea","Tide","Wave","Stream","River","Aqua","Pearl","Coral","Shell","Voyage",
  "Journey","Quest","Adventure","Escape","Wanderers","Dreamers","Believers",
  "Seekers","Finders","Keepers","Guardians","Protectors","Companions","Friends",
  "Soulmates"
];

/**
 * Sanitize input to allow only alphabetical characters.
 */
function sanitize(value) {
  return value.trim().replace(/[^a-zA-Z]/g, "");
}

// Generate fully random nickname
export function generateRandomNickname() {
  const randomCute =
    cuteWords[Math.floor(Math.random() * cuteWords.length)];

  const randomEnding =
    endings[Math.floor(Math.random() * endings.length)];

  return randomCute + randomEnding;
}

// Generate nickname from two names
export function generateNicknameFromNames(name1, name2) {
  const clean1 = sanitize(name1);
  const clean2 = sanitize(name2);

  if (!clean1 || !clean2) {
    return generateRandomNickname();
  }

  const half1 = clean1.substring(0, Math.ceil(clean1.length / 2));
  const half2 = clean2.substring(Math.floor(clean2.length / 2));

  const combined = half1 + half2;

  const randomEnding =
    endings[Math.floor(Math.random() * endings.length)];

  return combined + randomEnding;
}

// Master function
export function generateCoupleNickname(name1 = "", name2 = "") {
  const clean1 = sanitize(name1);
  const clean2 = sanitize(name2);

  if (clean1 && clean2) {
    return generateNicknameFromNames(clean1, clean2);
  }

  return generateRandomNickname();
}
