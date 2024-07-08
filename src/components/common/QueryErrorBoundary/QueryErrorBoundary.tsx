import { useQueryErrorResetBoundary } from "@tanstack/react-query"; // (*)
import { ErrorBoundary } from "react-error-boundary"; // (*)

interface Props {
  children: React.ReactNode;
}

const QueryErrorBoundary = ({ children }: Props) => {
  const { reset } = useQueryErrorResetBoundary(); // (*)

  return (
    <ErrorBoundary
      onReset={reset}
      //onError={(error)=>console.log("queryerror", error)}
    
      fallbackRender={({error, resetErrorBoundary }) => {
        console.log("queryerror", error);
        return (
        <div>
          Error!! 
          <button onClick={() => resetErrorBoundary()}>Try again</button>
        </div>
      )}}
    >
      {children}
    </ErrorBoundary>
  );
};

export default QueryErrorBoundary;