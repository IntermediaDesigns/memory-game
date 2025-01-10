export default function MemoryCard({ data = [], handleClick }) {
  // Create pairs of cards with unique IDs if they don't already have them
  const cards = data.map(emoji => 
    emoji.id ? emoji : { ...emoji, id: Math.random() }
  );

  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4 p-2 sm:p-4"
      role="grid"
      aria-label="Memory game grid"
    >
      {cards.map((card) => (
        <button
          key={card.id}
          onClick={() => handleClick(card)}
          className={`
              aspect-square bg-card-bg rounded-lg shadow-lg
              transition-all duration-300 hover:scale-105 hover:bg-card-hover
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50
              ${card.isFlipped || card.isMatched ? "bg-white card-flip" : ""}
            `}
          aria-label={`Card ${
            card.isFlipped || card.isMatched ? card.htmlCode : "face down"
          }`}
          aria-pressed={card.isFlipped || card.isMatched}
        >
          <span className="text-2xl sm:text-3xl md:text-4xl">
            {card.isFlipped || card.isMatched ? card.htmlCode : "?"}
          </span>
        </button>
      ))}
    </div>
  );
}
