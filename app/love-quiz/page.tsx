"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const questions = [
    {
        question: "Who said 'I love you' first?",
        options: ["Me", "My partner", "Both together", "Not yet"],
    },
    {
        question: "Favorite activity together?",
        options: ["Watching movies", "Traveling", "Chatting", "Gaming"],
    },
    {
        question: "How often do you talk?",
        options: ["All day", "Every few hours", "Once a day", "Rarely"],
    },
    {
        question: "What's your relationship status?",
        options: ["Dating", "Engaged", "Married", "Complicated"],
    },
    {
        question: "How long have you been together?",
        options: ["Less than a year", "1-2 years", "3-5 years", "5+ years"],
    },
    {
        question: "Do you see a future together?",
        options: ["Definitely", "Probably", "Maybe", "Not sure"],
    },
    {
        question: "Best quality about your partner?",
        options: ["Kindness", "Humor", "Intelligence", "Loyalty"],
    },
    {
        question: "How do you celebrate together?",
        options: ["Dinner dates", "Surprises", "Quiet time", "Adventures"],
    },
    {
        question: "What's your love language?",
        options: ["Words", "Acts of service", "Gifts", "Quality time"],
    },
    {
        question: "How supportive are they?",
        options: ["Extremely", "Very", "Somewhat", "Not much"],
    },
];
function AnimatedCupid({ captured, setCaptured }: { captured: boolean; setCaptured: (value: boolean) => void }) {

    const [realMouse, setRealMouse] = useState({ x: 300, y: 300 });
    const [fakeMouse, setFakeMouse] = useState({ x: 300, y: 300 });
    const [cupidPos, setCupidPos] = useState({ x: 100, y: 100 });

    // track real mouse
    useEffect(() => {

        const move = (e: MouseEvent) => {
            setRealMouse({
                x: e.clientX,
                y: e.clientY
            });
        };

        window.addEventListener("mousemove", move);

        return () => window.removeEventListener("mousemove", move);

    }, []);

    // main animation loop
    useEffect(() => {

        const normalSpeed = 0.05;
        const captureSpeed = 0.02;

        const loop = () => {

            setCupidPos(prev => {

                const target = captured ? fakeMouse : realMouse;

                const dx = target.x - prev.x;
                const dy = target.y - prev.y;

                const dist = Math.sqrt(dx*dx + dy*dy);

                // capture detection
                if (!captured && dist < 40) {
                    setCaptured(true);
                }

                // escape detection
                if (captured) {

                    const escapeDist =
                        Math.sqrt(
                            (realMouse.x - fakeMouse.x)**2 +
                            (realMouse.y - fakeMouse.y)**2
                        );

                    if (escapeDist > 150) {
                        setCaptured(false);
                    }

                }

                const speed =
                    captured ? captureSpeed : normalSpeed;

                return {
                    x: prev.x + dx * speed,
                    y: prev.y + dy * speed
                };

            });

            // fake cursor movement
            setFakeMouse(prev => {

                if (!captured)
                    return realMouse;

                const dx = cupidPos.x - prev.x;
                const dy = cupidPos.y - prev.y;

                return {
                    x: prev.x + dx * 0.03,
                    y: prev.y + dy * 0.03
                };

            });

            requestAnimationFrame(loop);

        };

        loop();

    }, [realMouse, fakeMouse, cupidPos, captured]);

    const angle =
        Math.atan2(
            fakeMouse.y - cupidPos.y,
            fakeMouse.x - cupidPos.x
        ) * (180 / Math.PI);

    return (
        <>
            {/* fake cursor */}
            <motion.div
                animate={{
                    x: fakeMouse.x - 10,
                    y: fakeMouse.y - 10
                }}
                className="fixed top-0 left-0 pointer-events-none z-[100]"
            >
                <div className={`text-xl ${captured ? "text-red-500 scale-125" : ""}`}>
                    ❤️
                </div>
            </motion.div>

            {/* cupid */}
            <motion.div
                animate={{
                    x: cupidPos.x - 50,
                    y: cupidPos.y - 50,
                    rotate: angle
                }}
                transition={{
                    duration: 0.3
                }}
                className="fixed top-0 left-0 pointer-events-none z-50"
            >
                <Image
                    src="/cupid.png"
                    alt="Cupid"
                    width={100}
                    height={100}
                    priority
                />
            </motion.div>
        </>
    );
}



export default function LoveQuizPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [finished, setFinished] = useState(false);
    const [captured, setCaptured] = useState(false);
    const progress = ((currentQuestion) / questions.length) * 100;
    const [hearts, setHearts] = useState<number[]>([]);

useEffect(() => {
    const positions = Array.from({ length: 15 }, () => Math.random() * 100);
    setHearts(positions);
}, []);


    function handleAnswer(option: string) {
        const newAnswers = [...answers, option];
        setAnswers(newAnswers);

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setFinished(true);
        }
    }

    function restartQuiz() {
        setCurrentQuestion(0);
        setAnswers([]);
        setFinished(false);
    }

    return (
<div className={`min-h-screen flex items-center justify-center p-6 text-center bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600 relative overflow-hidden ${captured ? "cursor-none" : ""}`}>
        <AnimatedCupid captured={captured} setCaptured={setCaptured} />
{/* Floating hearts */}
<div className="absolute inset-0 overflow-hidden pointer-events-none">
    {hearts.map((x, i) => (
        <motion.div
            key={i}
            className="absolute text-white text-xl"
            initial={{
    y: "100%",
    x: `${x}%`
}}

            animate={{ y: "-10%" }}
            transition={{
                duration: 8 + Math.random() * 5,
                repeat: Infinity,
                ease: "linear"
            }}
        >
            ❤️
        </motion.div>
    ))}
</div>


        {/* Glass card */}
        <div className="backdrop-blur-xl bg-white/20 border border-white/30
        shadow-2xl rounded-3xl p-8 w-full max-w-md">

            <h1 className="text-3xl font-bold mb-6 text-white">
                ❤️ Love Quiz
            </h1>
{!finished && (
    <div className="w-full bg-white/30 rounded-full h-2 mb-6">
        <motion.div
            className="bg-white h-2 rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
        />
    </div>
)}

            <AnimatePresence mode="wait">
{!finished ? (

                <motion.div
    key={currentQuestion}
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
>

                    <p className="text-sm text-white/80 mb-2">
                        Question {currentQuestion + 1} of {questions.length}
                    </p>

                    <h2 className="text-xl mb-6 text-white font-semibold">
                        {questions[currentQuestion].question}
                    </h2>

                    <div className="flex flex-col gap-3">
                        {questions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(option)}
                                className="
                                px-6 py-3
                                bg-white/30
                                text-white
                                rounded-xl
                                border border-white/30
                                shadow-lg
                                hover:bg-white/40
                                hover:scale-105
                                active:scale-95
                                transition-all duration-200
                                "
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </motion.div>
            ) : (
                <div>

                    <h2 className="text-2xl font-bold mb-4 text-white">
                        Quiz Finished ❤️
                    </h2>

                    <p className="mb-6 text-white text-lg">
                        Your love strength:
                        <span className="text-3xl font-bold ml-2">
                            {Math.floor(Math.random() * 41) + 60}%
                        </span>
                    </p>

                    <button
                        onClick={restartQuiz}
                        className="
                        px-6 py-3
                        bg-white
                        text-pink-600
                        font-semibold
                        rounded-xl
                        shadow-lg
                        hover:scale-110
                        active:scale-95
                        transition
                        "
                    >
                        Restart Quiz
                    </button>

                </div>
            )}
            </AnimatePresence>

        </div>

    </div>
);
}
