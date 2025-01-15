// API 옵션 설정
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjE3YjhmMDhhNjAyY2RjMjI3MTQ4OTNjMGY3ZGUxOCIsIm5iZiI6MTczNjI5NjU0MS43NzcsInN1YiI6IjY3N2RjODVkMzRhNGU3NWU0OTdhZjZiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Krpv96y0IjpjuT99lDplpNTIJLXQ-jecsbUQC88zo6Y",
  },
};

// 공통 유틸리티: 로컬 스토리지 관리
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

// 영화 렌더링
function renderMovies(movieData, container) {
  container.innerHTML = movieData
    .map(
      (item) => `
      <div class="movie" data-id="${item.id}">
        <div class="photo movie_content">
          <img class="photo" src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="${item.title}">
        </div>
        <div class="movie_content">
          <h4 class="title">${item.title}</h4>
          <h5 class="rating">평점: ${item.vote_average}</h5>
        </div>
      </div>`
    )
    .join("");
}

// 북마크 토글 (추가/제거) - 알림 후 업데이트
async function toggleBookmark(movie) {
  const bookMarkList = localStorageUtil.get("bookMarkItem");
  const isBookmarked = localStorageUtil.exists("bookMarkItem", movie.id);

  if (isBookmarked) {
    localStorageUtil.remove("bookMarkItem", movie.id);
    alert("북마크에서 제거되었습니다.");
  } else {
    bookMarkList.push(movie);
    localStorageUtil.set("bookMarkItem", bookMarkList);
    alert("북마크에 추가되었습니다.");
  }

  // 모달 닫기
  modalUtil.hide();

  // 북마크 리스트 즉시 업데이트
  const bookMarkLook = document.querySelector(".book-mark-look");
  const movieContainer = document.querySelector(".movie-container");
  const updatedList =
    bookMarkLook.innerText === "전체 보기"
      ? localStorageUtil.get("bookMarkItem")
      : await fetchMovies();
  renderMovies(updatedList, movieContainer);
}

// 모달 관리
const modalUtil = {
  show(movie) {
    const modal = document.getElementById("modal_container");
    const poster = document.getElementById("poster_path");
    const modal_title = document.getElementById("modal_title");
    const view = document.getElementById("overview");
    const date = document.getElementById("release_date");
    const rating = document.getElementById("vote_average");
    const bookMarkBtn = document.getElementById("book-mark-btn");

    poster.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">`;
    modal_title.innerHTML = `<h2>${movie.title}</h2>`;
    view.innerHTML = `<p>${
      movie.overview || "해당 영화의 줄거리 정보가 없습니다."
    }</p>`;
    date.innerHTML = `<p>개봉일 : ${movie.release_date}</p>`;
    rating.innerHTML = `<p>평점 : ${movie.vote_average}</p>`;

    bookMarkBtn.innerHTML = localStorageUtil.exists("bookMarkItem", movie.id)
      ? "북마크 제거"
      : "북마크 추가";
    bookMarkBtn.onclick = () => toggleBookmark(movie);
    modal.style.display = "flex";
    document.body.style.overflow = "hidden"; // 스크롤 비활성화
  },

  hide() {
    const modal = document.getElementById("modal_container");
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // 스크롤 활성화
  },
};

// 초기화 및 이벤트 핸들러 설정
async function init() {
  const movieContainer = document.querySelector(".movie-container");
  const bookMarkLook = document.querySelector(".book-mark-look");
  const searchField = document.getElementById("searchBar");

  // 영화 데이터 로드 및 렌더링
  const movies = await fetchMovies();
  renderMovies(movies, movieContainer);

  // 영화 클릭 이벤트 위임 (모달 열기)
  movieContainer.addEventListener("click", (event) => {
    const movieDiv = event.target.closest(".movie");
    if (movieDiv) {
      const movieId = Number(movieDiv.dataset.id);
      const clickedMovie = movies.find((item) => item.id === movieId);
      if (clickedMovie) modalUtil.show(clickedMovie);
    }
  });

  // 북마크 보기 토글
  let bookMarkView = false;
  bookMarkLook.addEventListener("click", () => {
    bookMarkView = !bookMarkView;
    bookMarkLook.innerText = bookMarkView ? "전체 보기" : "북마크 보기";
    const bookMarkList = localStorageUtil.get("bookMarkItem");
    renderMovies(bookMarkView ? bookMarkList : movies, movieContainer);
  });

  // 검색 필터링
  searchField.addEventListener("keyup", () => {
    const search = searchField.value.toLowerCase();
    const filteredMovies = (
      bookMarkView ? localStorageUtil.get("bookMarkItem") : movies
    ).filter((movie) => movie.title.toLowerCase().includes(search));
    renderMovies(filteredMovies, movieContainer);
  });

  // 모달 닫기 이벤트
  document
    .getElementById("close-modal")
    .addEventListener("click", modalUtil.hide);
  window.addEventListener("click", (event) => {
    if (event.target.id === "modal_container") modalUtil.hide();
  });
}

// 초기화 실행
document.addEventListener("DOMContentLoaded", init);
