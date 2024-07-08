import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import axios from 'axios';

import {
    buttonStyling,
    containerStyling,
    headingStyling,
    textStyling,
  } from '@/components/common/ErrorFallback/ErrorFallback.style';

  import { ERROR_CODE, HTTP_ERROR_MESSAGE, HTTP_STATUS_CODE } from '@constants/api';

import { FallbackProps } from 'react-error-boundary';

/*
export interface ErrorProps {

  error?: Error;
  resetErrorBoundary?: () => void;

  statusCode?: number;
  errorCode?: number;
  
  
}
*/

// resetErrorBoundary는 react-error-boundary에 의해 자동으로 생성되고 관리되며, 개발자는 이를 FallbackComponent에 전달된 prop으로 받아 사용하기만 하면 됩
const ErrorFallback = ({ error, resetErrorBoundary}: FallbackProps) => {

  console.log("error fallback",error);
// , statusCode = HTTP_STATUS_CODE.NOT_FOUND, errorCode 
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>OK</button>
    </div>
  );
};


export default ErrorFallback;