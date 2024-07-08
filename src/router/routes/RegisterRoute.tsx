import type { CustomRouteObject } from '../CustomRouteObject';
import { PATH } from '@constants/path';
import { Suspense } from 'react';
import { lazy } from 'react';



const RegisterPage = lazy(
    () => import(/* webpackChunkName: "RegisterPage" */ '@pages/RegisterPage/RegisterPage')
  );

const RegisterRoute: CustomRouteObject = {
    path : PATH.REGISTER,
    element: (
        <Suspense fallback={<div />}>
            <RegisterPage />
        </Suspense>
    ),
    headerVisible: false,
    footerVisible: false,
};


export default RegisterRoute;