function Items({ onItemClick }) {
  const itemEmotionMap = {
    "🥕": "Happy",
    "🍀": "Excited",
    "🍭": "Hyper!",
    "🍗": "Happy",
    "🕷️": "Scared",
    "💩": "Disgusted"
  };

  return (
    <>
      <p>What will you give Bunny?</p>
      <ul id="items">
        {Object.keys(itemEmotionMap).map((item) => (
          <li key={item}  onClick={() => onItemClick(item, itemEmotionMap[item])}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Items;