import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { instance, IResponse } from './fetch-wrapper';
import { mockUser } from '@app/mock/user';

// export const mock = new MockAdapter(axios);
// console.log('Client', mock);
export const payloadHelperLatestServer = (code: number, data: any = null, time = 1000) => {
  return new Promise<any>(resolve => {
    setTimeout(() => {
      if (code === 200) {
        const resultRequest: IResponse = { data, ok: true, status: code, statusText: '성공' };

        resolve([code, resultRequest]);
      } else {
        const resultRequest: IResponse = { data, ok: false, status: code, statusText: '실패' };

        resolve([code, resultRequest]);
      }
    }, time);
  });
};

export const mockDataSet = () => {
  // Client.onPost('/users/login', { email: 'soohan0808@gmail.com', password: '1234' }).reply(() =>
  //   payloadHelperLatestServer(200, {
  //     mockUser,
  //     accessToken: 'userToken',
  //   }),
  // );
  // mock.onGet('/login').reply(200, [200, { name: 'sooha' }]);
};
