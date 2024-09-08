export const processPaginationPages = (numberOfPages, currentPage) => {
  if (numberOfPages < 6) {
    return [...Array(numberOfPages)].map((_, i) => i + 1);
  } else if (currentPage >= 1 && currentPage < 3) {
    return [1, 2, 3, "...", numberOfPages];
  } else if (currentPage === 3) {
    return [1, 2, 3, 4, "...", numberOfPages];
  } else if (currentPage > numberOfPages - 2 && currentPage <= numberOfPages) {
    return [1, "...", numberOfPages - 2, numberOfPages - 1, numberOfPages];
  } else if (currentPage === numberOfPages - 2) {
    return [
      1,
      "...",
      numberOfPages - 3,
      numberOfPages - 2,
      numberOfPages - 1,
      numberOfPages,
    ];
  } else {
    const previousPage = currentPage - 1;
    const nextPage = currentPage + 1;
    return [
      1,
      "...",
      previousPage,
      currentPage,
      nextPage,
      "...",
      numberOfPages,
    ];
  }
};
