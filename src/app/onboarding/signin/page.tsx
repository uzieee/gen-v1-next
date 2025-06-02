'use client';
import CustomButton from '@/components/atoms/CustomButton';
import IconButton from '@/components/atoms/IconButton';
import PhoneTextField from '@/components/organisms/PhoneTextField';
import { ISignInDetails, signInSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

export default function Signin() {
  const router = useRouter();
  const {
    formState: { errors, isValid },
    register,
    handleSubmit
  } = useForm<ISignInDetails>({
    resolver: zodResolver(signInSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'all'
  })

  const onBack = () => {
    router.push('/onboarding/splash');
  };

  const onSubmit: SubmitHandler<ISignInDetails> = (data) => {
    console.log('Form submitted:', data);
    router.push('/onboarding/verify');
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center p-3 justify-between">
        <IconButton icon={<ArrowLeft className='!w-6 !h-6'/>} onClick={onBack} variant='ghost' />
        <div className="text-xl font-bold font-syne text-main">Sign In</div>
        <IconButton icon={<ArrowLeft />} className='invisible'/>
      </div>

      {/* Content */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-14 p-6">
        <div className='flex flex-col gap-5'>
          <div className='flex flex-col gap-1'>
              <div className="text-xl font-syne font-bold text-main-600">Enter your phone number</div>
              <div className="text-sm font-syne font-bold text-secondary">Enter your phone number to login an account</div>
          </div>
          <PhoneTextField
              {...register("phoneNumber")}
              error={errors.phoneNumber?.message}
          />
        </div>
        <CustomButton
          type='submit'
          className='w-full rounded-2xl'
          state={isValid ? 'default' : 'disabled'}
        >
          Continue
        </CustomButton>
      </form>
    </>
  );
}
