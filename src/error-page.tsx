import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div className="flex-center flex h-screen items-center justify-center text-center" id="error-page">
      <div className="flex flex-col">
        <h1 className="pb-5 text-4xl font-bold">Oops!</h1>
        <p className="pb-1 text-2xl text-gray-500">Sorry, an unexpected error has occurred.</p>
        <p className="text-2xl text-gray-500">
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
