import { debounce } from "../utils/debounce.js";
import { updateMovieList } from "../ui/render-movies.js"; // updateMovieList 함수 가져오기

// 검색 이벤트 핸들러
const debouncedHandleSearch = debounce(async (event) => {
  updateMovieList(event.target.value.toLowerCase()); // 검색어에 따라 영화 목록 업데이트
}, 500); // 500ms 지연

// 영화 필터링 함수
function filterMovies(movies, search) {
  const lowerSearch = search.toLowerCase(); // 검색어를 소문자로 변환
  return movies.filter(
    (movie) => movie.title.toLowerCase().includes(lowerSearch) // 영화 제목이 검색어가 포함되는지 확인
  );
}

// 그룹화하여 export
export { filterMovies, debouncedHandleSearch };
