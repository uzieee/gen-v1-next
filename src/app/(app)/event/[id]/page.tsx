'use client';
import React from 'react';
import Header from '@/components/molecules/Header';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Clock, MapPin } from 'lucide-react';
import IconButton from '@/components/atoms/IconButton';
import CustomButton from '@/components/atoms/CustomButton';

export default function EventDetailsPage() {
    const router = useRouter();
    const [isExpanded, setIsExpanded] = React.useState(false);
    
    const fullText = "This exciting and inspiring event is organized to create a space for founders, researchers, and creative enthusiasts to meet, exchange and find new ideas. we are looking for cooperation opportunities.";
    
    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim();
    };
    const truncatedText = truncateText(fullText, 135);
    const shouldShowMore = fullText.length > 135;

    const onBack = () => {
        router.back();
    };
    const onAddUser = () => {
        // Logic to add a user or navigate to user addition page
        console.log("Add User Clicked");
    };

    return (
        <>
            <div className='pr-3 pb-8'>
                <Header onBack={onBack} rightIcon={
                    <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg" className='text-main-300 !w-6 !h-6'>
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.75 18.5C9.75 18.0858 10.0858 17.75 10.5 17.75H14.5C14.9142 17.75 15.25 18.0858 15.25 18.5C15.25 18.9142 14.9142 19.25 14.5 19.25H10.5C10.0858 19.25 9.75 18.9142 9.75 18.5Z" fill="currentColor"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M12.5 15.75C12.9142 15.75 13.25 16.0858 13.25 16.5V20.5C13.25 20.9142 12.9142 21.25 12.5 21.25C12.0858 21.25 11.75 20.9142 11.75 20.5V16.5C11.75 16.0858 12.0858 15.75 12.5 15.75Z" fill="currentColor"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.98863 1.75C5.95225 1.75 4.30033 3.40413 4.30863 5.43694L4.30864 5.44C4.30863 7.42302 5.85771 9.03198 7.81352 9.11885C7.9321 9.1106 8.05737 9.1102 8.17556 9.11876C10.122 9.03083 11.6786 7.42113 11.6786 5.44C11.6786 3.40421 10.0244 1.75 7.98863 1.75ZM2.80863 5.44153C2.79776 2.57504 5.12552 0.25 7.98863 0.25C10.8528 0.25 13.1786 2.57579 13.1786 5.44C13.1786 8.24456 10.9579 10.5259 8.18393 10.6196C8.15059 10.6207 8.1172 10.6196 8.084 10.6163C8.03578 10.6115 7.96372 10.6108 7.89653 10.6169C7.86559 10.6197 7.83449 10.6206 7.80344 10.6196C5.01873 10.526 2.80944 8.2442 2.80863 5.44153Z" fill="currentColor"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.98406 12.9301C6.28315 12.9301 4.62192 13.3632 3.39613 14.1834L3.39449 14.1845L3.39449 14.1845C2.34107 14.8853 1.91406 15.7356 1.91406 16.4913C1.91406 17.2474 2.34146 18.1005 3.3957 18.8064C4.62727 19.6273 6.28397 20.0601 7.98906 20.0601C8.40328 20.0601 8.73906 20.3958 8.73906 20.8101C8.73906 21.2243 8.40328 21.5601 7.98906 21.5601C6.05444 21.5601 4.0914 21.073 2.56304 20.0541L2.56185 20.0533C1.1965 19.1393 0.414062 17.8626 0.414062 16.4913C0.414062 15.1198 1.19674 13.8453 2.56281 12.9362C4.08691 11.9167 6.05533 11.4301 7.98406 11.4301C9.91315 11.4301 11.8819 11.9169 13.4061 12.9367C13.7504 13.1671 13.8427 13.6329 13.6124 13.9771C13.3821 14.3214 12.9163 14.4137 12.572 14.1834C11.3462 13.3632 9.68498 12.9301 7.98406 12.9301Z" fill="currentColor"/>
                    </svg>
                } onRight={onAddUser} title={'Event Detail'} />
            </div>
            <div className='px-6 flex flex-col gap-6'>
                <div>
                    <div className="relative h-80 rounded-4xl overflow-hidden">
                        <Image 
                            src="/images/event.jpg"
                            alt="Event crowd"
                            className="w-full h-full object-cover object-center opacity-80"
                            width={320}
                            height={320}
                        />
                        <div className="absolute top-6 right-6 bg-main/20 border border-background backdrop-blur-sm rounded-3xl px-4 py-2 text-main-600 font-ariom font-bold">
                            <span className="text-sm font-bold">23</span>
                            <span className="text-xs ml-1">Jun</span>
                        </div>
                        <div className="absolute bottom-8 left-6 right-6 text-main-600 text-2xl font-medium font-ariom w-44">
                            Glowing Art Performance
                        </div>
                    </div>
                    <div className="flex relative w-14 justify-center items-center mt-2 mx-auto">
                        <div className="absolute w-6 h-1.5 bg-primary rounded-full left-0"></div>
                        <div className="w-14 h-1.5 bg-main-600 rounded-full"></div>
                    </div>
                </div>
                <div className="flex items-center gap-3 justify-between">
                    <div className='flex flex-col gap-2'>
                        <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3 text-main-700" />
                            <span className="text-main-600 font-medium text-sm font-ariom">22:00 PM</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-3 h-3 text-main-700" />
                            <span className="text-main-600 font-medium text-sm font-ariom">110 Queen St West</span>
                        </div>
                    </div>
                    <IconButton
                    icon={
                        <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg" className='text-background'>
                            <path d="M9.99937 21.75C9.93937 21.75 9.87938 21.74 9.82938 21.73C9.76938 21.72 9.70938 21.69 9.64938 21.66L7.43938 20.56C7.06938 20.37 6.91937 19.92 7.09937 19.55C7.28937 19.18 7.73938 19.03 8.10938 19.21L9.24937 19.78V18.22C9.24937 17.81 9.58937 17.47 9.99937 17.47C10.4094 17.47 10.7494 17.81 10.7494 18.22V19.78L11.8894 19.21C12.2594 19.03 12.7094 19.18 12.8994 19.55C13.0894 19.92 12.9394 20.37 12.5594 20.56L10.3494 21.66C10.2894 21.69 10.2294 21.71 10.1694 21.73C10.1094 21.74 10.0594 21.75 9.99937 21.75ZM16.6694 18.42C16.3994 18.42 16.1294 18.27 15.9994 18.01C15.8094 17.64 15.9594 17.19 16.3394 17L18.1494 16.1V13.79C18.1494 13.38 18.4894 13.04 18.8994 13.04C19.3094 13.04 19.6494 13.38 19.6494 13.79V16.57C19.6494 16.85 19.4894 17.11 19.2394 17.24L17.0194 18.35C16.8894 18.39 16.7794 18.42 16.6694 18.42ZM3.32938 18.42C3.21938 18.42 3.09937 18.39 2.99937 18.34L0.779373 17.23C0.529373 17.1 0.369377 16.84 0.369377 16.56V13.78C0.369377 13.37 0.709377 13.03 1.11938 13.03C1.52938 13.03 1.86938 13.37 1.86938 13.78V16.09L3.67937 16.99C4.04937 17.18 4.19937 17.63 4.01937 18C3.86937 18.26 3.60938 18.42 3.32938 18.42ZM9.99937 13.42C9.58937 13.42 9.24937 13.08 9.24937 12.67V10.36L7.43938 9.46005C7.06938 9.27005 6.91937 8.82004 7.09937 8.45004C7.28937 8.08004 7.73938 7.93004 8.10938 8.11004L9.99937 9.05005L11.8894 8.11004C12.2594 7.93004 12.7094 8.07004 12.8994 8.45004C13.0894 8.83004 12.9394 9.27005 12.5594 9.46005L10.7494 10.36V12.67C10.7494 13.08 10.4094 13.42 9.99937 13.42ZM18.8894 8.97004C18.4794 8.97004 18.1394 8.63004 18.1394 8.22004V6.66005L16.9994 7.23004C16.6294 7.42004 16.1794 7.27004 15.9894 6.89004C15.7994 6.52004 15.9494 6.07005 16.3294 5.88005L17.2094 5.44004L16.3294 5.00004C15.9594 4.81004 15.8094 4.36005 15.9894 3.99005C16.1794 3.62005 16.6294 3.47004 16.9994 3.65004L19.2094 4.75004C19.2294 4.76004 19.2594 4.77003 19.2794 4.79003C19.3394 4.82003 19.3894 4.87004 19.4394 4.92004C19.4694 4.96004 19.4994 5.00003 19.5294 5.04003C19.5694 5.11003 19.5994 5.18004 19.6194 5.26004C19.6294 5.32004 19.6394 5.38003 19.6394 5.43003V5.44004V8.20004C19.6394 8.64004 19.2994 8.97004 18.8894 8.97004ZM1.10938 8.97004C0.699375 8.97004 0.359375 8.63004 0.359375 8.22004V5.46005V5.45004C0.359375 5.39004 0.369372 5.33004 0.379372 5.28004C0.399372 5.20004 0.429376 5.13004 0.469376 5.06004C0.499376 5.01004 0.529374 4.97003 0.569374 4.93003C0.609374 4.89003 0.659373 4.85005 0.709373 4.82005C0.729373 4.81005 0.759373 4.79004 0.779373 4.78004L2.98937 3.68003C3.35937 3.50003 3.80937 3.64005 3.99937 4.02005C4.18937 4.40005 4.03938 4.84004 3.65938 5.03004L2.77937 5.47004L3.65938 5.91005C4.02938 6.10005 4.17937 6.55004 3.99937 6.92004C3.80937 7.29004 3.36937 7.44004 2.98937 7.26004L1.84937 6.69004V8.25004C1.85937 8.64004 1.52937 8.97004 1.10938 8.97004ZM12.2194 2.86004C12.1094 2.86004 11.9894 2.83004 11.8894 2.78004L9.99937 1.84004L8.10938 2.78004C7.73938 2.97004 7.28937 2.82004 7.09937 2.44004C6.90937 2.07004 7.05938 1.62003 7.43938 1.43003L9.65938 0.320049C9.86938 0.210049 10.1194 0.210049 10.3294 0.320049L12.5494 1.43003C12.9194 1.62003 13.0694 2.07004 12.8894 2.44004C12.7594 2.71004 12.4994 2.86004 12.2194 2.86004Z" fill="currentColor"/>
                        </svg>
                    }
                    className='bg-primary hover:bg-primary-200'
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <div className="text-main-600 text-3xl font-medium font-ariom">About</div>
                    <div className="text-secondary text-sm font-normal font-hellix">
                    <p>
                        {isExpanded ? fullText : truncatedText}
                        {!isExpanded && shouldShowMore && "..."}
                        {shouldShowMore && (
                            <span 
                            className="text-main-600 text-sm font-ariom cursor-pointer ml-1 hover:text-main-400 transition-colors"
                            onClick={() => setIsExpanded(!isExpanded)}
                            >
                            {isExpanded ? "" : " More"}
                            </span>
                        )}
                    </p>
                </div>
            </div>
            <div className="pt-5 pb-8 flex flex-col gap-2">
                <div className="text-main text-3xl font-bold font-ariom">Location</div>
                <div className="bg-black/20 flex items-center justify-center h-36 rounded-4xl w-full">
                    <div className='bg-secondary flex items-center gap-3 py-1.5 px-2 rounded-lg'>
                        <div className="w-7 h-7 bg-secondary-800 rounded-full"></div>
                        <div className='text-background font-ariom font-medium'>
                            <h4 className="text-sm">My Dinh Stadium</h4>
                            <p className="text-[10px]">Ha Noi City</p>
                        </div>
                    </div>
                <div>
            </div>
            </div>
                </div>
            </div>
            <CustomButton className='rounded-b-none rounded-t-2xl'>
                <div className='font-medium'>RSVP</div>
            </CustomButton>
        </>
    );
}
