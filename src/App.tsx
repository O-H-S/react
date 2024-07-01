import { Outlet } from 'react-router-dom';
import ErrorFallback from './components/common/ErrorFallback/ErrorFallback';
import { ErrorBoundary } from "react-error-boundary";
import AuthProvider from '@components/common/AuthProvider/AuthProvider';

import Footer from '@components/layout/Footer/Footer';
import Header from '@components/layout/Header/Header';

import { useState, useLayoutEffect, Suspense } from 'react';
import { CurrentRoute } from './router/AppRouter';

import { useLocation } from 'react-router-dom';

const App = () => {

  const location = useLocation();
  const [headerVisible, setHeaderVisible] = useState(true);
  const [footerVisible, setFooterVisible] = useState(true);

  let headerVisiblity = CurrentRoute?.headerVisible ?? true;
  useLayoutEffect(() => {
    setHeaderVisible(headerVisiblity);
  }, [headerVisiblity]); 

  let footerVisiblity = CurrentRoute?.footerVisible ?? true;
  useLayoutEffect(() => {
    setFooterVisible(footerVisiblity);
  }, [footerVisiblity]); 
  

  return (
    <>
    <ErrorBoundary FallbackComponent={ErrorFallback} >
        <AuthProvider>
          {headerVisible  && <Header />}
          <main>
            <Outlet />
          </main>
          {footerVisible  && <Footer />}
        </AuthProvider>
    </ErrorBoundary>
    </>
  );
}

export default App;
