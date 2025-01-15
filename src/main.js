import { fetchMovies, localStorageUtil } from "./api.js"; // API에서 영화 데이터를 가져오는 함수와 로컬 스토리지 유틸리티를 가져옵니다.
import { renderMovies, showModal, hideModal } from "./ui.js"; // UI 관련 함수들을 가져옵니다.

// 상수 정의
const VIEW_ALL = "전체 보기"; // 전체 영화 보기 텍스트
const VIEW_BOOKMARK = "북마크 보기"; // 북마크 영화 보기 텍스트
const MOVIE_CONTAINER_SELECTOR = ".movieContainer"; // 영화 목록을 표시할 컨테이너의 선택자
const BOOKMARK_LOOK_SELECTOR = ".bookMarkLook"; // 북마크 보기 버튼의 선택자
const SEARCH_BAR_ID = "searchBar"; // 검색 바의 ID
const CLOSE_MODAL_ID = "closeModal"; // 모달 닫기 버튼의 ID
const MODAL_CONTAINER_ID = "modalContainer"; // 모달 컨테이너의 ID

// 북마크를 토글하는 함수
function toggleBookmark(movie) {
  const bookMarkList = localStorageUtil.get("bookMarkItem") || []; // 로컬 스토리지에서 북마크 목록을 가져옵니다.
  const isBookmarked = localStorageUtil.exists("bookMarkItem", movie.id); // 영화가 북마크에 있는지 확인합니다.

  // 북마크가 이미 존재하는 경우
  if (isBookmarked) {
    localStorageUtil.remove("bookMarkItem", movie.id); // 북마크에서 제거합니다.
    // 사용자에게 알림
    Swal.fire({
      icon: "success",
      title: "북마크 제거 되었습니다.",
    }).then((result) => {
      if (result.isConfirmed) {
        hideModal(); // 모달을 닫습니다.
      }
    });
  } else {
    bookMarkList.push(movie); // 북마크 목록에 추가합니다.
    localStorageUtil.set("bookMarkItem", bookMarkList); // 업데이트된 북마크 목록을 로컬 스토리지에 저장합니다.
    // 사용자에게 알림
    Swal.fire({
      icon: "success",
      title: "북마크 추가 되었습니다.",
    }).then((result) => {
      if (result.isConfirmed) {
        hideModal(); // 모달을 닫습니다.
      }
    });
  }
  updateMovieList(); // 영화 목록을 즉시 업데이트합니다.
}

// 영화 데이터를 가져오고 렌더링하는 함수
async function fetchMoviesData() {
  try {
    const movies = await fetchMovies(); // 영화 데이터를 비동기로 가져옵니다.
    if (!Array.isArray(movies)) {
      throw new Error("영화 데이터가 배열이 아닙니다."); // 배열이 아닐 경우 에러 발생
    }
    return movies;
  } catch (error) {
    console.error("영화 데이터를 불러오는 데 실패했습니다.", error); // 에러 로그
    alert(`영화 데이터를 불러오는 데 실패했습니다: ${error.message}`); // 구체적인 에러 메시지
    return []; // 빈 배열 반환
  }
}

// 영화 목록을 업데이트하는 함수
async function updateMovieList() {
  const movieContainer = document.querySelector(MOVIE_CONTAINER_SELECTOR); // 영화 컨테이너를 선택합니다.
  const bookMarkList = localStorageUtil.get("bookMarkItem") || []; // 북마크 목록을 가져옵니다.
  const movies = await fetchMoviesData(); // 영화 데이터를 가져옵니다.

  const isBookmarkedView =
    document.querySelector(BOOKMARK_LOOK_SELECTOR).innerText === VIEW_ALL; // 현재 보고 있는 뷰가 북마크인지 확인합니다.

  renderMovies(isBookmarkedView ? bookMarkList : movies, movieContainer); // 적절한 영화 목록을 렌더링합니다.
}

// 영화 클릭 이벤트 핸들러
async function handleMovieClick(event) {
  const movieDiv = event.target.closest(".movie"); // 클릭한 영화 요소를 찾습니다.
  if (movieDiv) {
    const movieId = Number(movieDiv.dataset.id); // 영화 ID를 가져옵니다.
    const movies = await fetchMoviesData(); // 영화 목록을 가져옵니다.
    const clickedMovie = movies.find((item) => item.id === movieId); // 클릭한 영화 객체를 찾습니다.
    if (clickedMovie) {
      showModal(clickedMovie, { toggleBookmark, localStorageUtil }); // 모달을 보여줍니다.
    }
  }
}

// 북마크 보기 토글 핸들러
function handleBookmarkToggle() {
  const bookMarkLook = document.querySelector(BOOKMARK_LOOK_SELECTOR); // 북마크 보기 버튼을 선택합니다.
  bookMarkLook.innerText =
    bookMarkLook.innerText === VIEW_ALL ? VIEW_BOOKMARK : VIEW_ALL; // 버튼 텍스트를 토글합니다.
  updateMovieList(); // 영화 리스트를 업데이트합니다.
}

// 영화 필터링 함수
function filterMovies(movies, search) {
  return movies.filter((movie) => movie.title.toLowerCase().includes(search)); // 제목에 검색어가 포함된 영화만 반환합니다.
}

// 디바운스 함수 추가
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId); // 이전 타이머를 클리어합니다.
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args); // 지정된 시간 후에 함수 호출
    }, delay);
  };
}

// 검색 이벤트 핸들러
const debouncedHandleSearch = debounce(async (event) => {
  const search = event.target.value.toLowerCase(); // 검색어를 소문자로 변환합니다.
  const bookMarkList = localStorageUtil.get("bookMarkItem") || []; // 북마크 목록을 가져옵니다.
  const filteredMovies =
    document.querySelector(BOOKMARK_LOOK_SELECTOR).innerText === VIEW_ALL
      ? bookMarkList // 북마크 보기일 경우 북마크 목록을 필터링합니다.
      : await fetchMoviesData(); // 전체 영화 목록을 가져옵니다.

  renderMovies(
    filterMovies(filteredMovies, search),
    document.querySelector(MOVIE_CONTAINER_SELECTOR)
  ); // 필터링된 영화 목록을 렌더링합니다.
}, 300); // 300ms 지연

// 모달 닫기 이벤트 핸들러
function handleModalClose(event) {
  if (
    event.target.id === CLOSE_MODAL_ID ||
    event.target.id === MODAL_CONTAINER_ID
  ) {
    // 닫기 버튼 클릭 시 또는 모달 외부 클릭 시
    hideModal(); // 모달을 닫습니다.
  }
}

// 이벤트 리스너 추가 함수
function addEventListeners() {
  const movieContainer = document.querySelector(MOVIE_CONTAINER_SELECTOR); // 영화 컨테이너 선택
  const bookMarkLook = document.querySelector(BOOKMARK_LOOK_SELECTOR); // 북마크 보기 버튼 선택
  const searchField = document.getElementById(SEARCH_BAR_ID); // 검색 바 선택

  movieContainer.addEventListener("click", handleMovieClick); // 영화 클릭 이벤트 리스너 추가
  bookMarkLook.addEventListener("click", handleBookmarkToggle); // 북마크 보기 클릭 이벤트 리스너 추가
  searchField.addEventListener("keyup", debouncedHandleSearch); // 검색 바 키업 이벤트 리스너 추가
  document.getElementById(CLOSE_MODAL_ID).addEventListener("click", hideModal); // 모달 닫기 버튼 클릭 이벤트 리스너 추가
  window.addEventListener("click", handleModalClose); // 모달 외부 클릭 이벤트 리스너 추가
}

// 초기화 함수
async function init() {
  await updateMovieList(); // 영화 목록을 업데이트합니다.
  addEventListeners(); // 이벤트 리스너를 추가합니다.
}

// DOMContentLoaded 이벤트가 발생하면 초기화 함수 실행
document.addEventListener("DOMContentLoaded", init);
