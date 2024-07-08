import type { CustomRouteObject } from '../CustomRouteObject';
import { PATH } from '@constants/path';
import { Suspense } from 'react';
import { lazy } from 'react';



const CommunityPage = lazy(
    () => import(/* webpackChunkName: "CommunityPage" */ '@pages/CommunityPage/CommunityPage')
  );

const CommunityRoute: CustomRouteObject = {
    path : PATH.COMMUNITY,
    element: (
        <Suspense fallback={<div />}>
            <CommunityPage />
        </Suspense>
    ),
    headerVisible: true,
    footerVisible: true,
};


export default CommunityRoute;