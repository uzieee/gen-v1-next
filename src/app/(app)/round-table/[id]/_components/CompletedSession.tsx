"use client";

import CustomButton from "@/components/atoms/CustomButton";
import Header from "@/components/molecules/Header";
import { useRouter } from "next/navigation";

interface Props {
  onStartOver: () => void;
  iceBreakers: {
    question: string;
    userIndex: number;
  }[];
}

export default function CompletedSession({ onStartOver, iceBreakers }: Props) {
  const router = useRouter();

  const onBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen text-white flex flex-col">
      {/* Top Navigation */}
      <div className="pb-14">
        <Header
          onBack={onBack}
          rightIcon={home_icon_svg}
          onRight={() => router.replace("/home")}
          title={"Round Table"}
        />
        <div className="w-full flex flex-col items-center">
          <p className="text-sm text-zinc-400">Table #4</p>
        </div>
      </div>

      {/* Completion View */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 text-center">
        {/* Celebration Icon */}
        <div className="mb-8">
          <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center mb-4">
            <span className="text-6xl">🎉</span>
          </div>
          <div className="flex justify-center space-x-2">
            <span className="text-2xl animate-pulse">✨</span>
            <span
              className="text-2xl animate-pulse"
              style={{ animationDelay: "0.2s" }}
            >
              🎊
            </span>
            <span
              className="text-2xl animate-pulse"
              style={{ animationDelay: "0.4s" }}
            >
              🎈
            </span>
          </div>
        </div>

        {/* Completion Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold font-ariom text-white mb-4">
            That{"'"}s a wrap!
          </h2>
          <p className="text-xl font-syne text-zinc-300 mb-2">
            You{"'"}ve completed all ice breakers
          </p>
          <p className="text-lg font-syne text-zinc-400">
            Time to start some conversations!
          </p>
        </div>

        {/* Stats */}
        <div className="bg-zinc-900 rounded-2xl p-6 mb-8 w-full max-w-sm">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {iceBreakers.length}
            </div>
            <div className="text-sm text-zinc-400 font-syne mb-4">
              Ice breakers completed
            </div>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-full transition-all duration-1000 ease-out" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 w-full max-w-sm">
          <CustomButton
            onClick={onStartOver}
            className="w-full bg-primary text-black py-4 px-6 rounded-2xl font-bold text-base hover:bg-yellow-300 transition-colors duration-200 shadow-lg"
          >
            Start Over
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

const home_icon_svg = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className="!w-[22px] !h-auto"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 14.25C12.4142 14.25 12.75 14.5858 12.75 15V18C12.75 18.4142 12.4142 18.75 12 18.75C11.5858 18.75 11.25 18.4142 11.25 18V15C11.25 14.5858 11.5858 14.25 12 14.25Z"
      fill="white"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.3993 2.24467C14.3996 2.2449 14.3999 2.24513 14.4002 2.24536L21.3307 7.78578C21.8443 8.19936 22.2292 8.80505 22.4648 9.42261C22.7005 10.0404 22.8169 10.7489 22.7105 11.4008L22.71 11.4035L21.38 19.3635L21.3797 19.3658C21.0785 21.135 19.3972 22.5599 17.6003 22.5599H6.4003C4.5941 22.5599 2.92174 21.1456 2.62079 19.3649L1.29134 11.4081C1.29119 11.4073 1.29105 11.4065 1.2909 11.4056C1.17808 10.7518 1.29221 10.0415 1.52832 9.42261C1.76457 8.80335 2.15288 8.19722 2.67239 7.78381C2.6728 7.78348 2.67321 7.78316 2.67362 7.78283L9.60111 2.23483C10.9365 1.16433 13.0564 1.16609 14.3993 2.24467ZM13.4604 3.41453C12.6634 2.7739 11.3239 2.77609 10.5395 3.40506L3.60699 8.95707C3.34711 9.16364 3.09584 9.52203 2.92978 9.95729C2.76369 10.3926 2.71281 10.8263 2.76926 11.1518L2.77006 11.1563L4.09981 19.115C4.09984 19.1151 4.09978 19.1148 4.09981 19.115C4.27913 20.1741 5.32669 21.0599 6.4003 21.0599H17.6003C18.663 21.0599 19.7213 20.1655 19.9007 19.1152C19.9008 19.1148 19.9009 19.1145 19.9009 19.1141L21.2301 11.1591C21.2302 11.1586 21.2302 11.1582 21.2303 11.1577C21.2835 10.8298 21.2299 10.3939 21.0633 9.95729C20.8966 9.52035 20.6469 9.16137 20.3908 8.95483C20.3905 8.95459 20.3902 8.95435 20.3899 8.95412L13.462 3.41576L13.4604 3.41453Z"
      fill="white"
    />
  </svg>
);
