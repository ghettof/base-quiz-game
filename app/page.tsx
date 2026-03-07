"use client";
import { useState } from "react";

const questions = [
  {
    question: "Base hangi şirket tarafından geliştirildi?",
    options: ["Meta", "Coinbase", "Google", "Binance"],
    answer: 1,
  },
  {
    question: "Base hangi Layer üzerinde çalışır?",
    options: ["Layer 1", "Layer 2", "Layer 3", "Sidechain"],
    answer: 1,
  },
  {
    question: "Base hangi teknoloji altyapısını kullanır?",
    options: ["ZK Rollup", "Plasma", "OP Stack", "Arbitrum"],
    answer: 2,
  },
  {
    question: "Base'in kendi native token'ı var mı?",
    options: ["Evet, BASE token", "Evet, COIN token", "Hayır, ETH kullanır", "Hayır, USDC kullanır"],
    answer: 2,
  },
  {
    question: "Base hangi test ağını kullanır?",
    options: ["Goerli", "Mumbai", "Base Sepolia", "Fuji"],
    answer: 2,
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    if (index === questions[current].answer) {
      setScore((s) => s + 1);
    }
    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent((c) => c + 1);
        setSelected(null);
      } else {
        setFinished(true);
      }
    }, 1000);
  };

  const restart = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  };

  if (finished) {
    return (
      <main className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-6">
        <div className="bg-zinc-900 rounded-2xl p-8 max-w-md w-full text-center shadow-xl">
          <h1 className="text-3xl font-bold mb-4">🎉 Oyun Bitti!</h1>
          <p className="text-xl mb-2">Skorun:</p>
          <p className="text-5xl font-bold text-blue-400 mb-6">{score} / {questions.length}</p>
          {score === questions.length && <p className="text-green-400 mb-4">Mükemmel! Tüm soruları doğru bildin! 🏆</p>}
          {score < questions.length && score >= 3 && <p className="text-yellow-400 mb-4">Çok iyi! Biraz daha çalış! 💪</p>}
          {score < 3 && <p className="text-red-400 mb-4">Daha fazla pratik yap! 📚</p>}
          <button onClick={restart} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition">
            Tekrar Oyna
          </button>
        </div>
      </main>
    );
  }

  const q = questions[current];

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-6">
      <div className="bg-zinc-900 rounded-2xl p-8 max-w-md w-full shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <span className="text-zinc-400 text-sm">Soru {current + 1} / {questions.length}</span>
          <span className="text-blue-400 font-bold">Skor: {score}</span>
        </div>
        <div className="w-full bg-zinc-700 rounded-full h-2 mb-6">
          <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${((current) / questions.length) * 100}%` }} />
        </div>
        <h2 className="text-xl font-semibold mb-6">{q.question}</h2>
        <div className="flex flex-col gap-3">
          {q.options.map((option, i) => {
            let style = "bg-zinc-800 hover:bg-zinc-700 border border-zinc-700";
            if (selected !== null) {
              if (i === q.answer) style = "bg-green-600 border border-green-500";
              else if (i === selected) style = "bg-red-600 border border-red-500";
              else style = "bg-zinc-800 border border-zinc-700 opacity-50";
            }
            return (
              <button key={i} onClick={() => handleAnswer(i)} className={`${style} text-left px-4 py-3 rounded-xl transition font-medium`}>
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
} 