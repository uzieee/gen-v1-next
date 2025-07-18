import React from 'react'
import CustomButton from './CustomButton';

interface ModalProps {
    onClose: () => void;
    title: string;
    message: string;
    onCancel?: () => void;
    onAction?: () => void;
    cancel?: string;
    action?: string;
    isOpen?: boolean;
}

export default function Modal({ onClose, title, message, onCancel, onAction, cancel = "Cancel", action = "Continue", isOpen = false }: ModalProps) {
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };
    
    const handleCancel = () => {
      onCancel?.();
      onClose();
    };
    
    const handleAction = () => {
      onAction?.();
      onClose();
    };
    if (!isOpen) return null;
    return (
        <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={handleOverlayClick}
        >
            <div className="bg-background border border-main-600 rounded-2xl p-4 w-full max-w-sm mx-4 shadow-2xl">
                <div className="flex flex-col justify-center items-center text-center mb-8 gap-4">
                    <div className="text-main-600 font-ariom text-xl font-bold">{title}</div>
                    <div className="text-secondary text-sm font-ariom">{message}</div>
                </div>
                
                <div className="flex items-center gap-5">
                    <CustomButton
                        variant="outline-main"
                        className='px-6 py-3 rounded-2xl hover:bg-transparent hover:border-main-600 hover:text-main-600'
                        textClassName='text-base font-medium'
                        onClick={handleCancel}
                    >
                        {cancel}
                    </CustomButton>
                    <CustomButton
                        onClick={handleAction}
                        className='px-6 py-3 rounded-2xl'
                        textClassName='text-base font-medium'
                    >
                        {action}
                    </CustomButton>
                </div>
            </div>
        </div>
    );
}
