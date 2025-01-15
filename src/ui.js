// 영화 정보를 HTML 요소로 변환하는 함수
function createMovieElement(item) {
  const movieElement = document.createElement("div"); // 새로운 div 요소 생성
  movieElement.className = "movie"; // 클래스 이름 설정
  movieElement.setAttribute("data-id", item.id); // 영화 ID를 data-id 속성으로 설정

  // 영화 정보를 포함하는 HTML 구조 설정
  movieElement.innerHTML = `
            <div class="photo movie_content">
              <img class="photo" src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="${item.title}">
            </div>
            <div class="movie_content">
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

// 모달의 내용을 업데이트하는 함수
function updateModalContent(movie) {
  const poster = document.getElementById("poster_path"); // 포스터 요소
  const modal_title = document.getElementById("modal_title"); // 모달 제목 요소
  const view = document.getElementById("overview"); // 줄거리 요소
  const date = document.getElementById("release_date"); // 개봉일 요소
  const rating = document.getElementById("vote_average"); // 평점 요소

  // 모달에 영화 포스터, 제목, 줄거리, 개봉일, 평점을 설정
  poster.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">`;
  modal_title.innerHTML = `<h2>${movie.title}</h2>`;
  view.innerHTML = `<p>${
    movie.overview || "해당 영화의 줄거리 정보가 없습니다."
  }</p>`;
  date.innerHTML = `<p>개봉일 : ${movie.release_date}</p>`;
  rating.innerHTML = `<p>평점 : ${movie.vote_average}</p>`;
}

// 모달을 표시하는 함수
function showModal(movie, modalUtil) {
  // 모달 내용을 업데이트
  updateModalContent(movie);

  const bookMarkBtn = document.getElementById("book-mark-btn"); // 북마크 버튼 요소
  // 북마크 버튼의 텍스트를 설정
  bookMarkBtn.innerHTML = modalUtil.localStorageUtil.exists(
    "bookMarkItem",
    movie.id
  )
    ? "북마크 제거" // 북마크가 있을 경우
    : "북마크 추가"; // 북마크가 없을 경우

  // 북마크 버튼 클릭 시 동작 설정
  bookMarkBtn.onclick = () => {
    // 버튼 클릭 시 UI를 잠시 비활성화하여 중복 클릭 방지
    bookMarkBtn.disabled = true;

    // 북마크 토글 함수 호출
    modalUtil.toggleBookmark(movie);

    // 버튼 활성화
    bookMarkBtn.disabled = false;
  };

  const modal = document.getElementById("modal_container"); // 모달 컨테이너 요소
  modal.style.display = "flex"; // 모달 표시
  document.body.style.overflow = "hidden"; // 스크롤 비활성화 (모달이 열릴 때)
}

// 모달을 숨기는 함수
function hideModal() {
  const modal = document.getElementById("modal_container"); // 모달 컨테이너 요소
  const modalContent = document.getElementById("modal_content");
  modalContent.scrollTop = 0;
  modal.style.display = "none"; // 모달 숨김
  document.body.style.overflow = "auto"; // 스크롤 활성화 (모달이 닫힐 때)
}

// 외부에서 사용할 함수들을 export
export { renderMovies, showModal, hideModal }; // renderMovies, showModal, hideModal 함수를 외부에서 사용할 수 있도록 내보냄
