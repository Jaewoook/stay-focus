# stay-focus

## 소개

어느 날 통제된 환경이 작업 효율에 좋은 영향을 미친다는 주제로 친구와 이야기를 하게 되었습니다. 그러다 문득 습관적으로 트위치나 유튜브 같은 일과 크게 관련없는 사이트를 들어가게 되어 작업을 방해한다고 생각해서 작업 환경을 통제해주고, 하고자 하는 일을 집중해서 할 수 있게 도와주는 크롬 확장 프로그램을 만들면 재밌겠다는 생각이 들어 이 프로젝트를 시작하게 되었습니다.

## 기능

- 사이트 차단
- 차단할 사이트 관리
- 차단할 사이트 삭제
- 차단 예외 사이트 관리 (구현 예정)
- 차단한 사이트 방문 시 차단된 사이트임을 알 수 있는 이미지 표시

## 알려진 이슈 (버그가 아니라 기능일수도?!)

- 소리가 재생되는 사이트 방문 시 사이트 내용은 안보이지만 백그라운드에서 소리는 재생됨

## 소스로 설치하기

아래 순서에 따라 소스로부터 설치를 진행할 수 있습니다.

1. 프로젝트 클론
```sh
$ git clone https://github.com/Jaewoook/stay-focus.git
```
2. 프로젝트 빌드
```sh
# Install project dependencies
$ yarn

# Build project (extension / settings)
$ yarn build

# Package extension
$ yarn package
```
3. 확장 프로그램 설치
- 크롬 확장프로그램 관리 페이지로 이동 (chrome://extensions/)
- 개발자 모드 활성화
- Load unpacked 클릭 후 `${PROJECT_ROOT}/extension/dist` 폴더 선택

## 만든이

- 안재욱 (Jaewook Ahn) <ajw4586@gmail.com>

## 저작권

MIT (LICENSE.md 참조)
