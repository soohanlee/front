import _googleButtonImg from '@app/assets/btn_google_signin_light_normal_web@2x.png';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { ILoginForm, useUserActions } from '@app/actions/user.actions';

const validationSchema = Yup.object()
  .shape({
    username: Yup.string().required('email is required'),
    password: Yup.string().required('Password is required'),
  })
  .required();

const formOptions = { resolver: yupResolver(validationSchema) };

export const Login = () => {
  const userActions = useUserActions();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginForm>(formOptions);

  return (
    <div className="flex h-screen flex-col items-center justify-center p-10">
      <form className="grid w-full grid-cols-1 gap-6 md:w-96" onSubmit={handleSubmit(userActions.login)}>
        <label className="block">
          <div className="text-gray-700">Email</div>
          <input
            {...register('username')}
            type="email"
            placeholder="please enter your email address"
            className="mt-1 block w-full rounded-md border-gray-300  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <div className="text-rose-600">{errors.username?.message}</div>
        </label>

        <label className="block">
          <div className="text-gray-700">Password</div>
          <input
            {...register('password')}
            type="password"
            placeholder="please enter your password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <div className="text-rose-600">{errors.password?.message}</div>
        </label>
        <button disabled={isSubmitting} className="bor mt-4  rounded-md bg-blue-500 p-5 text-white hover:bg-blue-400  ">
          Login
        </button>
        <span className="text-blue text mt-4  cursor-pointer text-right hover:text-blue-500">Register</span>
        <div className="Properties  pointer w-full cursor-pointer pl-12 pr-12  duration-150 hover:-translate-y-1">
          <img className="w-full " src={_googleButtonImg} alt="google button img" />
        </div>
      </form>
    </div>
  );
};
