# movie-book-mark-application

# 영화 북마크 애플리케이션

이 프로젝트는 사용자가 영화 목록을 보고, 북마크를 추가하거나 제거할 수 있는 웹 애플리케이션입니다. 사용자는 검색 기능을 통해 원하는 영화를 쉽게 찾을 수 있으며, 북마크 기능을 통해 관심 있는 영화를 저장 및 제거할 수 있습니다.

## 배포

 ```bash
 https://joyounghyun550.github.io/movie-book-mark-application/
 ```

 ## 트러블 슈팅

grid를 이용한 리스트 반응형으로 구현하기
      
   ```bash
   https://yyy3489.tistory.com/21
   ```

기존의 검색 데이터를 이용한 북마크 안의 검색
      
   ```bash
   https://yyy3489.tistory.com/22
   ```

git hub 계정 정지 및 복원신청
      
   ```bash
   https://yyy3489.tistory.com/23
   ```

## 기능

- 영화 목록 보기
- 영화 검색 기능
- 영화 북마크 추가 및 제거
- 북마크된 영화 목록 보기
- 모달을 통한 영화 상세 정보 보기

## 기술 스택

- HTML
- CSS
- JavaScript

## 설치 방법

1. 이 저장소를 클론합니다.

   ```bash
   git clone https://github.com/joyounghyun550/movie-book-mark-application.git

   ```

2. 프로젝트 디렉토리로 이동합니다.
   cd movie-book-mark-application

3. index.html 파일을 웹 브라우저에서 엽니다.

## 사용법

애플리케이션을 실행하면 영화 목록이 표시됩니다.
검색 바에 영화 제목을 입력하여 원하는 영화를 찾을 수 있습니다.
각 영화 아이콘을 클릭하면 해당 영화의 상세 정보를 모달로 확인할 수 있습니다.
모달에서 "북마크 추가" 버튼을 클릭하여 영화를 북마크할 수 있습니다.
모달에서 "북마크 제거" 버튼을 클릭하여 영화를 북마크 제거할 수 있습니다.
"북마크 보기" 버튼을 클릭하여 북마크된 영화 목록을 확인할 수 있습니다.
"전체 보기" 버튼을 클릭하여 전체 영화 목록을 확인할 수 있습니다.

## 코드 설명

fetch-movies.js : TMDB API를 통해 인기 영화 데이터를 비동기적으로 가져오는 JavaScript 모듈입니다.

handle-book-mark.js : 로컬 스토리지에서 영화 북마크를 관리하고, 북마크 추가/제거 및 목록 업데이트 기능을 제공하는 JavaScript 모듈입니다.

handle-modal.js : 영화 클릭 시 모달을 표시하고, 모달을 닫는 이벤트를 처리하는 JavaScript 모듈입니다.

handle-search.js : 사용자가 입력한 검색어에 따라 영화 목록을 필터링하고 업데이트하는 디바운스된 검색 이벤트 핸들러를 포함하는 JavaScript 모듈입니다.

modal.js : 영화 정보를 기반으로 모달의 내용을 업데이트하고 표시하며, 북마크 기능을 관리하는 JavaScript 모듈입니다.

render-movies.js : 영화 데이터를 가져오고 필터링하여 HTML 요소로 렌더링하며, 에러 메시지를 처리하는 JavaScript 모듈입니다.

debounce.js : 지정된 지연 시간 후에만 함수를 실행하도록 하는 디바운스 기능을 제공하는 JavaScript 함수입니다.

local-storage-util.js : 로컬 스토리지에서 데이터를 가져오고, 저장하며, 삭제 및 존재 여부를 확인하는 유틸리티 메서드를 제공하는 JavaScript 객체입니다.

main.js: 영화 목록을 업데이트하고, 다양한 사용자 인터랙션을 처리하기 위한 이벤트 리스너를 설정하는 초기화 기능을 포함한 JavaScript 모듈입니다.


## 기여

기여를 원하시는 분은 이 저장소를 포크한 후, 변경 사항을 커밋하고 풀 리퀘스트를 제출해 주세요.

## 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다.
