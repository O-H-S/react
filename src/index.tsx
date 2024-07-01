import React from 'react';
import ReactDOM from 'react-dom/client';

// react-query 관련
import { QueryClientProvider, QueryClient, QueryCache, MutationCache } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; // process.env.NODE_ENV === 'development' 인 경우에만 실행됨.



/* 클라이언트 상태 관리 */
import { RecoilRoot } from 'recoil';



import CustomThemeProvider from './styles/CustomThemeProvider';



// rounter 관련
import AppRouter from '@router/AppRouter';


// etc
import reportWebVitals from './reportWebVitals';


import { SnackbarProvider } from 'notistack';

const queryCache = new QueryCache({
  onError: (error, query) => {
    //console.error(`Global Query Error - ${query.queryHash}:`, error);
  },
  onSuccess: (data, query) => {
    //console.log(`Global Query Success - ${query.queryHash}:`, data);
  },
});

const mutationCache = new MutationCache({
  onError: (error, variables, context, mutation) => {
    //console.error(`Global Mutation Error - ${mutation.options.mutationKey}:`, error);
  },
  onSuccess: (data, variables, context, mutation) => {
   // console.log(`Global Mutation Success - ${mutation.options.mutationKey}:`, data);
  },
});

const queryClient = new QueryClient({
  queryCache,
  mutationCache,
  defaultOptions: {

    queries: {
      
      // suspense: true 는 v5부터 Deprecated
      // useQuery/useInfiniteQuery와 같은 일반 훅 대신 useSuspenseQuery/useSuspenseInfiniteQuery와 같은 suspense 훅 사용
      throwOnError: true,
      
      //throwOnError: (error, query) => query.state.data === undefined
    
    },
  },
});
const main = async () => {

// Element : 모든 종류의 DOM 요소를 대표하는 가장 기본적인 타입입니다. 
  // SVG 요소, MathML 요소, XML 문서의 요소 등 HTML 외의 다른 타입의 요소를 포함할 수 있습니다
// HTMLElement : HTML 요소를 대표하는 타입으로, Element의 하위 타입. click(), focus(), blur()와 같은 HTML 특유의 메서드와 속성을 추가로 제공합니다. 
  // 예를 들어, <div>, <span>, <body>와 같이 HTML에서 사용되는 요소들이 이에 해당
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  ); 

  root.render(
    
    <React.StrictMode> {/* 안정성 높힘. 두번 실행 */}
      <QueryClientProvider client={queryClient}> 
        <RecoilRoot>
          {/*<Global styles={GlobalStyle} />*/}
          <CustomThemeProvider>
            <SnackbarProvider
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
            >
              <AppRouter />
            </SnackbarProvider>
          </CustomThemeProvider>
        </RecoilRoot>
        <ReactQueryDevtools initialIsOpen={false} /> 
      </QueryClientProvider>
    </React.StrictMode>
  );
};

main();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
