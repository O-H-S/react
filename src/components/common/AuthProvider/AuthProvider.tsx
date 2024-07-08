import type { PropsWithChildren } from 'react';
import { useLayoutEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';

import { loggedIn, loggedSession } from '@store/auth';
import { useLoggedInStateHandle } from '@/hooks/common/useLoggedInStateHandle';
import { useApiResponseHandle } from '@/hooks/common/useApiResponseHandle';

// PropsWithChildren는 주로 컴포넌트 정의에서 사용되며, 컴포넌트가 자식 요소들을 받을 수 있음을 타입에 명시적으로 포함시키고자 할 때 사용됩니다. 
// PropsWithChildren를 사용하면 기본적으로 포함되는 필드는 children입니다. children은 React 컴포넌트가 받을 수 있는 자식 요소들을 의미하며, React.ReactNode 타입을 가집니다. 
// ComponentPropsWithoutRef<T>는 컴포넌트의 프로퍼티 타입을 다른 곳에서 재사용하고자 할 때, 특히 ref 프로퍼티를 제외한 나머지 프로퍼티만을 추출하고자 할 때 사용됩니다.
interface AuthProviderProps extends PropsWithChildren {}

const AuthProvider = ({ children }: AuthProviderProps) => {
    useLoggedInStateHandle();
    useApiResponseHandle();



    /*
    useLayoutEffect(() => {
      if (localStorage.getItem('ACCESS_TOKEN')) {
        setLoggedIn(true);
      }
    }, [setLoggedIn]); // Recoil의 useSetRecoilState 훅으로부터 반환되는 setter 함수(setLoggedIn 같은)는 컴포넌트의 라이프사이클 동안 변하지 않습니다. (만약, 토큰이 제거 된다면 이에 대한 갱신은?)
  */
    return <>{children}</>;
  };
  
  export default AuthProvider;