import { atom } from 'recoil';

const auth = localStorage.getItem('user');
console.log(auth);
const authAtom = atom({
  key: 'auth',
  // get initial state from local storage to enable user to stay logged in
  default: auth ? JSON.parse(auth) : '',
});

export { authAtom };
