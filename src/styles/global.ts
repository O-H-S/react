import { css } from '@emotion/react';
// 전통적인 CSS에서는 글로벌 네임스페이스를 사용하기 때문에, 큰 프로젝트에서 스타일의 충돌이 발생할 수 있습니다. 
// 반면, CSS-in-JS 라이브러리는 대부분 스타일을 컴포넌트 레벨에서 적용하므로, 이름 충돌 없이 스타일을 관리할 수 있습니다.


export const GlobalStyle = css({
    body : {
        margin : 0
    },
    main: {
        margin: 0,
        padding: 0,
        'min-height': '100vh', /* 뷰포트의 높이에 맞춰 최소 높이 설정 */
        //'width': '100vw' /* 뷰포트 너비에 맞춤 */
    }
});