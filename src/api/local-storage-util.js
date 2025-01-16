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

export { localStorageUtil };
