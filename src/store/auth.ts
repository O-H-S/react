import { atom } from 'recoil';


// key 값은 전체 Recoil 상태 트리 내에서 유일해야 합니다. 
// 따라서 같은 key를 가진 두 개의 atom을 정의하면 오류가 발생

// 해당 atom은 편의를 위한 부수적인 변수이다. (loggedSession이 존재하거나, jwt 토큰이 존재할 때 true)
export const loggedIn = atom({
  key: 'loggedIn',
  default: false,
});

export const loggedSession = atom({
  key : 'loggedSession',
  default : null,
});