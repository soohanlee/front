import { useRecoilState } from 'recoil';

import { history } from '@app/helpers/history';
import { authAtom } from '@app/state/auth';
import { useAlertActions } from '@app/actions/alert.actions';
import axios from 'axios';
import MockAxios from 'axios-mock-adapter';

export interface IResponse {
  ok: boolean;
  status: number;
  statusText: string;
  data?: () => any;
}

export const instance = axios.create();

export const useFetchWrapper = () => {
  const [auth, setAuth] = useRecoilState(authAtom);
  const alertActions = useAlertActions();

  const token = auth?.token;

  instance.defaults.headers.common['Authorization'] = token;
  instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  instance.defaults.timeout = 2500;

  const request = (method: string) => {
    return async (url: string, body?: any) => {
      const response: IResponse = await instance({
        method,
        url: `${import.meta.env.VITE_API_URL}/${url}`,
        data: body,
      });
      return handleResponse(response);
    };
  };

  function handleResponse(response: IResponse) {
    const data = response.statusText && JSON.parse(response.statusText);

    if (!response.ok) {
      if ([401, 403].includes(response.status) && auth?.token) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        localStorage.removeItem('user');
        setAuth(null);
        history.push('/login');
      }

      const error = (data && data.message) || response.statusText;
      alertActions.error(error);
      return Promise.reject(error);
    }

    return data;
  }

  return {
    get: request('get'),
    post: request('post'),
    put: request('put'),
    delete: request('delete'),
  };
};

// const useFetchWrapper = () => {
//   const [auth, setAuth] = useRecoilState(authAtom);
//   const alertActions = useAlertActions();

//   return {
//     get: request('GET'),
//     post: request('POST'),
//     put: request('PUT'),
//     delete: request('DELETE'),
//   };

//   function request(method: string) {
//     return async (url: string, body?: any) => {
//       const requestOptions = {
//         method,
//         headers: authHeader(url),
//         body,
//       };
//       if (body) {
//         requestOptions.headers['Content-Type'] = 'application/json';
//         requestOptions.body = JSON.stringify(body);
//       }
//       const response = await fetch(url, requestOptions);
//       return handleResponse(response);
//     };
//   }

//   // helper functions

//   function authHeader(url: string) {
//     // return auth header with jwt if user is logged in and request is to the api url
//     const token = auth?.token;
//     const isLoggedIn = !!token;
//     const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL || '');
//     if (isLoggedIn && isApiUrl) {
//       return { Authorization: `Bearer ${token}`, 'Content-Type': '' };
//     } else {
//       return { Authorization: ``, 'Content-Type': '' };
//     }
//   }

//   function handleResponse(response: IResponse) {
//     return response.text().then(text => {
//       const data = text && JSON.parse(text);

//       if (!response.ok) {
//         if ([401, 403].includes(response.status) && auth?.token) {
//           // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
//           localStorage.removeItem('user');
//           setAuth(null);
//           history.push('/login');
//         }

//         const error = (data && data.message) || response.statusText;
//         alertActions.error(error);
//         return Promise.reject(error);
//       }

//       return data;
//     });
//   }
// };
