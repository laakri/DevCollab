import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

interface PlayedCard extends Card {
  playedBy: number;
  isRevealed: boolean;
  isCollecting?: boolean;
}

export const LiarGame: React.FC = () => {
  const [currentBet, setCurrentBet] = useState<string>("");
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [isBetting, setIsBetting] = useState(false);
  const [betValue, setBetValue] = useState<string>("");
  const [playedCards, setPlayedCards] = useState<PlayedCard[]>([
    { value: "A", suit: "♠", playedBy: 2, isRevealed: false },
    { value: "A", suit: "♥", playedBy: 2, isRevealed: false },
  ]);
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
  const [lastBetCards, setLastBetCards] = useState<PlayedCard[]>([]);
  const [isRevealing, setIsRevealing] = useState(false);

  const handleCardSelect = (card: Card) => {
    if (!isBetting) return;

    if (
      selectedCards.find((c) => c.value === card.value && c.suit === card.suit)
    ) {
      setSelectedCards(
        selectedCards.filter(
          (c) => !(c.value === card.value && c.suit === card.suit)
        )
      );
    } else {
      setSelectedCards([...selectedCards, card]);
    }
  };

  const handleBet = () => {
    if (isBetting && selectedCards.length > 0) {
      // Save the cards that are being bet
      const newPlayedCards = selectedCards.map((card) => ({
        ...card,
        playedBy: 1,
        isRevealed: false,
      }));

      // Update last bet cards for potential reveal
      setLastBetCards(newPlayedCards);

      // Remove selected cards from player's hand
      const updatedPlayers = [...players];
      updatedPlayers[0].cards = players[0].cards.filter(
        (card) =>
          !selectedCards.some(
            (selected) =>
              selected.value === card.value && selected.suit === card.suit
          )
      );
      setPlayers(updatedPlayers);

      // Add to played cards pile
      setPlayedCards([...playedCards, ...newPlayedCards]);
      setCurrentBet(selectedCards[0].value);

      // Reset betting state
      setSelectedCards([]);
      setIsBetting(false);
    } else {
      setIsBetting(true);
    }
  };

  const handleDeny = async () => {
    try {
      setIsRevealing(true);

      // Reveal the last bet's cards
      setPlayedCards((cards) =>
        cards.map((card, index) => {
          if (
            lastBetCards.some(
              (lastCard) =>
                lastCard.value === card.value && lastCard.suit === card.suit
            )
          ) {
            return { ...card, isRevealed: true };
          }
          return card;
        })
      );

      // Reset after animation completes
      setTimeout(() => {
        setIsRevealing(false);
      }, 1000);
    } catch (error) {
      console.error("Error denying bet:", error);
      setIsRevealing(false);
    }
  };

  const handlePlaceBet = async (selectedCards: Card[]) => {
    try {
      // Placeholder for backend call
      // const response = await placeBet(selectedCards);

      // Add cards to played cards with animation
      const newPlayedCards = selectedCards.map((card) => ({
        ...card,
        playedBy: 1, // Current player's ID
        isRevealed: false,
      }));

      setPlayedCards((prev) => [...prev, ...newPlayedCards]);
      setCurrentBet(selectedCards[0].value);

      // Remove cards from player's hand
      const updatedPlayers = [...players];
      updatedPlayers[0].cards = players[0].cards.filter(
        (card) =>
          !selectedCards.some(
            (selected) =>
              selected.value === card.value && selected.suit === card.suit
          )
      );
      setPlayers(updatedPlayers);
    } catch (error) {
      console.error("Error placing bet:", error);
    }
  };

  const collectCardsFromTable = async (playerId: number) => {
    try {
      // This will be replaced with backend call later
      const updatedPlayers = [...players];
      const playerIndex = updatedPlayers.findIndex((p) => p.id === playerId);

      if (playerIndex !== -1) {
        // Add all played cards to the player's hand with animation
        const collectedCards = playedCards.map((card) => ({
          value: card.value,
          suit: card.suit,
        }));

        // Update player's cards
        updatedPlayers[playerIndex].cards = [
          ...updatedPlayers[playerIndex].cards,
          ...collectedCards,
        ];

        // Animate cards collection - Set the correct playedBy for animation
        setPlayedCards((cards) =>
          cards.map((card) => ({
            ...card,
            isCollecting: true,
            playedBy: playerId, // Set this to ensure correct animation target
          }))
        );

        // Wait for animation to complete before clearing the table
        setTimeout(() => {
          setPlayedCards([]);
          setPlayers(updatedPlayers);
        }, 500);
      }
    } catch (error) {
      console.error("Error collecting cards:", error);
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#0F172A]">
      {/* Ambient Lighting Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-blue-900/10" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                    w-[800px] h-[800px] bg-blue-500/10 blur-[100px] rounded-full"
      />
      <div
        className="absolute top-0 left-0 w-[400px] h-[400px] 
                    bg-purple-500/10 blur-[100px] rounded-full"
      />
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] 
                    bg-emerald-500/10 blur-[100px] rounded-full"
      />

      {/* Main Game Container */}
      <div className="relative h-full w-full p-8">
        <div className="relative h-[700px] w-[1000px] mx-auto">
          {/* Game Table */}
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      w-[600px] h-[600px] rounded-full
                      bg-gradient-to-b from-emerald-900/80 to-emerald-950/80
                      border-8 border-amber-900/40 shadow-2xl backdrop-blur-sm
                      before:absolute before:inset-0 before:rounded-full
                      before:bg-gradient-to-b before:from-white/5 before:to-transparent"
          >
            {/* Table Felt Pattern */}
            <div
              className="absolute inset-0 rounded-full opacity-30"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Cpolygon points="0 0 20 0 10 10"/%3E%3C/g%3E%3C/svg%3E")',
              }}
            />

            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-8">
              {/* Current Bet Display */}
              <div
                className="bg-black/40 backdrop-blur-md px-8 py-4 rounded-2xl 
                          shadow-lg border border-white/10
                          transform hover:scale-105 transition-transform"
              >
                <p className="text-emerald-100 text-2xl font-semibold">
                  Current Bet: {currentBet || "None"}
                </p>
              </div>

              {/* Cards Area */}
              <div className="relative w-32 h-32">
                <AnimatePresence>
                  {playedCards.map((card, index) => (
                    <motion.div
                      key={`played-${card.value}-${card.suit}-${index}`}
                      initial={{
                        scale: 0.5,
                        opacity: 0,
                        y: 200,
                        x: 0,
                        rotateY: card.isRevealed ? 180 : 0,
                      }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                        y: card.isCollecting
                          ? getCollectAnimationPosition(card.playedBy).y
                          : card.isRevealed
                          ? 0 // Revealed cards stay in center
                          : index * 2,
                        x: card.isCollecting
                          ? getCollectAnimationPosition(card.playedBy).x
                          : card.isRevealed
                          ? index * 30 - lastBetCards.length * 15 // Spread revealed cards
                          : index * 2,
                        rotate: card.isCollecting
                          ? 0
                          : card.isRevealed
                          ? 0 // No rotation for revealed cards
                          : index * 5,
                        rotateY: card.isRevealed ? 0 : 180, // Flip animation
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                        duration: 0.5,
                      }}
                      style={{
                        position: "absolute",
                        zIndex: card.isRevealed ? 1000 + index : index,
                        transformStyle: "preserve-3d",
                      }}
                      className={`w-14 h-20 rounded-lg shadow-xl border-2 
                             ${
                               card.isRevealed
                                 ? "bg-white"
                                 : "bg-gradient-to-br from-indigo-600 to-indigo-800 border-indigo-700"
                             } flex flex-col items-center justify-center`}
                    >
                      {card.isRevealed ? (
                        <>
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
                        </>
                      ) : (
                        <div className="text-white text-2xl font-bold">♠</div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Add collect button for testing */}
              <button
                onClick={() => collectCardsFromTable(2)}
                className="absolute bottom-0 -right-44 bg-blue-600 text-white px-4 py-2 
                          rounded-lg hover:bg-blue-500 transition-colors"
              >
                collect Cards to P 2 for example
              </button>
            </div>
          </div>

          {/* Player 1 (Current Player) - Bottom */}
          <div
            className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 
                    bg-black/40 backdrop-blur-md p-8 rounded-2xl
                    border border-white/10 shadow-2xl
                    hover:bg-black/50 transition-colors
                    w-[600px]"
          >
            <div className="text-emerald-100 font-semibold mb-4 text-lg">
              {isBetting
                ? `Select cards to bet (${selectedCards.length} selected)`
                : "Player 1 (You)"}
            </div>
            <div className="flex gap-3 justify-center mb-6">
              <AnimatePresence>
                {players[0].cards.map((card, index) => (
                  <motion.div
                    key={`${card.value}-${card.suit}-${index}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className={`w-16 h-24  bg-white rounded-xl cursor-pointer 
                             hover:transform hover:-translate-y-4 transition-all duration-300
                             flex flex-col items-center justify-center shadow-lg
                             hover:shadow-2xl border-2
                             ${
                               selectedCards.find(
                                 (c) =>
                                   c.value === card.value &&
                                   c.suit === card.suit
                               )
                                 ? "border-yellow-400 -translate-y-4"
                                 : "border-gray-200"
                             }`}
                    onClick={() => handleCardSelect(card)}
                  >
                    <span
                      className={`${
                        card.suit === "♥" || card.suit === "♦"
                          ? "text-red-500"
                          : "text-slate-800"
                      } text-2xl font-bold`}
                    >
                      {card.value}
                    </span>
                    <span
                      className={`${
                        card.suit === "♥" || card.suit === "♦"
                          ? "text-red-500"
                          : "text-slate-800"
                      } text-2xl`}
                    >
                      {card.suit}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={handleBet}
                className={`px-8 py-4 rounded-xl font-semibold text-lg
                       shadow-lg transition-all duration-300
                       border border-white/10 backdrop-blur-md
                       hover:scale-105 hover:shadow-2xl
                       ${
                         isBetting
                           ? "bg-yellow-600/80 hover:bg-yellow-500/80 text-white"
                           : "bg-emerald-600/80 hover:bg-emerald-500/80 text-white"
                       }`}
              >
                {isBetting ? "Confirm Bet" : "Bet"}
              </button>

              {!isBetting && (
                <button
                  onClick={handleDeny}
                  disabled={isRevealing}
                  className={`px-8 py-4 rounded-xl font-semibold text-lg
                         bg-rose-600/80 text-white
                         shadow-lg transition-all duration-300
                         border border-white/10 backdrop-blur-md
                         hover:bg-rose-500/80 hover:scale-105 hover:shadow-2xl
                         disabled:opacity-50 disabled:cursor-not-allowed
                         ${isRevealing ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {isRevealing ? "Revealing..." : "Deny"}
                </button>
              )}
            </div>
          </div>

          {/* Player 2 - Right */}
          <div
            className="absolute right-0 top-1/2 transform -translate-y-1/2 
                    bg-black/40 backdrop-blur-md p-6 rounded-2xl
                    border border-white/10 shadow-2xl
                    hover:bg-black/50 transition-colors"
          >
            <div className="text-emerald-100 font-semibold mb-3">Player 2</div>
            <div className="flex gap-2">
              {players[1].cards.map((_, index) => (
                <div
                  key={index}
                  className="w-12 h-16 bg-gradient-to-br from-red-600 to-red-800 
                           rounded-lg flex items-center justify-center text-white
                           shadow-lg border border-red-700"
                >
                  ?
                </div>
              ))}
            </div>
          </div>

          {/* Player 3 - Top */}
          <div
            className="absolute top-0 left-1/2 transform -translate-x-1/2
                    bg-black/40 backdrop-blur-md p-6 rounded-2xl
                    border border-white/10 shadow-2xl
                    hover:bg-black/50 transition-colors"
          >
            <div className="text-emerald-100 font-semibold mb-3">Player 3</div>
            <div className="flex gap-2">
              {players[2].cards.map((_, index) => (
                <div
                  key={index}
                  className="w-12 h-16 bg-gradient-to-br from-red-600 to-red-800 
                           rounded-lg flex items-center justify-center text-white
                           shadow-lg border border-red-700"
                >
                  ?
                </div>
              ))}
            </div>
          </div>

          {/* Player 4 - Left */}
          <div
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -
                    bg-black/40 backdrop-blur-md p-6 rounded-2xl
                    border border-white/10 shadow-2xl
                    hover:bg-black/50 transition-colors"
          >
            <div className="text-emerald-100 font-semibold mb-3">Player 4</div>
            <div className="flex gap-2">
              {players[3].cards.map((_, index) => (
                <div
                  key={index}
                  className="w-12 h-16 bg-gradient-to-br from-red-600 to-red-800 
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
    </div>
  );
};

// Helper function to determine animation position based on player position
const getCollectAnimationPosition = (playerId: number) => {
  switch (playerId) {
    case 1: // Bottom player
      return { x: 0, y: 300 };
    case 2: // Right player
      return { x: 400, y: 0 };
    case 3: // Top player
      return { x: 0, y: -300 };
    case 4: // Left player
      return { x: -400, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
};
