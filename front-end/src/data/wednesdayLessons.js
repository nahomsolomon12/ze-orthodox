const categoryNumber = (number) => String(number).padStart(2, "0");

const createLessonCategories = (prefix, categoryCount) => Array.from({ length: categoryCount }, (_, index) => {
  const number = categoryNumber(index + 1);

  return {
    id: `${prefix.toLowerCase()}-category-${number}`,
    title: `${prefix} Lesson Category ${number}`,
    lessons: Array.from({ length: 3 }, (_, lessonIndex) => ({
      id: `${prefix.toLowerCase()}-category-${number}-lesson-${lessonIndex + 1}`,
      title: `Lesson ${categoryNumber(lessonIndex + 1)}`,
    })),
  };
});

export const wednesdayLessonCategories = createLessonCategories("Wednesday", 66);
export const saturdayLessonCategories = createLessonCategories("Saturday", 14);
export const sundayLessonCategories = createLessonCategories("Sunday", 14);
