import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

interface PhotoSlotProps {
    photo: string | null;
    onUpload: () => void;
    onEdit?: () => void;
    size?: 'large' | 'normal' | 'small';
}

export default function PhotoSlot({ photo, onUpload, onEdit, size = 'normal' }: PhotoSlotProps) {
    const sizeClasses = {
    large: 'w-48 h-48',
    normal: 'w-24 h-24',
    small: 'w-20 h-28'
    };

    const handleClick = () => {
        if (photo) {
            if (onEdit) {
                onEdit();
            }
        } else {
            onUpload();
        }
    };

    return (
        <div 
        onClick={handleClick}
        className={cn(
            sizeClasses[size],
            'relative rounded-2xl bg-transparent',
            'cursor-pointer transition-all duration-200 hover:bg-primary-300/5',
            photo ? '' : 'border-2 border-primary-300'
        )}
        >
        {photo ? (
            <>
                <Image
                    src={photo} 
                    alt="Uploaded photo"
                    className="w-full h-full object-cover rounded-2xl aspect-square"
                    width={size === 'large' ? 192 : size === 'normal' ? 96 : 80}
                    height={size === 'large' ? 256 : size === 'normal' ? 128 : 112}
                />
                <div className="absolute -bottom-1 -right-1 p-2 bg-background/80 text-primary rounded-full flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.34441 0.958206C10.1222 0.858742 10.9092 1.17682 11.7088 1.92919L11.7097 1.93005C12.512 2.68878 12.8772 3.45845 12.8224 4.24237C12.7695 4.99987 12.3304 5.64101 11.8296 6.17004M11.8296 6.17004L6.35899 11.9605C6.20477 12.1284 5.99711 12.2707 5.80024 12.3759C5.60085 12.4825 5.3702 12.5738 5.15368 12.6123L5.15035 12.6129L3.00445 12.9794C2.48407 13.0691 1.98507 12.9391 1.6296 12.602C1.27463 12.2653 1.11778 11.7744 1.17589 11.2515L1.17606 11.2499L1.42379 9.08057C1.45256 8.86478 1.53271 8.63126 1.62718 8.42868C1.72131 8.22683 1.84975 8.01279 2.00174 7.851L2.00271 7.84996L7.47605 2.05663C7.97707 1.52738 8.59276 1.05432 9.34441 0.958206M8.2026 2.74374C8.20251 2.74383 8.20268 2.74365 8.2026 2.74374L2.73058 8.53567C2.73047 8.53579 2.7307 8.53555 2.73058 8.53567C2.67594 8.59398 2.60087 8.70681 2.53347 8.85132C2.4673 8.99322 2.42755 9.1245 2.41564 9.20888L2.16977 11.3619C2.16974 11.3621 2.16972 11.3623 2.16969 11.3626C2.14135 11.6192 2.22111 11.7847 2.31772 11.8764C2.41392 11.9676 2.58158 12.0376 2.83454 11.9939L2.83531 11.9938L4.98005 11.6275C5.06356 11.6124 5.19224 11.567 5.32875 11.4941C5.46713 11.4201 5.57124 11.3403 5.62335 11.2831L5.62932 11.2766L11.1027 5.48329C11.5485 5.0124 11.7962 4.58329 11.8249 4.17264C11.8517 3.78833 11.6937 3.29149 11.0232 2.65713C10.3563 2.0298 9.85334 1.90127 9.47125 1.95013C9.06297 2.00234 8.64814 2.27315 8.2026 2.74374Z" fill="currentColor"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.84888 2.87263C7.12173 2.83012 7.37738 3.01685 7.41989 3.2897C7.67131 4.90344 8.98099 6.13852 10.6093 6.30252C10.884 6.33019 11.0843 6.57536 11.0567 6.85011C11.029 7.12486 10.7838 7.32516 10.5091 7.29748C8.43071 7.08815 6.75373 5.50989 6.43181 3.44364C6.3893 3.17079 6.57603 2.91514 6.84888 2.87263Z" fill="currentColor"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.5 14.6667C0.5 14.3905 0.723858 14.1667 1 14.1667H13C13.2761 14.1667 13.5 14.3905 13.5 14.6667C13.5 14.9428 13.2761 15.1667 13 15.1667H1C0.723858 15.1667 0.5 14.9428 0.5 14.6667Z" fill="currentColor"/>
                    </svg>
                </div>
            </>
        ) : (
            <div className="w-full h-full flex items-center justify-center">
                <div className="w-5 h-5 bg-primary-300 rounded-full flex items-center justify-center">
                    <Plus className="w-5 h-5 text-black" />
                </div>
            </div>
        )}
        </div>
    )
}
