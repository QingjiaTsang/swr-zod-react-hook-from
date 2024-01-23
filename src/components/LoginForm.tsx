'use client';
import React, { FC } from 'react';
import Image from 'next/image';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormData, loginFormDataSchema } from '@/zod-schema/loginForm';

import { cn } from '@/lib/utils';

import { toast } from 'react-toastify';
import { useManualRequest } from '@/hooks/useManualRequest';

type TProps = {};
const LoginForm: FC<TProps> = (props) => {
  const { LoginCaller } = useManualRequest();

  const {
    trigger: login,
    data: loginData,
    error: loginError,
    isMutating: loginLoading,
  } = LoginCaller();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormDataSchema),
  });

  const processForm: SubmitHandler<LoginFormData> = async (data) => {
    const result = await login(data);

    if (!result?.success) {
      toast.error(result?.error);
      return;
    }

    reset();
  };

  return (
    <div className='w-screen h-screen'>
      <div className='w-full flex flex-wrap'>
        {/* Login Section */}
        <div className='w-full md:w-1/2 flex flex-col'>
          <div className='flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24'>
            <a href='/' className='bg-black text-white font-bold text-xl p-4'>
              <Image src='/images/logo.png' alt='logo' width={88} height={40} />
            </a>
          </div>

          <div className='flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32'>
            <p className='text-center text-3xl'>Welcome to CMS of Musicdog</p>
            <form onSubmit={handleSubmit(processForm)} className='flex flex-col pt-3 md:pt-8'>
              <div className='flex flex-col pt-4'>
                <label htmlFor='account' className='text-lg'>
                  Username
                </label>
                <input
                  placeholder='Username'
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline'
                  {...register('account')}
                />
                {errors.account?.message && (
                  <p className='text-sm text-red-400'>{errors.account.message}</p>
                )}
              </div>

              <div className='flex flex-col pt-4'>
                <label htmlFor='password' className='text-lg'>
                  Password
                </label>
                <input
                  type='password'
                  placeholder='Password'
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline'
                  {...register('password')}
                />
                {errors.password?.message && (
                  <p className='text-sm text-red-400'>{errors.password.message}</p>
                )}
              </div>

              <button
                disabled={loginLoading}
                className={cn(
                  'bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8',
                  loginLoading && 'cursor-not-allowed opacity-50'
                )}
              >
                {loginLoading ? 'Logging In' : 'Log In'}
              </button>
            </form>
            <div className='text-center pt-12 pb-12'>
              <p>
                <a href='#' className='ml-1 underline font-semibold'>
                  Change your password
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className='hidden md:block relative w-1/2 h-screen shadow-2xl'>
          <Image src='https://source.unsplash.com/IXUM4cJynP0' alt='Background' fill />
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
