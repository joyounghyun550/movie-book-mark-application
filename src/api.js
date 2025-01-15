// API 요청을 위한 옵션 설정
const apiUrl =
  "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page="; // API URL 상수화
const options = {
  method: "GET", // HTTP 메서드 설정 (GET 요청)
  headers: {
    accept: "application/json", // 응답 형식으로 JSON을 요청
    // API 인증을 위한 Bearer 토큰
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjE3YjhmMDhhNjAyY2RjMjI3MTQ4OTNjMGY3ZGUxOCIsIm5iZiI6MTczNjI5NjU0MS43NzcsInN1YiI6IjY3N2RjODVkMzRhNGU3NWU0OTdhZjZiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Krpv96y0IjpjuT99lDplpNTIJLXQ-jecsbUQC88zo6Y",
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

// 로컬 스토리지 유틸리티 객체
const localStorageUtil = {
  // 로컬 스토리지에서 데이터를 가져오는 메서드
  get(key) {
    // 주어진 키에 해당하는 데이터를 로컬 스토리지에서 가져옴
    const data = window.localStorage.getItem(key);
    // 데이터가 존재하면 JSON으로 파싱하여 반환, 없으면 빈 배열 반환
    return data ? JSON.parse(data) : [];
  },
  // 로컬 스토리지에 데이터를 저장하는 메서드
  set(key, value) {
    // 데이터를 JSON 문자열로 변환하여 로컬 스토리지에 저장
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  // 로컬 스토리지에서 특정 ID의 데이터를 제거하는 메서드
  remove(key, id) {
    // ID가 일치하지 않는 항목만 필터링하여 새로운 배열 생성
    const items = this.get(key).filter((item) => item.id !== id);
    // 필터링된 리스트를 다시 로컬 스토리지에 저장
    this.set(key, items);
  },
  // 로컬 스토리지에 특정 ID의 데이터가 존재하는지 확인하는 메서드
  exists(key, id) {
    // ID가 일치하는 항목이 있는지 확인하여 불리언 값 반환
    return this.get(key).some((item) => item.id === id);
  },
};

// 외부에서 사용할 함수들을 export
export { fetchMovies, localStorageUtil }; // fetchMovies와 localStorageUtil을 외부에서 사용할 수 있도록 내보냄
