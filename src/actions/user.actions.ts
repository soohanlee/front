import { useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil';

import { history, useFetchWrapper } from '@app/helpers';
import { authAtom, usersAtom, userAtom } from '@app/state';

export { useUserActions };

export interface ILoginForm {
  username: string;
  password: string;
}

const useUserActions = () => {
  const url = `/users`;
  const fetchWrapper = useFetchWrapper();
  const [auth, setAuth] = useRecoilState(authAtom);
  const setUsers = useSetRecoilState(usersAtom);
  const setUser = useSetRecoilState(userAtom);

  const login = async ({ username, password }: ILoginForm) => {
    const user = await fetchWrapper.post(`${url}/login`, { username, password });
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('user', JSON.stringify(user));
    setAuth(user);
    // get return url from location state or default to home page
    const path = history.location.pathname;
    history.push(path);
  };

  function logout() {
    // remove user from local storage, set auth state to null and redirect to login page
    localStorage.removeItem('user');
    setAuth(null);
    history.push('/account/login');
  }

  function register(user: any) {
    return fetchWrapper.post(`${url}/register`, user);
  }

  function getAll() {
    return fetchWrapper.get(url).then(setUsers);
  }

  function getById(id: string) {
    return fetchWrapper.get(`${url}/${id}`).then(setUser);
  }

  function update(id: string, params: any) {
    return fetchWrapper.put(`${url}/${id}`, params).then(x => {
      // update stored user if the logged in user updated their own record
      if (id === auth?.id) {
        // update local storage
        const user = { ...auth, ...params };
        localStorage.setItem('user', JSON.stringify(user));

        // update auth user in recoil state
        setAuth(user);
      }
      return x;
    });
  }

  // prefixed with underscored because delete is a reserved word in javascript
  function _delete(id: string) {
    setUsers((users: any) =>
      users.map((x: any) => {
        // add isDeleting prop to user being deleted
        if (x.id === id) return { ...x, isDeleting: true };

        return x;
      }),
    );

    return fetchWrapper.delete(`${url}/${id}`).then(() => {
      // remove user from list after deleting
      setUsers((users: any) => users.filter((x: any) => x.id !== id));

      // auto logout if the logged in user deleted their own record
      if (id === auth?.id) {
        logout();
      }
    });
  }

  return {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete,
    resetUsers: useResetRecoilState(usersAtom),
    resetUser: useResetRecoilState(userAtom),
  };
};
