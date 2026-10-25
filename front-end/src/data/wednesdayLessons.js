const categoryNumber = (number) => String(number).padStart(2, "0");
const encodePdfSegment = (value) => encodeURIComponent(value).replace(/'/g, "%27");
const pdfUrl = (folder, file) =>
  `https://pub-e90525ac61bf41a191cbcdcee5ce7732.r2.dev/${encodePdfSegment(folder)}/${encodePdfSegment(file)}`;
const numberedFiles = (prefix, count, start = 1) =>
  Array.from({ length: count }, (_, index) => `${prefix}${categoryNumber(index + start)}.pdf`);

const wednesdayLessonFiles = {
  "10 Commandments": numberedFiles("TheTenCommandments-Lesson", 7),
  "Christian Marraige": [
    "OrthodoxChristianFamily-Characterstics.pdf",
    ...numberedFiles("TheABC-ofChristianMarriageLesson", 13),
  ],
  "Comparative Theology": ["JehovahsWitness.pdf"],
  Confession: [
    "Confession-Holy Communion-Giving01.pdf",
    "Fasting - Liturgy WB.pdf",
    "Guidance-to-Self-Examination-prior-to-Confession01.pdf",
    "Guidance-to-Self-Examination-prior-to-Confession02.pdf",
    "Repentance and Holy Communion.pdf",
    ...numberedFiles("Repentance-andConfessionLesson", 4),
  ],
  "Contemporary Culture": [
    "2012Film-and-ChurchTeachings.pdf",
    "Be bothered For Nothing WB.pdf",
    "Money and Christian Life WB.pdf",
    "Problems and Solutions.pdf",
    "Smoking - Alcohol WB.pdf",
    "StayingPositive-in-aNegativeWorld-and-Who-is-Harry-Potter.pdf",
    "The Bible and Our Life WB.pdf",
  ],
  "Davinci Code": numberedFiles("TheTruth-abouthTheDaVinciCode-Lesson", 4),
  Deciding: ["Decision-Making01.pdf"],
  "Life of Faith": [
    "Faith_Works.pdf",
    ...numberedFiles("Life-of-Faith-", 5),
    "Life-of-Faith-Introduction01.pdf",
  ],
  "Mary and the Love of Honor": ["StMary-and-the-Love-of-Honor.pdf"],
  Miscelleanous: [
    "Bearing Fruits WB.pdf",
    "Christian Direction for Pleased Marriage.pdf",
    "Christianity 21stCentury.pdf",
    "Egziabher Ale.pdf",
    "OrthodoxTewahedoChurch01.pdf",
    "Overcoming The Trials of Life.pdf",
    "Remember-your-Creater-in-the-Days-ofYour-Youth01.pdf",
    "Sleep.pdf",
    "Spiritual_Service.pdf",
    "TheEnemy-and-theWeapon.pdf",
    "Time01.pdf",
    "TurnAway-fromSuchPeople.pdf",
    "TurnAway-fromSuchPeople2003.pdf",
    "Who-is-JesusChrist.pdf",
    "Who-is-MyNeighbor.pdf",
  ],
  Nehemiah: numberedFiles("TheBook-of-Nehemiah", 10),
  "On John the Baptist": ["St-John-the-Baptist-and-the-Ethiopian-New-Year.pdf"],
  "On addiction": numberedFiles("Addicts-the-Church-and-Family-Lesson", 2),
  "On the Will of God": numberedFiles("Knowing-God-s-Will-Lesson", 2),
  "Orthodox Worldview": numberedFiles("OrthodoxWorldviewLesson", 2),
  Patience: ["Patience01.pdf", "Patience02.pdf", "Time01.pdf"],
  Romans: numberedFiles("StPaulEpistle-toRomans", 6),
  "The Church": [
    "Ark of the Covenant - Part Three WB.pdf",
    "Ark of the Covenant - Part two WB.pdf",
    "Ark of the Covenant WB.pdf",
    ...numberedFiles("Church-Lesson", 4, 1).map((file) =>
      file.replace("Lesson0", "Lesson"),
    ),
    "Prayer WB.pdf",
    "Psalms 121 verse 1 - WB.pdf",
    "Which_is_the_True_Church_Lesson_2.pdf",
    "WhichistheTrueChurch-Lesson3.pdf",
    "WhichistheTrueChurch-Lesson4.pdf",
    "WhichistheTrueChurch.pdf",
  ],
  "The Holy Trinity": numberedFiles("TheHolyTrinityLesson", 3, 1).map((file) => file.replace("0", "")),
  "The New Age": numberedFiles("TheNewAgeMovement-Lesson", 2),
  "The Orthodox Family": [
    "How we Communicate with Our Children WB.pdf",
    ...numberedFiles("OrthodoxChristianFamilyLesson", 14),
  ],
  "The Saints": [
    "Intercession of Saints - According to Our Church Teachings = Week 3 WB.pdf",
    "Intercession of Saints - According to Our Church Teachings WB.pdf",
    "Intercession of Saints - According to Our Church Teachings Week 2 WB.pdf",
    "What-we-Believe -About-theSaints.pdf",
  ],
  "The Second Advent": numberedFiles("The-End-of-the-World-Lesson", 2),
  "The Virgin Mary": numberedFiles("SaintMaryLesson", 4, 1).map((file) => file.replace("0", "")),
  "Who are you trying to please": ["Whom-are-you-Trying-to-Please.pdf"],
  "Who is the Spiritual Man": ["Who-is-the-Spiritual-Man01.pdf"],
  "Women's Role": ["WomenandChristianity01.pdf"],
};

const createLessonCategories = (prefix, categoryCount) => Array.from({ length: categoryCount }, (_, index) => {
  const number = categoryNumber(index + 1);

  return {
    id: `${prefix.toLowerCase()}-category-${number}`,
    title: `Category ${number}`,
    lessons: Array.from({ length: 3 }, (_, lessonIndex) => ({
      id: `${prefix.toLowerCase()}-category-${number}-lesson-${lessonIndex + 1}`,
      title: `Lesson ${categoryNumber(lessonIndex + 1)}`,
    })),
  };
});

const wednesdayCategoryTitles = [
  "10 Commandments",
  "Christian Marriage",
  "Comparative Theology",
  "Confession",
  "Contemporary Culture",
  "The Davinci Code",
  "Deciding",
  "Life of Faith",
  "Mary and the Love of Honor",
  "Miscelleanous",
  "Nehemiah",
  "On John the Baptist",
  "On addiction",
  "On the Will of God",
  "Orthodox Worldview",
  "Patience",
  "Romans",
  "The Church",
  "The Holy Trinity",
  "The New Age",
  "The Orthodox Family",
  "The Saints",
  "The Second Advent",
  "The Virgin Mary",
  "Who are you trying to please",
  "Who is the Spiritual Man",
  "Women's Role",
];

const wednesdayLessonCounts = {
  "10 Commandments": 7,
  "Christian Marriage": 14,
  "Comparative Theology": 1,
  Confession: 9,
  "Contemporary Culture": 7,
  "The Davinci Code": 4,
  Deciding: 1,
  "Life of Faith": 7,
  "Mary and the Love of Honor": 1,
  Miscelleanous: 15,
  Nehemiah: 10,
  "On John the Baptist": 1,
  "On addiction": 2,
  "On the Will of God": 2,
  "Orthodox Worldview": 2,
  Patience: 3,
  Romans: 6,
  "The Church": 13,
  "The Holy Trinity": 3,
  "The New Age": 2,
  "The Orthodox Family": 15,
  "The Saints": 4,
  "The Second Advent": 2,
  "The Virgin Mary": 4,
  "Who are you trying to please": 1,
  "Who is the Spiritual Man": 1,
  "Women's Role": 1,
};

export const wednesdayLessonCategories = wednesdayCategoryTitles.map((title, index) => {
  const number = categoryNumber(index + 1);
  const lessonCount = wednesdayLessonCounts[title];
  const sourceTitle =
    title === "Christian Marriage"
      ? "Christian Marraige"
      : title === "The Davinci Code"
        ? "Davinci Code"
        : title;
  const lessonFiles = wednesdayLessonFiles[sourceTitle];

  return {
    id: `wednesday-category-${number}`,
    title,
    lessons: Array.from({ length: lessonCount }, (_, lessonIndex) => {
      const file = lessonFiles[lessonIndex];

      return {
        id: `wednesday-category-${number}-lesson-${lessonIndex + 1}`,
        title: `Lesson ${categoryNumber(lessonIndex + 1)}`,
        pdf: pdfUrl(sourceTitle, file),
      };
    }),
  };
});

export const saturdayLessonCategories = createLessonCategories("Saturday", 14);
export const sundayLessonCategories = createLessonCategories("Sunday", 14);
