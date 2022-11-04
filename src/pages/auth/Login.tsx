import React from 'react';
import _googleButtonImg from '@app/assets/signin-assets/btn_google_signin_light_normal_web@2x.png';

const Login = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center p-10">
      <div className="grid w-full grid-cols-1 gap-6 md:w-96">
        <label className="block">
          <div className="text-gray-700">Email</div>
          <input
            type="email"
            placeholder="please enter your email address"
            className="
            mt-1
                    block
                    w-full
                
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
          />
        </label>

        <label className="block">
          <div className="text-gray-700">Password</div>
          <input
            type="password"
            placeholder="please enter your password"
            className="
            mt-1
                    block
                    w-full
                
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
          />
        </label>
        <button className="mt-4 bg-blue-500  p-2 text-white hover:bg-blue-400">Login</button>
        <img className="w-full" src={_googleButtonImg} alt="google button img" />
      </div>
    </div>
  );
};

export default Login;
