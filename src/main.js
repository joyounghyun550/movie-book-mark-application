const movieContainer = document.querySelector(".movie-container");

movies.forEach((movie, idx) => {
  const movieDiv = document.createElement("div");
  movieDiv.className = "movie";

  movieDiv.innerHTML = `
            <div class="photo movie_content" id="movie_content_${idx}">
                <img src="${movie.backgroundImage}" alt="${movie.title}">
            </div>            
            <div class="movie_content">
            <h5 class='title'>${movie.title}</h5>
            <span class='rating'>${movie.rating}</span>
            </div>
        `;

  movieContainer.appendChild(movieDiv);

  // Add event listener for each movie to show modal
  const movieContent = document.getElementById(`movie_content_${idx}`);
  memberContent.addEventListener("click", () => {
    showModal(movies[idx]);
  });
});
