const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjE3YjhmMDhhNjAyY2RjMjI3MTQ4OTNjMGY3ZGUxOCIsIm5iZiI6MTczNjI5NjU0MS43NzcsInN1YiI6IjY3N2RjODVkMzRhNGU3NWU0OTdhZjZiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Krpv96y0IjpjuT99lDplpNTIJLXQ-jecsbUQC88zo6Y",
  },
};

// 영화 데이터 불러오기
async function loadJson(url) {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`${response.status} for ${response.url}`);
  return await response.json();
}

// 영화 데이터 가져오기
async function fetchMovies(totalPages = 10) {
  const movieDataList = await Promise.all(
    Array.from({ length: totalPages }, (_, i) =>
      loadJson(
        `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${
          i + 1
        }`
      )
    )
  );
  return movieDataList.flatMap((data) => data.results);
}

// 로컬 스토리지 유틸리티
const localStorageUtil = {
  get(key) {
    return JSON.parse(window.localStorage.getItem(key)) || [];
  },
  set(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key, id) {
    const items = this.get(key).filter((item) => item.id !== id);
    this.set(key, items);
  },
  exists(key, id) {
    return this.get(key).some((item) => item.id === id);
  },
};

export { fetchMovies, localStorageUtil };
