// renderMovies.jsa
import { DOM_ELEMENTS, VIEW_ALL } from "../main.js"; // main.js에서 필요한 요소와 상수 가져오기
import { fetchMovies } from "../api/fetch-movies.js"; // fetchMovies.js에서 fetchMovies 함수 가져오기
import { filterMovies } from "../events/handle-search.js"; // filterMovies 함수 가져오기
import { getBookmarkList } from "../events/handle-book-mark.js";

// 영화 데이터를 가져오고 렌더링하는 함수
async function fetchMoviesData() {
  try {
    const movies = await fetchMovies(); // 영화 데이터 가져오기
    if (!Array.isArray(movies)) {
      throw new Error("영화 데이터가 배열이 아닙니다."); // 데이터가 배열이 아닐 경우 에러 발생
    }
    return movies; // 영화 데이터 반환
  } catch (error) {
    console.error("영화 데이터를 불러오는 데 실패했습니다.", error); // 에러 로그
    renderErrorMessage(
      "영화 데이터를 가져오는 데 문제가 발생했습니다. 나중에 다시 시도해주세요." // 에러 메시지 렌더링
    );
    return []; // 빈 배열 반환
  }
}

// 에러 메시지를 렌더링하는 함수
function renderErrorMessage(message) {
  if (DOM_ELEMENTS.movieContainer) {
    DOM_ELEMENTS.movieContainer.innerHTML = `<div class="error-message">${message}</div>`; // 에러 메시지 표시
  }
}

// 렌더링할 영화 목록을 가져오는 함수
async function getMoviesToRender(isBookmarkedView, search = "") {
  const movies = isBookmarkedView ? getBookmarkList() : await fetchMoviesData(); // 북마크 보기 여부에 따라 영화 목록 가져오기
  return filterMovies(movies, search); // 필터링된 영화 목록 반환
}

// 영화 정보를 HTML 요소로 변환하는 함수
function createMovieElement(item) {
  const movieElement = document.createElement("div"); // 새로운 div 요소 생성
  movieElement.className = "movie"; // 클래스 이름 설정
  movieElement.setAttribute("data-id", item.id); // 영화 ID를 data-id 속성으로 설정

  // 영화 정보를 포함하는 HTML 구조 설정
  movieElement.innerHTML = `
            <div class="photo movieContent">
              <img class="photo" src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="${item.title}">
            </div>
            <div class="movieContent">
              <h4 class="title">${item.title}</h4>
              <h5 class="rating">평점: ${item.vote_average}</h5>
            </div>`;

  return movieElement; // 생성된 영화 요소 반환
}

// 영화 목록을 렌더링하는 함수
function renderMovies(movieData, container) {
  const fragment = document.createDocumentFragment(); // DocumentFragment 생성 (성능 최적화)

  // 각 영화 데이터에 대해 영화 요소 생성
  movieData.forEach((item) => {
    const movieElement = createMovieElement(item); // 영화 요소 생성
    fragment.appendChild(movieElement); // Fragment에 영화 요소 추가
  });

  container.innerHTML = ""; // 기존 내용을 비우고
  container.appendChild(fragment); // Fragment를 한 번에 추가하여 DOM 업데이트
}

// 영화 목록을 업데이트하는 함수
async function updateMovieList(search = "") {
  const isBookmarkedView = DOM_ELEMENTS.bookMarkLook.innerText === VIEW_ALL; // 현재 보기 상태 확인
  const moviesToRender = await getMoviesToRender(isBookmarkedView, search); // 렌더링할 영화 목록 가져오기
  renderMovies(moviesToRender, DOM_ELEMENTS.movieContainer); // 영화 목록 렌더링
}

// 그룹화하여 export
export {
  fetchMoviesData,
  renderErrorMessage,
  getMoviesToRender,
  createMovieElement,
  renderMovies,
  updateMovieList,
};
