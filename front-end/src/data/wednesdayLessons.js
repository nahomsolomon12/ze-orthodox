const categoryNumber = (number) => String(number).padStart(2, "0");

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

  return {
    id: `wednesday-category-${number}`,
    title,
    lessons: Array.from({ length: lessonCount }, (_, lessonIndex) => ({
      id: `wednesday-category-${number}-lesson-${lessonIndex + 1}`,
      title: `Lesson ${categoryNumber(lessonIndex + 1)}`,
    })),
  };
});

export const saturdayLessonCategories = createLessonCategories("Saturday", 14);
export const sundayLessonCategories = createLessonCategories("Sunday", 14);
