"use client";
import { useState } from "react";

const categories = [
  { id: "base", name: "Base & L2", emoji: "🔵" },
  { id: "crypto", name: "Kripto", emoji: "₿" },
  { id: "defi", name: "DeFi", emoji: "🏦" },
];

const questions = {
  base: [
    { question: "Base hangi şirket tarafından geliştirildi?", options: ["Meta", "Coinbase", "Google", "Binance"], answer: 1 },
    { question: "Base hangi Layer üzerinde çalışır?", options: ["Layer 1", "Layer 2", "Layer 3", "Sidechain"], answer: 1 },
    { question: "Base hangi teknoloji altyapısını kullanır?", options: ["ZK Rollup", "Plasma", "OP Stack", "Arbitrum"], answer: 2 },
    { question: "Base'in kendi native token'ı var mı?", options: ["Evet, BASE token", "Evet, COIN token", "Hayır, ETH kullanır", "Hayır, USDC kullanır"], answer: 2 },
    { question: "Base hangi test ağını kullanır?", options: ["Goerli", "Mumbai", "Base Sepolia", "Fuji"], answer: 2 },
    { question: "Base'in ana DEX'i hangisidir?", options: ["Uniswap", "Aerodrome", "SushiSwap", "Curve"], answer: 1 },
    { question: "Base hangi yılda mainnet'e geçti?", options: ["2021", "2022", "2023", "2024"], answer: 2 },
  ],
  crypto: [
    { question: "Bitcoin'i kim yarattı?", options: ["Vitalik Buterin", "Satoshi Nakamoto", "Charlie Lee", "Roger Ver"], answer: 1 },
    { question: "Ethereum'un native token'ı nedir?", options: ["BTC", "ETH", "SOL", "BNB"], answer: 1 },
    { question: "İlk Bitcoin bloğu ne zaman üretildi?", options: ["2007", "2008", "2009", "2010"], answer: 2 },
    { question: "Proof of Work'te madenciler ne yapar?", options: ["Token stake eder", "Karmaşık matematik çözer", "Oy kullanır", "NFT basar"], answer: 1 },
    { question: "USDC hangi şirket tarafından çıkarılır?", options: ["Tether", "Binance", "Circle", "Coinbase"], answer: 2 },
    { question: "En yüksek piyasa değerine sahip kripto hangisidir?", options: ["Ethereum", "Bitcoin", "Solana", "BNB"], answer: 1 },
    { question: "Private key kaybedilirse ne olur?", options: ["Şirkete başvurulur", "Mail ile kurtarılır", "Fonlara erişim kalıcı kaybolur", "Otomatik yedeklenir"], answer: 2 },
  ],
  defi: [
    { question: "DeFi ne anlama gelir?", options: ["Digital Finance", "Decentralized Finance", "Deferred Finance", "Direct Finance"], answer: 1 },
    { question: "AMM ne demektir?", options: ["Automated Market Maker", "Advanced Money Manager", "Asset Management Module", "Algorithmic Mining Method"], answer: 0 },
    { question: "Liquidity pool nedir?", options: ["Madenci havuzu", "Token kilit mekanizması", "Akıllı kontrata kilitlenen token çifti", "NFT koleksiyonu"], answer: 2 },
    { question: "Yield farming nedir?", options: ["NFT üretmek", "Likidite sağlayarak ödül kazanmak", "Token yakmak", "Airdrop almak"], answer: 1 },
    { question: "Flash loan nedir?", options: ["Hızlı para transferi", "Aynı işlem içinde teminatsız borç", "Kripto mortgage", "Anlık swap"], answer: 1 },
    { question: "TVL ne anlama gelir?", options: ["Total Value Locked", "Token Value Limit", "Transfer Volume Ledger", "Trusted Validator List"], answer: 0 },
    { question: "İlk DeFi protokolü hangisidir?", options: ["Uniswap", "Aave", "MakerDAO", "Compound"], answer: 2 },
  ],
};

export default function Home() {
  const [screen, setScreen] = useState<"home" | "game" | "result">("home");
  const [category, setCategory] = useState<string>("");
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const qs = questions[category as keyof typeof questions] || [];

  const handleAnswer = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    if (index === qs[current].answer) setScore((s) => s + 1);
    setTimeout(() => {
      if (current + 1 < qs.length) {
        setCurrent((c) => c + 1);
        setSelected(null);
      } else {
        setScreen("result");
      }
    }, 1000);
  };

  const restart = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setScreen("home");
    setCategory("");
  };

  if (screen === "home") {
    return (
      <main className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-6">
        <div className="max-w-md w-full">
          <h1 className="text-4xl font-bold text-center mb-2">🎮 Quiz Game</h1>
          <p className="text-zinc-400 text-center mb-10">Bir kategori seç ve başla!</p>
          <div className="flex flex-col gap-4">
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => { setCategory(cat.id); setScreen("game"); }}
                className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-blue-500 rounded-2xl p-5 text-left transition-all">
                <div className="text-3xl mb-2">{cat.emoji}</div>
                <div className="text-xl font-bold">{cat.name}</div>
                <div className="text-zinc-400 text-sm">{questions[cat.id as keyof typeof questions].length} soru</div>
              </button>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (screen === "result") {
    const cat = categories.find((c) => c.id === category);
    return (
      <main className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-6">
        <div className="bg-zinc-900 rounded-2xl p-8 max-w-md w-full text-center shadow-xl">
          <div className="text-5xl mb-4">{cat?.emoji}</div>
          <h1 className="text-3xl font-bold mb-4">Oyun Bitti!</h1>
          <p className="text-xl mb-2">Skorun:</p>
          <p className="text-5xl font-bold text-blue-400 mb-6">{score} / {qs.length}</p>
          {score === qs.length && <p className="text-green-400 mb-4">Mükemmel! 🏆</p>}
          {score < qs.length && score >= 4 && <p className="text-yellow-400 mb-4">Çok iyi! 💪</p>}
          {score < 4 && <p className="text-red-400 mb-4">Daha fazla pratik yap! 📚</p>}
          <div className="flex gap-3">
            <button onClick={() => { setCurrent(0); setScore(0); setSelected(null); setScreen("game"); }}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition">
              Tekrar Oyna
            </button>
            <button onClick={restart}
              className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-3 rounded-xl transition">
              Kategoriler
            </button>
          </div>
        </div>
      </main>
    );
  }

  const q = qs[current];
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-6">
      <div className="bg-zinc-900 rounded-2xl p-8 max-w-md w-full shadow-xl">
        <button onClick={restart} className="text-zinc-400 hover:text-white mb-4 flex items-center gap-1 text-sm transition">
          ← Kategoriler
        </button>
        <div className="flex justify-between items-center mb-6">
          <span className="text-zinc-400 text-sm">Soru {current + 1} / {qs.length}</span>
          <span className="text-blue-400 font-bold">Skor: {score}</span>
        </div>
        <div className="w-full bg-zinc-700 rounded-full h-2 mb-6">
          <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${((current) / qs.length) * 100}%` }} />
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
              <button key={i} onClick={() => handleAnswer(i)}
                className={`${style} text-left px-4 py-3 rounded-xl transition font-medium`}>
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}