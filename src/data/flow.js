const flow = [
  {
    id: "occasion",
    title: "What are you creating?",
    type: "singleSelectWithOther",
    options: [
      "Birthday",
      "Work Event",
      "Party",
      "Themed Night",
    ],
    otherLabel: "✨ My Own",
    otherInputLabel: "What are you planning?",
    otherPlaceholder: "For example, a family reunion",
    otherMaxLength: 60,
  },

  {
    id: "buildType",
    title: "How would you like to build it?",
    type: "singleSelect",
    options: [
      "Quick Build",
      "Tailored Show",
      "Blind Build",
    ],
  },

  {
    id: "workEventType",
    title: "What kind of work event?",
    type: "singleSelectWithOther",
    options: [
      "Retirement",
      "Team Social",
      "Awards Night",
      "Leaving Party",
    ],
    otherLabel: "✨ Something Different",
    otherInputLabel: "Tell us what you're planning",
    otherPlaceholder: "For example, a company away day",
    showWhen: (answers) => answers.occasion === "Work Event",
  },

  {
    id: "partyType",
    title: "What kind of party?",
    type: "singleSelectWithOther",
    options: [
      "BBQ",
      "House Party",
      "Dinner Party",
      "Christmas Party",
    ],
    otherLabel: "✨ My Own",
    otherInputLabel: "Tell us about it",
    otherPlaceholder: "For example, a midsummer garden party",
    showWhen: (answers) => answers.occasion === "Party",
  },

  {
    id: "theme",
    title: "Choose your theme",
    type: "singleSelectWithOther",
    options: [
      "90s Video Games",
      "Movies",
      "Music",
      "Sport",
    ],
    otherLabel: "✨ My Own Theme",
    otherInputLabel: "What theme do you have in mind?",
    otherPlaceholder: "For example, space adventure",
    showWhen: (answers) => answers.occasion === "Themed Night",
  },

  {
    id: "audience",
    title: "Who will be playing?",
    type: "singleSelect",
    options: [
      "Friends",
      "Family",
      "Colleagues",
      "Mixed Group",
    ],
    showWhen: (answers) => answers.buildType === "Tailored Show",
  },

  {
    id: "playerCount",
    title: "Number of Players",
    type: "numberPicker",
    min: 2,
    max: 12,
    defaultValue: 8,
  },

  {
    id: "energyLevel",
    title: "Choose the energy level",
    type: "singleSelect",
    options: [
      "Quiz Focused",
      "Classic QEthing",
      "Full Chaos",
    ],
  },
];

export default flow;