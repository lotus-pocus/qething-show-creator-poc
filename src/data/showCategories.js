const showCategories = [
  {
    id: "movies-tv",
    groupId: "entertainment",
    label: "Movies & TV",
    emoji: "🎬",
    mapsTo: ["Arts→Movies & TV"],
  },
  {
    id: "music",
    groupId: "entertainment",
    label: "Music",
    emoji: "🎵",
    mapsTo: ["Arts→Music"],
  },
  {
    id: "internet-culture",
    groupId: "entertainment",
    label: "Internet Culture",
    emoji: "📱",
    mapsTo: ["Online Media"],
  },
  {
    id: "arts-culture",
    groupId: "entertainment",
    label: "Arts & Culture",
    emoji: "🎨",
    mapsTo: [
      "Arts→Art",
      "Arts→Literature",
      "Arts→Theatre",
      "Arts→Dance",
      "Arts→Fashion",
      "Arts→Beauty",
    ],
  },

  {
    id: "gaming",
    groupId: "games-sport",
    label: "Gaming",
    emoji: "🎮",
    mapsTo: ["Arts→Video Games", "Arts→Boardgame"],
  },
  {
    id: "sport",
    groupId: "games-sport",
    label: "Sport",
    emoji: "⚽",
    mapsTo: ["Sports"],
  },
  {
    id: "logic-puzzles",
    groupId: "games-sport",
    label: "Logic & Puzzles",
    emoji: "🧩",
    mapsTo: ["Logic"],
  },

  {
    id: "general-knowledge",
    groupId: "knowledge-culture",
    label: "General Knowledge",
    emoji: "🎲",
    mapsTo: ["General"],
  },
  {
    id: "history",
    groupId: "knowledge-culture",
    label: "History",
    emoji: "🏛️",
    mapsTo: ["History", "Mythology"],
  },
  {
    id: "science-nature",
    groupId: "knowledge-culture",
    label: "Science & Nature",
    emoji: "🔬",
    mapsTo: ["Science", "Nature"],
  },

  {
    id: "geography-travel",
    groupId: "lifestyle",
    label: "Geography & Travel",
    emoji: "🌍",
    mapsTo: ["Geography"],
  },
  {
    id: "food-drink",
    groupId: "lifestyle",
    label: "Food & Drink",
    emoji: "🍕",
    mapsTo: ["Food"],
  },
];

export default showCategories;