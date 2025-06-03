'use client';
import CustomButton from '@/components/atoms/CustomButton';
import PINInput from '@/components/atoms/PinInput';
import Header from '@/components/molecules/Header';
import { IVerifyDetails, verifySchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

export default function Verify() {
  const router = useRouter();
  const {
    formState: { errors, isValid },
    setValue,
    handleSubmit
  } = useForm<IVerifyDetails>({
    resolver: zodResolver(verifySchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'all'
  })

  const onBack = () => {
    router.push('/onboarding/signin');
  };

  const onSubmit: SubmitHandler<IVerifyDetails> = (data) => {
    console.log('Form submitted:', data);
    router.push('/onboarding/signup');
  }

  return (
    <>
      <Header onBack={onBack} title={''} />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-14 p-6">
        <div className='flex flex-col gap-1'>
            <div className="text-xl font-ariom font-bold text-main-600">Enter your Verification</div>
            <div className="text-sm font-ariom font-bold text-secondary">Enter your password and explore Cabo</div>
        </div>
        <div className='flex flex-col gap-6'>
          <PINInput
              onChange={(value) => {
                setValue('verificationCode', value, {
                  shouldValidate: true,
                  shouldDirty: true
                });
              }}
              error={errors.verificationCode?.message}
          />
          <CustomButton 
            variant='ghost' 
            className='p-0 text-white' 
            textClassName='p-0 text-sm'
            onClick={() => console.log('Resend code clicked')}
          >
            Didn{`'`}t receive code? Send again
          </CustomButton>
          <CustomButton
            type='submit'
            className='w-full rounded-2xl'
            state={isValid ? 'default' : 'disabled'}
          >
            Confirm
          </CustomButton>
        </div>
      </form>
    </>
  );
}
