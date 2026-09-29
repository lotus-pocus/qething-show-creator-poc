const isQuickOrTailored = (answers) =>
  answers.buildType === "Quick Build" || answers.buildType === "Tailored Show";

const isTailored = (answers) => answers.buildType === "Tailored Show";

const flow = [
  {
    id: "buildType",
    type: "buildType",
    eyebrow: "Welcome, showmaker",
    title: "Let's build your show",
    description: "Choose how involved you want to be.",
    options: [
      {
        value: "Quick Build",
        icon: "⚡",
        label: "Quick Build",
        description: "Three quick choices. Ready in seconds.",
        badge: "Fastest",
      },
      {
        value: "Tailored Show",
        icon: "🎯",
        label: "Tailored Show",
        description: "Tell us about your group and what they love.",
        badge: "Most personal",
      },
      {
        value: "Blind Build",
        icon: "🎲",
        label: "Blind Build",
        description: "No peeking. We decide everything.",
        badge: "Big surprise",
      },
    ],
  },

  {
    id: "occasion",
    type: "singleSelectWithOther",
    eyebrow: "Set the scene",
    title: "What's the occasion?",
    description: "We’ll use this to give the show the right flavour.",
    icon: "🎉",
    options: [
      {
        value: "Birthday",
        icon: "🎂",
        label: "Birthday",
      },
      {
        value: "Work Event",
        icon: "💼",
        label: "Work Event",
      },
      {
        value: "Party",
        icon: "🥳",
        label: "Party",
      },
      {
        value: "Themed Night",
        icon: "✨",
        label: "Themed Night",
      },
      {
        value: "Just Playing",
        icon: "🎮",
        label: "Just Playing",
      },
    ],
    otherLabel: "My Occasion",
    otherInputLabel: "What's the occasion?",
    otherPlaceholder: "For example, a family reunion",
    showWhen: isQuickOrTailored,
  },

  
  {
    id: "audience",
    type: "singleSelect",
    eyebrow: "Meet the cast",
    title: "Who's joining you?",
    description: "Tell us who will be in the room.",
    icon: "👥",
    options: [
      {
        value: "Friends",
        icon: "😄",
        label: "Friends",
      },
      {
        value: "Family",
        icon: "🏡",
        label: "Family",
      },
      {
        value: "Colleagues",
        icon: "💼",
        label: "Colleagues",
      },
      {
        value: "Mixed Group",
        icon: "🌈",
        label: "Mixed Group",
      },
      {
        value: "You Decide",
        icon: "🎲",
        label: "You decide",
        description: "Just make us a great show",
        delegate: true,
      },
    ],
    showWhen: isTailored,
  },
  {
    id: "makeItYours",
    type: "makeItYours",
    eyebrow: "Your show",
    title: "Make it yours",
    description: "Give your show a name and add a photo if you fancy.",
    icon: "✨",
    optional: true,
    showWhen: isQuickOrTailored,
  },
  
  {
    id: "gameSize",
    type: "singleSelect",
    eyebrow: "Fill the studio",
    title: "How big's the crowd?",
    description: "We’ll set up the right game for your group.",
    icon: "👥",
    options: [
      {
        value: "Small Game",
        icon: "👥",
        label: "Small Game",
        description: "Up to 16 players",
      },
      {
        value: "Big Game",
        icon: "🎉",
        label: "Big Game",
        description: "17+ players",
      },
    ],
  },

  {
    id: "experienceLevel",
    type: "singleSelect",
    eyebrow: "Set the challenge",
    title: "How much of a challenge should it be?",
    description: "We’ll balance the show so everyone stays involved.",
    icon: "🧠",
    options: [
      {
        value: "Easy Going",
        icon: "🌱",
        label: "Easy Going",
        description: "Relaxed and welcoming for first-timers.",
      },
      {
        value: "Balanced Challenge",
        icon: "⚖️",
        label: "Balanced Challenge",
        description: "A mix of easier and tougher moments.",
      },
      {
        value: "Bring It On",
        icon: "🏆",
        label: "Bring It On!",
        description: "A proper challenge for quiz lovers.",
      },
    ],
    showWhen: isTailored,
  },

  {
    id: "energyLevel",
    type: "singleSelect",
    eyebrow: "Turn up the energy",
    title: "What's the vibe?",
    description: "Choose how you want the room to feel.",
    icon: "⚡",
    options: [
      {
        value: "Quiz Focused",
        icon: "🧠",
        label: "Quiz Focused",
        description: "More questions. Less chaos.",
      },
      {
        value: "Classic QEthing",
        icon: "😄",
        label: "Classic QEthing",
        description: "A lively mix of trivia and games.",
      },
      {
        value: "Full Chaos",
        icon: "🔥",
        label: "Full Chaos",
        description: "Fast, silly and unpredictable.",
      },
    ],
    showWhen: isQuickOrTailored,
  },

  {
    id: "categories",
    type: "categorySelect",
    eyebrow: "Choose the favourites",
    title: "What does your group love?",
    description: "Choose up to five. We’ll fill in the gaps.",
    icon: "❤️",
    maxSelections: 5,
    showWhen: isTailored,
  },

  {
    id: "roundTypes",
    type: "multiSelect",
    eyebrow: "Shape the action",
    title: "Which rounds sound fun?",
    description: "Choose as many as you like.",
    icon: "🎮",
    minimumSelections: 1,
    options: [
      {
        value: "Trivia",
        icon: "🧠",
        label: "Trivia",
      },
      {
        value: "Music",
        icon: "🎵",
        label: "Music",
      },
      {
        value: "Picture Rounds",
        icon: "🖼️",
        label: "Pictures",
      },
      {
        value: "Physical Challenges",
        icon: "🏃",
        label: "Physical",
      },
      {
        value: "Bluffing",
        icon: "🤥",
        label: "Bluffing",
      },
      {
        value: "Drawing",
        icon: "✏️",
        label: "Drawing",
      },
      {
        value: "Photo Challenges",
        icon: "📸",
        label: "Photos",
      },
      {
        value: "Team Games",
        icon: "🤝",
        label: "Team Games",
      },
    ],
    showWhen: isTailored,
  },

  {
    id: "avoid",
    type: "multiSelect",
    eyebrow: "Keep everyone happy",
    title: "Anything you'd rather avoid?",
    description: "This step is optional.",
    icon: "🚫",
    optional: true,
    options: [
      {
        value: "Singing",
        icon: "🎤",
        label: "Singing",
      },
      {
        value: "Sport",
        icon: "⚽",
        label: "Sport",
      },
      {
        value: "Embarrassing Games",
        icon: "😳",
        label: "Embarrassing",
      },
      {
        value: "Physical Activity",
        icon: "🏃",
        label: "Running Around",
      },
      {
        value: "Timed Rounds",
        icon: "⏱️",
        label: "Timed Rounds",
      },
      {
        value: "Nothing",
        icon: "✅",
        label: "Nothing",
      },
    ],
    showWhen: isTailored,
  },

  {
    id: "showStyle",
    type: "singleSelect",
    eyebrow: "Final direction",
    title: "What should the show lean towards?",
    description: "We’ll still mix in plenty of variety.",
    icon: "🎯",
    options: [
      {
        value: "Trivia & Knowledge",
        icon: "🧠",
        label: "Trivia",
        description: "Questions, puzzles and knowledge.",
      },
      {
        value: "Social & Silly",
        icon: "😂",
        label: "Social & Silly",
        description: "Banter and memorable moments.",
      },
      {
        value: "Games & Challenges",
        icon: "🎮",
        label: "Games",
        description: "Interactive rounds and challenges.",
      },
      {
        value: "A Bit of Everything",
        icon: "✨",
        label: "Everything",
        description: "Give us the complete QEthing mix.",
      },
    ],
    showWhen: isTailored,
  },

  {
    id: "duration",
    type: "singleSelect",
    eyebrow: "Set the running time",
    title: "How long should it last?",
    description: "We’ll choose the right number of rounds.",
    icon: "⏱️",
    options: [
      {
        value: "20–30 Minutes",
        icon: "⚡",
        label: "20–30 mins",
      },
      {
        value: "35–45 Minutes",
        icon: "🎯",
        label: "35–45 mins",
      },
      {
        value: "About an Hour",
        icon: "🎬",
        label: "About an hour",
      },
      {
        value: "Keep It Flexible",
        icon: "✨",
        label: "Keep it flexible",
      },
    ],
    showWhen: isTailored,
  },
];

export default flow;