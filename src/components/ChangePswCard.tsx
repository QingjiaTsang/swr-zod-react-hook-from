'use client';
import React, { FC } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangePswFormData, changePswFormDataSchema } from '@/zod-schema/changePswForm';

import { toast } from 'react-toastify';
import { useManualRequest } from '@/hooks/useManualRequest';

type TProps = {};
const ChangePswCard: FC<TProps> = (props) => {
  const { ChangePswCaller } = useManualRequest();
  const { trigger: changePsw, data: changePswData, error: changePswError } = ChangePswCaller();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePswFormData>({
    resolver: zodResolver(changePswFormDataSchema),
  });

  const processForm: SubmitHandler<ChangePswFormData> = async (data) => {
    const result = await changePsw(data);

    if (!result?.success) {
      toast.error(result?.error);
      return;
    }

    toast.success('Password changed');

    reset();
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-[url("https://cruip-tutorials-next.vercel.app/social-card-bg.jpg")]'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(processForm)}>
          <CardContent>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='account'>Username</Label>
                <Input id='account' placeholder='Username' {...register('account')} />
                {errors.account?.message && (
                  <p className='text-sm text-red-400'>{errors.account.message}</p>
                )}
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='oldPassword'>Old Password</Label>
                <Input
                  id='oldPassword'
                  type='password'
                  placeholder='Old Password'
                  {...register('oldPassword')}
                />
                {errors.oldPassword?.message && (
                  <p className='text-sm text-red-400'>{errors.oldPassword.message}</p>
                )}
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='newPassword'>New Password</Label>
                <Input
                  id='newPassword'
                  type='password'
                  placeholder='New Password'
                  {...register('newPassword')}
                />
                {errors.newPassword?.message && (
                  <p className='text-sm text-red-400'>{errors.newPassword.message}</p>
                )}
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='confirmPassword'>Confirm Password</Label>
                <Input
                  id='confirmPassword'
                  type='password'
                  placeholder='Confirm Password'
                  {...register('confirmPassword')}
                />
                {errors.confirmPassword?.message && (
                  <p className='text-sm text-red-400'>{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className='flex justify-between'>
            <Button variant='outline'>Cancel</Button>
            <Button disabled={isSubmitting}>{isSubmitting ? 'Loading...' : 'Confirm'}</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
export default ChangePswCard;
