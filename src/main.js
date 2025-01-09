import { Movie, options, HttpError, loadJson } from "./fetch.js";

let movieData = Movie;

console.log(movieData[0].title);
const movieContainer = document.querySelector(".movie-container");

movieData.forEach((movie, idx) => {
  const movieDiv = document.createElement("div");
  movieDiv.className = "movie";

  movieDiv.innerHTML = `
            <div class="photo movie_content" id="movie_content_${idx}">
                <img src="https://image.tmdb.org/t/p/w500${movie["poster_path"]}">
            </div>            
            <div class="movie_content">
            <h5 class='title'>${movie["title"]}</h5>
            <span class='rating'>${movie["vote_average"]}</span>
            </div>
        `;

  movieContainer.appendChild(movieDiv);

  // Add event listener for each movie to show modal
  const movieContent = document.getElementById(`movie_content_${idx}`);
  memberContent.addEventListener("click", () => {
    showModal(movies[idx]);
  });
});
