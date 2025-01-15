import { fetchMovies, localStorageUtil } from "./api.js";
import { renderMovies, showModal, hideModal } from "./ui.js";

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
  hideModal();

  // 북마크 리스트 즉시 업데이트
  const bookMarkLook = document.querySelector(".book-mark-look");
  const movieContainer = document.querySelector(".movie-container");
  const updatedList =
    bookMarkLook.innerText === "전체 보기"
      ? localStorageUtil.get("bookMarkItem")
      : await fetchMovies();
  renderMovies(updatedList, movieContainer);
}

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
      if (clickedMovie)
        showModal(clickedMovie, { toggleBookmark, localStorageUtil });
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
  document.getElementById("close-modal").addEventListener("click", hideModal);
  window.addEventListener("click", (event) => {
    if (event.target.id === "modal_container") hideModal();
  });
}

// 초기화 실행
document.addEventListener("DOMContentLoaded", init);
