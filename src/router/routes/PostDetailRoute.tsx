
import type { CustomRouteObject } from '../CustomRouteObject';
import { PATH } from '@constants/path';
import { Suspense } from 'react';
import { lazy } from 'react';

const PostDetailPage = lazy(
    () => import(/* webpackChunkName: "PostDetailPage" */ '@pages/PostDetailPage/PostDetailPage')
  );

const PostDetailRoute: CustomRouteObject = {
    path : PATH.POST_DETAIL(':id'),
    element: (
        <Suspense fallback={<div />}>
            <PostDetailPage />
        </Suspense>
    ),
    headerVisible: true,
    footerVisible: true,
};

export default PostDetailRoute;