import { atom } from 'recoil';

const alertAtom = atom({
  key: 'alert',
  default: {
    message: '',
    type: '',
  },
});

export { alertAtom };
