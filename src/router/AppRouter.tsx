import App from '@/App';

import { Suspense } from 'react';
import { RouterProvider, createBrowserRouter, useLocation } from 'react-router-dom';

import { PATH } from '@constants/path';
import NotFound from '@pages/NotFound/NotFound';

// Route 지정
import MainRoute from './routes/MainRoute';
import LoginRoute from './routes/LoginRoute';
import ProfileRoute from './routes/ProfileRoute';
import RegisterRoute from './routes/RegisterRoute';
import CommunityRoute from './routes/CommunityRoute';
import ProblemRoute from './routes/ProblemRoute';
import PostDetailRoute from './routes/PostDetailRoute';
import PostWriteRoute from './routes/PostWriteRoute';
import BoardRoute from './routes/BoardRoute';

import { CustomRouteObject } from './CustomRouteObject';


const router_children = [MainRoute, LoginRoute, ProfileRoute, RegisterRoute, CommunityRoute, ProblemRoute, PostWriteRoute, PostDetailRoute, BoardRoute];


var CurrentRoute : CustomRouteObject;
export {CurrentRoute};

router_children.forEach(route => {
  const originalLoader = route.loader;
  route.loader = async (a) => {
    // 현재 라우트를 설정합니다.
    CurrentRoute = route;
    // 기존 loader 함수가 있다면 먼저 호출하고 결과를 반환합니다.
    if (originalLoader) {
      return await originalLoader(a);
    }
    return null;
  };
});



// 라우터 설정
const router = createBrowserRouter([
    {
      path: PATH.ROOT,
      element: <App />,
      errorElement: <NotFound />,
      children : router_children
    }]);

    

const AppRouter = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;