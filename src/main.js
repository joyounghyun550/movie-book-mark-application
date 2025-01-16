// 필요한 함수 import
import { updateMovieList } from "./ui/render-movies.js";
import { handleMovieClick, handleModalClose } from "./events/handle-modal.js"; // handleModal.js에서 필요한 함수 가져오기
import { handleBookmarkToggle } from "./events/handle-book-mark.js"; // handleBookmark.js에서 필요한 함수 가져오기
import { debouncedHandleSearch } from "./events/handle-search.js";
import { hideModal } from "./ui/modal.js"; // modal.js에서 필요한 함수 가져오기

// 상수 정의
const VIEW_ALL = "전체 보기"; // 전체 영화 보기 상태를 나타내는 상수
const VIEW_BOOKMARK = "북마크 보기"; // 북마크 영화 보기 상태를 나타내는 상수
const STORAGE_KEYS = { BOOKMARK: "bookMarkItem" }; // 로컬 스토리지에서 북마크를 저장할 키
const SELECTORS = {
  MOVIE_CONTAINER: ".movieContainer", // 영화 목록을 렌더링할 DOM 요소 선택자
  BOOKMARK_LOOK: ".bookMarkLook", // 북마크 보기 토글 버튼 선택자
  SEARCH_BAR: "searchBar", // 검색 입력 필드의 ID
  CLOSE_MODAL: "closeModal", // 모달 닫기 버튼의 ID
  MODAL_CONTAINER: "modalContainer", // 모달 컨테이너의 ID
};

// DOM 요소를 선택하여 저장
const DOM_ELEMENTS = {
  movieContainer: document.querySelector(SELECTORS.MOVIE_CONTAINER), // 영화 목록을 표시할 컨테이너
  bookMarkLook: document.querySelector(SELECTORS.BOOKMARK_LOOK), // 북마크 보기 버튼
  searchField: document.getElementById(SELECTORS.SEARCH_BAR), // 검색 입력 필드
};

// 이벤트 리스너 추가 함수
function addEventListeners() {
  DOM_ELEMENTS.movieContainer.addEventListener("click", handleMovieClick); // 영화 클릭 이벤트 리스너 추가
  DOM_ELEMENTS.bookMarkLook.addEventListener("click", handleBookmarkToggle); // 북마크 보기 토글 이벤트 리스너 추가
  DOM_ELEMENTS.searchField.addEventListener("keyup", debouncedHandleSearch); // 검색 입력 필드에 디바운스 검색 이벤트 리스너 추가
  document
    .getElementById(SELECTORS.CLOSE_MODAL)
    .addEventListener("click", hideModal); // 모달 닫기 버튼 이벤트 리스너 추가
  window.addEventListener("click", handleModalClose); // 모달 외부 클릭 이벤트 리스너 추가
}

// 초기화 함수
async function init() {
  await updateMovieList(); // 영화 목록을 업데이트합니다.
  addEventListeners(); // 이벤트 리스너를 추가합니다.
}

// DOMContentLoaded 이벤트가 발생하면 초기화 함수 실행
document.addEventListener("DOMContentLoaded", init);

// 그룹화하여 export
export {
  VIEW_ALL,
  VIEW_BOOKMARK,
  STORAGE_KEYS,
  SELECTORS,
  DOM_ELEMENTS,
  addEventListeners,
  init,
};
