// 디바운스 함수 추가
function debounce(func, delay) {
  let timeoutId; // 타임아웃 ID 저장
  return function (...args) {
    clearTimeout(timeoutId); // 이전 타임아웃 클리어
    timeoutId = setTimeout(() => func.apply(this, args), delay); // 새로운 타임아웃 설정
  };
}

export { debounce };
