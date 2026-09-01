const categoryNumber = (number) => String(number).padStart(2, "0");

export const wednesdayLessonCategories = Array.from({ length: 66 }, (_, index) => {
  const number = categoryNumber(index + 1);

  return {
    id: `wednesday-category-${number}`,
    title: `Wednesday Lesson Category ${number}`,
    lessons: Array.from({ length: 3 }, (_, lessonIndex) => ({
      id: `wednesday-category-${number}-lesson-${lessonIndex + 1}`,
      title: `Lesson ${categoryNumber(lessonIndex + 1)}`,
    })),
  };
});
