const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjE3YjhmMDhhNjAyY2RjMjI3MTQ4OTNjMGY3ZGUxOCIsIm5iZiI6MTczNjI5NjU0MS43NzcsInN1YiI6IjY3N2RjODVkMzRhNGU3NWU0OTdhZjZiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Krpv96y0IjpjuT99lDplpNTIJLXQ-jecsbUQC88zo6Y",
  },
};

class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = "HttpError";
    this.response = response;
  }
}

async function loadJson(url) {
  const response = await fetch(url, options);
  if (response.status === 200) {
    return response.json();
  } else {
    throw new HttpError(response);
  }
}

async function Movie() {
  while (true) {
    try {
      const res = await loadJson(
        `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`
      );
      return res.results; // 성공적으로 데이터를 가져오면 반환
    } catch (err) {
      if (err instanceof HttpError && err.response.status === 404) {
        alert("데이터를 찾을 수 없습니다! 잠시 후 다시 시도해주세요.");
      } else {
        alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
        console.error(err);
        throw err;
      }
    }
  }
}

async function renderMovies() {
  try {
    const movieData = await Movie(); // 데이터를 비동기로 가져옴
    const movieContainer = document.querySelector(".movie-container");
    console.log(movieData);

    movieData.forEach((movie, idx) => {
      const movieDiv = document.createElement("div");
      movieDiv.className = "movie";

      movieDiv.innerHTML = `
        <div class="photo movie_content" id="movie_content_${idx}">
          <img src="https://image.tmdb.org/t/p/w500${movie["poster_path"]}" alt="${movie["title"]}">
        </div>
        <div class="movie_content">
          <h5 class='title'>${movie["title"]}</h5>
          <span class='rating'>평점:  ${movie["vote_average"]}</span>
        </div>
      `;

      movieContainer.appendChild(movieDiv);

      // 영화 클릭 시 모달 표시
      const movieContent = document.getElementById(`movie_content_${idx}`);
      movieContent.addEventListener("click", () => {
        showModal(movie); // 영화 데이터를 전달
      });
    });
  } catch (err) {
    console.error("영화 데이터를 렌더링하는 중 오류 발생:", err);
  }
}

// 영화 상세 정보를 보여주는 모달
function showModal(movie) {
  const modal = document.getElementById("modal_container");
  const modalContent = document.getElementById("modal_content");

  modalContent.innerHTML = `
    <h2>${movie.title}</h2>
    <p>평점: ${movie.vote_average}</p>
    <p>${movie.overview}</p>
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
  `;

  modal.style.display = "flex"; // 모달 열기
  disableScroll();
}

// 모달 닫기
const closeBtn = document.getElementById("close-modal");
closeBtn.addEventListener("click", () => {
  const modal = document.getElementById("modal_container");
  modal.style.display = "none"; // 모달 닫기
  enableScroll();
});

// 모달 외부 클릭 시 닫기
window.addEventListener("click", (event) => {
  const modal = document.getElementById("modal_container");
  if (event.target === modal) {
    modal.style.display = "none";
    enableScroll();
  }
});

// 스크롤 비활성화 함수
function disableScroll() {
  document.body.style.overflow = "hidden";
}

// 스크롤 활성화 함수
function enableScroll() {
  document.body.style.overflow = "auto";
}

// 페이지 로드 시 영화 데이터 렌더링
document.addEventListener("DOMContentLoaded", renderMovies);
