// 모달의 내용을 업데이트하는 함수
function updateModalContent(movie) {
  const poster = document.getElementById("posterPath"); // 포스터 요소
  const modalTitle = document.getElementById("modalTitle"); // 모달 제목 요소
  const view = document.getElementById("overview"); // 줄거리 요소
  const date = document.getElementById("releaseDate"); // 개봉일 요소
  const rating = document.getElementById("voteAverage"); // 평점 요소

  // 모달에 영화 포스터, 제목, 줄거리, 개봉일, 평점을 설정
  poster.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">`;
  modalTitle.innerHTML = `<h2>${movie.title}</h2>`;
  view.innerHTML = `<p>${
    movie.overview || "해당 영화의 줄거리 정보가 없습니다."
  }</p>`;
  date.innerHTML = `<p>개봉일 : ${movie.release_date}</p>`;
  rating.innerHTML = `<p>평점 : ${movie.vote_average}</p>`;
}

// 모달을 표시하는 함수 (이벤트 핸들러 설정 포함)
function showModal(movie, modalUtil) {
  // 모달 내용을 업데이트
  updateModalContent(movie);

  const bookMarkBtn = document.getElementById("bookMarkBtn"); // 북마크 버튼 요소
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

  const modal = document.getElementById("modalContainer"); // 모달 컨테이너 요소
  modal.style.display = "flex"; // 모달 표시
  document.body.style.overflow = "hidden"; // 스크롤 비활성화 (모달이 열릴 때)
}

// 모달을 숨기는 함수
function hideModal() {
  const modal = document.getElementById("modalContainer"); // 모달 컨테이너 요소
  const modalContent = document.getElementById("modalContent");
  modalContent.scrollTop = 0; // 모달 내용 스크롤 초기화
  modal.style.display = "none"; // 모달 숨김
  document.body.style.overflow = "auto"; // 스크롤 활성화 (모달이 닫힐 때)
}

// 그룹화하여 export
export { updateModalContent, showModal, hideModal };
