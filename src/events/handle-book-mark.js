// handleBookmark.js;
import { localStorageUtil } from "../api/local-storage-util.js";
import { showNotification } from "../ui/notification.js";
import { updateMovieList } from "../ui/render-movies.js";
import {
  STORAGE_KEYS,
  DOM_ELEMENTS,
  VIEW_BOOKMARK,
  VIEW_ALL,
} from "../main.js";

// 로컬 스토리지에서 북마크 목록을 가져오는 함수
function getBookmarkList() {
  return localStorageUtil.get(STORAGE_KEYS.BOOKMARK) || []; // 북마크가 없으면 빈 배열 반환
}

// 북마크를 토글하는 함수
async function toggleBookmark(movie) {
  const bookMarkList = getBookmarkList(); // 현재 북마크 목록 가져오기
  const isBookmarked = localStorageUtil.exists(STORAGE_KEYS.BOOKMARK, movie.id); // 영화가 북마크에 있는지 확인

  if (isBookmarked) {
    // 영화가 이미 북마크에 있다면
    localStorageUtil.remove(STORAGE_KEYS.BOOKMARK, movie.id); // 북마크에서 제거
    await showNotification("북마크 제거 되었습니다."); // 알림 표시
    updateMovieList(); // 영화 목록 업데이트
  } else {
    // 영화가 북마크에 없다면
    bookMarkList.push(movie); // 북마크 목록에 추가
    localStorageUtil.set(STORAGE_KEYS.BOOKMARK, bookMarkList); // 로컬 스토리지에 저장
    await showNotification("북마크 추가 되었습니다."); // 알림 표시
  }

  DOM_ELEMENTS.searchField.value = ""; // 검색 입력 필드 초기화
}

// 북마크 보기 토글 핸들러
async function handleBookmarkToggle() {
  const bookMarkLook = DOM_ELEMENTS.bookMarkLook;
  bookMarkLook.innerText =
    bookMarkLook.innerText === VIEW_ALL ? VIEW_BOOKMARK : VIEW_ALL; // 버튼 텍스트를 토글합니다.
  updateMovieList(DOM_ELEMENTS.searchField.value); // 영화 목록 업데이트
}

// 그룹화하여 export
export { getBookmarkList, toggleBookmark, handleBookmarkToggle };
