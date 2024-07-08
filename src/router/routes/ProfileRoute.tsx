
import type { CustomRouteObject } from '../CustomRouteObject';
// 현대의 번들러들은 대부분 트리 쉐이킹을 지원하며, 타입 임포트는 런타임에 포함되지 않습니다. import type을 사용하면 번들러가 더 쉽게 런타임 코드와 타입 정의를 구분할 수 있으므로, 최종 번들의 크기를 줄이는 데 도움이 될 수 있습니다. 그러나 대부분의 경우, TypeScript 컴파일러와 번들러가 이미 이를 최적화하기 때문에 실제 영향은 미미할 수 있습니다.
import { PATH } from '@constants/path';
import { Suspense } from 'react';
import { lazy } from 'react';

const ProfilePage = lazy(
    () => import(/* webpackChunkName: "ProfilePage" */ '@pages/ProfilePage/ProfilePage')
  );

const ProfileRoute: CustomRouteObject = {
    path : PATH.PROFILE,
    element: (
        <Suspense fallback={<div />}>
            <ProfilePage />
        </Suspense>
    ),
    headerVisible: true,
    footerVisible: true,
};

export default ProfileRoute;