"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Smile, Flame, Baby, Copy, RefreshCw, Shuffle } from "lucide-react";

// Pickup lines organized by category
const pickupLinesData = {
  romantic: {
    name: "Romantic",
    icon: Heart,
    color: "from-rose-500 to-pink-500",
    lines: [
      "Are you a magician? Because whenever I look at you, everyone else disappears.",
      "Do you have a map? I keep getting lost in your eyes.",
      "If you were a flower, you'd be a damnnation rose.",
      "Is your name Wi-Fi? Because I'm feeling a connection.",
      "Do you believe in love at first sight, or should I walk by again?",
      "Are you a camera? Because every time I look at you, I smile.",
      "I must be a snowflake, because I've fallen for you.",
      "Do you have a Band-Aid? I just scraped my knee falling for you.",
      "Are you made of Copper and Tellurium? Because you are CuTe.",
      "If looks could kill, you'd definitely be a weapon of mass destruction.",
      "I think I need a library card, because I'm checking you out.",
      "Is it hot in here or is that just your smile?",
      "You must be a parking ticket, because you've got 'fine' written all over you.",
      "Are you a bank loan? Because you've got my interest.",
      "My doctor says I'm lacking Vitamin U.",
      "Did it hurt when you fell from the clouds?",
      "I believe in following my dreams... and my dreams say I should talk to you.",
      "You must be tired from running through my mind all night.",
      "If you were a fruit, you'd be a Fine-apple.",
      "I think I lost my phone number. Can I have yours instead?"
    ]
  },
  funny: {
    name: "Funny",
    icon: Smile,
    color: "from-yellow-500 to-orange-500",
    lines: [
      "Are you a keyboard? Because you're my type.",
      "Do you have a name, or can I call you mine?",
      "I'm not a photographer, but I can picture us together.",
      "Do you like pizza? Because you're my kinda hot.",
      "Are you a dictionary? Because you add meaning to my life.",
      "Is this the Hogwarts Express? Because you're taking my breath away.",
      "Do you have a name, or can I call you 'future spouse'?",
      "I'm not a weather forecaster, but I can see us having a sunny future.",
      "Are you a loan? Because you've got my interest.",
      "Do you have a map? I keep getting lost in the supermarket of love.",
      "I'm not an architect, but I'd love to build a future with you.",
      "Are you made of chocolate? Because you're sweet and I'd like to nibble on you.",
      "Do you believe in love at first sight, or should I send you a meme first?",
      "Is your name Google? Because you've got everything I'm searching for.",
      "I must be a snowflake, because winter is coming and I still think about you.",
      "Are you a USB cable? Because you're exactly what I've been looking for.",
      "Do you have a Band-Aid? I just got hurt falling for your personality.",
      "I'm not a vampire, but I can't stop thinking about you at night.",
      "Are you a time machine? Because I can see us in the future.",
      "I think I need a doctor, because I've fallen for you and it hurts so good."
    ]
  },
  flirty: {
    name: "Flirty",
    icon: Flame,
    color: "from-red-500 to-orange-500",
    lines: [
      "On a scale of 1 to America, how free are you tonight?",
      "Is it illegal to stare at you, or can I get a permit?",
      "I must be a snowstorm, because I've been blowing through your mind.",
      "Are you a firework? Because you make my heart explode.",
      "Do you have a name, or can I whisper it all night?",
      "I'd offer you a cheesy pickup line, but you're worth the cheese.",
      "Is your name WIFI? Because I'm feeling a connection.",
      "Are you a parking spot? Because you're fine.",
      "Do you have a sun? Because you brighten my world.",
      "I could tell you a secret, but I'd rather whisper sweet nothings in your ear.",
      "Are you made of copper and tellurium? Because you're CuTe.",
      "My lips are like skittles. Want to taste the rainbow?",
      "If I could rearrange the alphabet, I'd put U and I together.",
      "Are you a 90-degree angle? Because you look right.",
      "Do you have a name, or can I call you 'mine' tonight?",
      "I must be a magician, because every time I look at you, everyone else disappears.",
      "Are you an alien? Because you just abducted my heart.",
      "Do you believe in fate? Because I think we were meant to match.",
      "Is your name Jessica? Because you're so sweet.",
      "I have a date with you... how does tonight sound?"
    ]
  },
  cute: {
    name: "Cute",
    icon: Baby,
    color: "from-pink-400 to-rose-400",
    lines: [
      "Are you a donut? Because I want to dunk you in my coffee.",
      "Do you have a name, or can I call you cutie?",
      "I think I need a map, because I keep getting lost in your smile.",
      "Are you made of sugar? Because you're so sweet.",
      "I must be a cupcake, because you're my sweet treat.",
      "Do you have a moment? Because I'd like to make you smile.",
      "Are you a rainbow? Because you make my world colorful.",
      "I think I found what I'm looking for... and it's you.",
      "Do you have a name, or can I call you 'sweetheart'?",
      "Are you a teddy bear? Because you're huggable.",
      "I could stare at you all day and never get tired.",
      "Are you made of sunshine? Because you brighten my day.",
      "Do you have a map? I keep getting lost in your eyes.",
      "I think my phone is broken... it doesn't have your number in it.",
      "Are you a flower? Because you make my heart bloom.",
      "I must be a photographer, because I can see us together.",
      "Do you have a name, or can I call you 'beautiful'?",
      "Are you a kitten? Because you're purrfect.",
      "I think I'm falling for you... catch me?",
      "Are you made of magic? Because everything looks better when you're around."
    ]
  },
  cheesy: {
    name: "Cheesy",
    icon: Shuffle,
    color: "from-purple-500 to-pink-500",
    lines: [
      "Are you a cheeseburger? Because you're a-melt-ing.",
      "Do you have a name, or can I call you Nachos? Because you're extra cheesy.",
      "I must be a cheese wheel, because I'm falling for you (and I'm pretty cheesy).",
      "Are you a pizza? Because you're making me pepperoni my feelings.",
      "Do you have a name, or can I call you 'Gouda' girl?",
      "I think we have chemistry... can I have your number?",
      "Are you a French fry? Because I'd like to ketchup with you.",
      "Do you believe in love at first site, or should I walk by again with flowers?",
      "I must be a snowflake, because I've been falling for you all winter.",
      "Are you a bank? Because I'm interest-ed in you.",
      "Do you have a name, or can I call you my future?",
      "I think I'm lost. Can you give me directions to your heart?",
      "Are you a candle? Because you're giving me butterflies.",
      "I must be a cookie, because you're sweet and I'd like to take you home.",
      "Do you have a moment? I've been saving it for you.",
      "Are you a song? Because you're stuck in my head.",
      "I could say cheese, but I'd rather say you're amazing.",
      "Are you a fairy? Because you've got me under your spell.",
      "I must be a garden, because I'm growing feelings for you.",
      "Do you have a name, or can I call you 'the one'?"
    ]
  }
};

type Category = keyof typeof pickupLinesData;

export default function PickupLinesPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("romantic");
  const [currentLine, setCurrentLine] = useState("");
  const [copied, setCopied] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const getRandomLine = (category: Category) => {
    const lines = pickupLinesData[category].lines;
    const randomIndex = Math.floor(Math.random() * lines.length);
    return lines[randomIndex];
  };

  const handleNewLine = () => {
    setIsAnimating(true);
    setCurrentLine("");
    setTimeout(() => {
      setCurrentLine(getRandomLine(selectedCategory));
      setIsAnimating(false);
    }, 150);
  };

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
    setCurrentLine(getRandomLine(category));
    setCopied(false);
  };

  const handleCopy = async () => {
    if (currentLine) {
      await navigator.clipboard.writeText(currentLine);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Initialize with a random line
  useState(() => {
    setCurrentLine(getRandomLine("romantic"));
  });

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-rose-500" />
            <h1 className="text-4xl md:text-5xl font-display text-rose-600">
              Pickup Lines
            </h1>
            <Sparkles className="w-8 h-8 text-rose-500" />
          </div>
          <p className="text-rose-400 text-lg">
            Spice up your conversation with the perfect line! 💕
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {Object.entries(pickupLinesData).map(([key, data]) => {
            const Icon = data.icon;
            const isSelected = selectedCategory === key;
            return (
              <button
                key={key}
                onClick={() => handleCategoryChange(key as Category)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300
                  ${isSelected
                    ? `bg-gradient-to-r ${data.color} text-white shadow-lg scale-105`
                    : "bg-white/60 text-rose-500 hover:bg-white/80"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {data.name}
              </button>
            );
          })}
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12"
        >
          {/* Pickup Line Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentLine}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className={`
                min-h-[180px] flex items-center justify-center text-center
                ${isAnimating ? "opacity-0" : "opacity-100"}
              `}
            >
              <p className="text-2xl md:text-3xl font-display text-rose-600 leading-relaxed">
                {currentLine || "Click the button to get a pickup line! 💕"}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNewLine}
              className={`
                flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold
                bg-gradient-to-r ${pickupLinesData[selectedCategory].color}
                shadow-lg hover:shadow-xl transition-all
              `}
            >
              <RefreshCw className="w-5 h-5" />
              New Pickup Line
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              disabled={!currentLine}
              className={`
                flex items-center gap-2 px-6 py-4 rounded-full font-semibold
                ${copied
                  ? "bg-green-500 text-white"
                  : "bg-rose-100 text-rose-600 hover:bg-rose-200"
                }
                transition-all disabled:opacity-50
              `}
            >
              <Copy className="w-5 h-5" />
              {copied ? "Copied! ✓" : "Copy"}
            </motion.button>
          </div>
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-white/60 rounded-2xl p-6"
        >
          <h3 className="text-xl font-display text-rose-600 mb-4 text-center">
            💡 Tips for Using Pickup Lines
          </h3>
          <ul className="space-y-2 text-rose-500 max-w-2xl mx-auto">
            <li className="flex items-start gap-2">
              <span className="text-rose-400">•</span>
              <span>Confidence is key! Deliver your line with a smile.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400">•</span>
              <span>Read the room and choose appropriate lines for the situation.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400">•</span>
              <span>Don't take yourself too seriously - have fun with it!</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400">•</span>
              <span>Eye contact and a genuine smile go a long way.</span>
            </li>
          </ul>
        </motion.div>

        {/* Decorative Hearts */}
        <div className="fixed top-20 left-10 opacity-10 pointer-events-none">
          <Heart className="w-24 h-24 fill-rose-500 text-rose-500" />
        </div>
        <div className="fixed bottom-20 right-10 opacity-10 pointer-events-none">
          <Heart className="w-32 h-32 fill-rose-500 text-rose-500" />
        </div>
      </div>
    </div>
  );
}
