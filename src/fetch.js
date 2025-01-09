export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjE3YjhmMDhhNjAyY2RjMjI3MTQ4OTNjMGY3ZGUxOCIsIm5iZiI6MTczNjI5NjU0MS43NzcsInN1YiI6IjY3N2RjODVkMzRhNGU3NWU0OTdhZjZiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Krpv96y0IjpjuT99lDplpNTIJLXQ-jecsbUQC88zo6Y",
  },
};

export class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = "HttpError";
    this.response = response;
  }
}

// loadJson함수는 url을 입력받아 fetch함수를 호출해주고 그 통신이 성공했을때(statusCode 200), 결과를 반환해주는 함수입니다.
// 만약 통신이 실패하는 경우 위에 작성한 에러 객체를 반환해줍니다.
export async function loadJson(url) {
  // fetch함수는 네트워크 통신 프로미스를 반환하는 대표적인 함수
  const response = await fetch(url, options);
  if (response.status == 200) {
    return response.json();
  } else {
    throw new HttpError(response);
  }
}

export async function Movie() {
  while (true) {
    try {
      res = await loadJson(
        `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`
      );
      break;
    } catch (err) {
      if (err instanceof HttpError && err.response.status == 404) {
        alert("무언가 에러가 발생했군요!");
      } else {
        throw err;
      }
    }
  }
  const data = res.results;
  console.log(data[0].title, data[0].backdrop_path, data[0].vote_average);

  return data;
}

Movie();
