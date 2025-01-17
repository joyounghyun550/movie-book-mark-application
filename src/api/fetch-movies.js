import bearer from "../api/apikey.js";
// API 요청을 위한 옵션 설정
const apiUrl =
  "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page="; // API URL 상수화
const options = {
  method: "GET", // HTTP 메서드 설정 (GET 요청)
  headers: {
    accept: "application/json", // 응답 형식으로 JSON을 요청
    // API 인증을 위한 Bearer 토큰
    Authorization: bearer,
  },
};

// 영화 데이터 불러오기 함수
async function loadJson(url) {
  try {
    // 주어진 URL로 API 요청
    const response = await fetch(url, options);
    // 응답이 실패할 경우 에러 발생
    if (!response.ok) throw new Error(`${response.status} for ${response.url}`);
    // JSON 형식으로 응답 데이터 반환
    return response.json();
  } catch (error) {
    // 에러 발생 시 콘솔에 로깅하고 사용자에게 알림
    console.error("API 요청 중 오류 발생:", error);
    alert("영화 데이터를 불러오는 데 실패했습니다."); // 사용자에게 알림
    throw error; // 에러를 다시 던져서 호출자에게 알림
  }
}

// 영화 데이터를 가져오는 함수
async function fetchMovies(totalPages = 10) {
  const movieDataList = []; // 영화 데이터를 저장할 배열 초기화
  // 요청할 페이지 수만큼 loadJson 함수를 호출하여 요청 배열 생성
  const pageRequests = Array.from(
    { length: totalPages },
    (_, i) => loadJson(`${apiUrl}${i + 1}`) // 각 페이지에 대한 API 요청 생성
  );

  // 모든 페이지 요청을 병렬로 처리하고 결과를 기다림
  const results = await Promise.all(pageRequests);
  // 각 요청의 결과를 처리
  results.forEach((result) => {
    // 요청이 성공한 경우, 영화 데이터를 리스트에 추가
    movieDataList.push(...result.results);
  });

  // 모든 페이지의 결과를 반환
  return movieDataList;
}

// 그룹화하여 export
export { fetchMovies };
