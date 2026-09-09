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
];

export const wednesdayLessonCategories = wednesdayCategoryTitles.map((title, index) => {
  const number = categoryNumber(index + 1);

  return {
    id: `wednesday-category-${number}`,
    title,
    lessons: Array.from({ length: 3 }, (_, lessonIndex) => ({
      id: `wednesday-category-${number}-lesson-${lessonIndex + 1}`,
      title: `Lesson ${categoryNumber(lessonIndex + 1)}`,
    })),
  };
});

export const saturdayLessonCategories = createLessonCategories("Saturday", 14);
export const sundayLessonCategories = createLessonCategories("Sunday", 14);
