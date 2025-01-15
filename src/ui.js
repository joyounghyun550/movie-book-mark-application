function renderMovies(movieData, container) {
    container.innerHTML = movieData
      .map(item => `
        <div class="movie" data-id="${item.id}">
          <div class="photo movie_content">
            <img class="photo" src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="${item.title}">
          </div>
          <div class="movie_content">
            <h4 class="title">${item.title}</h4>
            <h5 class="rating">평점: ${item.vote_average}</h5>
          </div>
        </div>`).join("");
  }
  
  function showModal(movie, modalUtil) {
    const modal = document.getElementById("modal_container");
    const poster = document.getElementById("poster_path");
    const modal_title = document.getElementById("modal_title");
    const view = document.getElementById("overview");
    const date = document.getElementById("release_date");
    const rating = document.getElementById("vote_average");
    const bookMarkBtn = document.getElementById("book-mark-btn");
  
    poster.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">`;
    modal_title.innerHTML = `<h2>${movie.title}</h2>`;
    view.innerHTML = `<p>${movie.overview || "해당 영화의 줄거리 정보가 없습니다."}</p>`;
    date.innerHTML = `<p>개봉일 : ${movie.release_date}</p>`;
    rating.innerHTML = `<p>평점 : ${movie.vote_average}</p>`;
  
    bookMarkBtn.innerHTML = modalUtil.localStorageUtil.exists("bookMarkItem", movie.id) ? "북마크 제거" : "북마크 추가";
    bookMarkBtn.onclick = () => modalUtil.toggleBookmark(movie);
    modal.style.display = "flex";
    document.body.style.overflow = "hidden"; // 스크롤 비활성화
  }
  
  function hideModal() {
    const modal = document.getElementById("modal_container");
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // 스크롤 활성화
  }
  
  export { renderMovies, showModal, hideModal };