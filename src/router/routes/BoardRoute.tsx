import type { CustomRouteObject } from '../CustomRouteObject';
import { PATH } from '@constants/path';
import { Suspense } from 'react';
import { lazy } from 'react';



const BoardPage = lazy(
    () => import(/* webpackChunkName: "BoardPage" */ '@pages/BoardPage/BoardPage')
  );

const BoardRoute: CustomRouteObject = {
    path : PATH.BOARD(':id'),
    element: (
        <Suspense fallback={<div />}>
            <BoardPage />
        </Suspense>
    ),
    headerVisible: true,
    footerVisible: true,
};


export default BoardRoute;