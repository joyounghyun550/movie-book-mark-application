// handleModal.js
import { SELECTORS } from "../main.js";
import { getMoviesToRender } from "../ui/render-movies.js";
import { showModal, hideModal } from "../ui/modal.js";
import { toggleBookmark } from "./handle-book-mark.js";
import { localStorageUtil } from "../untils/local-storage-util.js";

// 영화 클릭 이벤트 핸들러
async function handleMovieClick(event) {
  const movieDiv = event.target.closest(".movie"); // 클릭된 영화 요소 찾기
  if (movieDiv) {
    const movieId = Number(movieDiv.dataset.id); // 영화 ID 가져오기
    const movies = await getMoviesToRender(false); // 전체 영화 데이터 가져오기
    const clickedMovie = movies.find((item) => item.id === movieId); // 클릭된 영화 찾기
    if (clickedMovie) {
      showModal(clickedMovie, { toggleBookmark, localStorageUtil }); // 모달 표시
    }
  }
}

// 모달 닫기 이벤트 핸들러
function handleModalClose(event) {
  if (
    event.target.id === SELECTORS.CLOSE_MODAL || // 모달 닫기 버튼 클릭 시
    event.target.id === SELECTORS.MODAL_CONTAINER // 모달 외부 클릭 시
  ) {
    hideModal(); // 모달 닫기
  }
}

// 그룹화하여 export
export { handleMovieClick, handleModalClose };
