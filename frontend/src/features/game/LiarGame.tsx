import React, { useState } from "react";

interface Card {
  value: string;
  suit: string;
}

interface Player {
  id: number;
  name: string;
  cards: Card[];
  isCurrentTurn: boolean;
}

export const LiarGame: React.FC = () => {
  const [currentBet, setCurrentBet] = useState<string>("");
  const [players, setPlayers] = useState<Player[]>([
    {
      id: 1,
      name: "Player 1",
      cards: [
        { value: "A", suit: "♠" },
        { value: "K", suit: "♥" },
        { value: "7", suit: "♦" },
        { value: "J", suit: "♣" },
        { value: "3", suit: "♠" },
      ],
      isCurrentTurn: true,
    },
    {
      id: 2,
      name: "Player 2",
      cards: Array(3).fill({ value: "?", suit: "?" }),
      isCurrentTurn: false,
    },
    {
      id: 3,
      name: "Player 3",
      cards: Array(3).fill({ value: "?", suit: "?" }),
      isCurrentTurn: false,
    },
    {
      id: 4,
      name: "Player 4",
      cards: Array(4).fill({ value: "?", suit: "?" }),
      isCurrentTurn: false,
    },
  ]);

  const handleBet = () => {
    // Implement bet logic
  };

  const handleDeny = () => {
    // Implement deny logic
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      {/* Game Table */}
      <div className="relative h-[700px] w-[1000px] mx-auto">
        {/* Center Table */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    w-[500px] h-[500px] bg-gradient-to-br from-emerald-800 to-emerald-900 
                    rounded-full border-8 border-amber-900/40 shadow-2xl
                    flex items-center justify-center"
        >
          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <p className="text-emerald-100 text-xl font-semibold">
              Current Bet: {currentBet || "None"}
            </p>
          </div>
        </div>

        {/* Players */}
        {/* Top Player */}
        <div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 
                    bg-black/40 backdrop-blur-sm p-6 rounded-xl shadow-lg
                    border border-white/10"
        >
          <div className="text-emerald-100 font-semibold mb-3">Player 3</div>
          <div className="flex gap-3">
            {players[2].cards.map((card, index) => (
              <div
                key={index}
                className="w-10 h-14 bg-gradient-to-br from-red-600 to-red-800 
                         rounded-lg flex items-center justify-center text-white
                         shadow-lg border border-red-700"
              >
                ?
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Player (Current Player) */}
        <div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 
                    bg-black/40 backdrop-blur-sm p-6 rounded-xl shadow-lg
                    border border-white/10"
        >
          <div className="text-emerald-100 font-semibold mb-3">
            Player 1 (You)
          </div>
          <div className="flex gap-3 mb-6">
            {players[0].cards.map((card, index) => (
              <div
                key={index}
                className="w-14 h-20 bg-white rounded-lg cursor-pointer 
                         hover:transform hover:-translate-y-2 transition-transform 
                         flex flex-col items-center justify-center shadow-lg
                         hover:shadow-xl border border-gray-200"
                onClick={() =>
                  console.log(`Selected card ${card.value}${card.suit}`)
                }
              >
                <span
                  className={`${
                    card.suit === "♥" || card.suit === "♦"
                      ? "text-red-500"
                      : "text-slate-800"
                  } text-xl font-bold`}
                >
                  {card.value}
                </span>
                <span
                  className={`${
                    card.suit === "♥" || card.suit === "♦"
                      ? "text-red-500"
                      : "text-slate-800"
                  } text-xl`}
                >
                  {card.suit}
                </span>
              </div>
            ))}
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleBet}
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg 
                       hover:bg-emerald-500 transition-colors font-semibold
                       shadow-lg hover:shadow-xl"
            >
              Bet
            </button>
            <button
              onClick={handleDeny}
              className="bg-rose-600 text-white px-6 py-3 rounded-lg 
                       hover:bg-rose-500 transition-colors font-semibold
                       shadow-lg hover:shadow-xl"
            >
              Deny
            </button>
          </div>
        </div>

        {/* Left Player */}
        <div
          className="absolute left-0 top-1/2 transform -translate-y-1/2 
                    bg-black/40 backdrop-blur-sm p-6 rounded-xl shadow-lg
                    border border-white/10"
        >
          <div className="text-emerald-100 font-semibold mb-3">Player 4</div>
          <div className="flex gap-3">
            {players[3].cards.map((card, index) => (
              <div
                key={index}
                className="w-10 h-14 bg-gradient-to-br from-red-600 to-red-800 
                         rounded-lg flex items-center justify-center text-white
                         shadow-lg border border-red-700"
              >
                ?
              </div>
            ))}
          </div>
        </div>

        {/* Right Player */}
        <div
          className="absolute right-0 top-1/2 transform -translate-y-1/2 
                    bg-black/40 backdrop-blur-sm p-6 rounded-xl shadow-lg
                    border border-white/10"
        >
          <div className="text-emerald-100 font-semibold mb-3">Player 2</div>
          <div className="flex gap-3">
            {players[1].cards.map((card, index) => (
              <div
                key={index}
                className="w-10 h-14 bg-gradient-to-br from-red-600 to-red-800 
                         rounded-lg flex items-center justify-center text-white
                         shadow-lg border border-red-700"
              >
                ?
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
