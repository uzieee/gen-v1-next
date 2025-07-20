"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import useApiQuery from "@/app/hooks/use-api-query";
import Header from "@/components/molecules/Header";
import { fetchSessionTable } from "@/app/services/http/sessions";
import { useMemo } from "react";
import Image from "next/image";
import AvatarPlaceholder from "@/components/molecules/AvatarPlaceholder";
import CustomButton from "@/components/atoms/CustomButton";

export default function RoundTableWelcome() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();

  const onBack = () => {
    router.back();
  };

  const { data: sessionData, isSuccess: isSessionDataFetchSuccess } =
    useApiQuery({
      apiHandler: fetchSessionTable,
      payload: {
        sessionId: params.id as string,
        tableNumber: Number(searchParams.get("table") || 0),
      },
      queryKey: ["round-table", params.id],
      enabled: !!searchParams.get("table"),
    });

  const { users } = useMemo(() => {
    if (!sessionData) {
      return {
        users: [] as { name: string; avatar?: string }[],
        iceBreakers: [] as { question: string; userIndex: number }[],
      };
    }

    // 1. Build the users array
    const users = sessionData.attendees.map((att) => ({
      name: att.user.fullName || "",
      avatar: att.user.profileImage, // adjust to your actual avatar field
    }));

    return { users };
  }, [sessionData]);

  if (!isSessionDataFetchSuccess) {
    return (
      <div className="text-white w-full flex items-center justify-center h-full">
        Loading
      </div>
    );
  }

  return (
    <>
      <div className="pb-14">
        <Header
          onBack={onBack}
          rightIcon={home_icon_svg}
          onRight={() => router.replace("/home")}
          title={"Round Table"}
        />
        <div className="w-full flex flex-col items-center">
          <p className="text-sm text-zinc-400">
            Table #{sessionData.tableNumber || ""}
          </p>
        </div>
      </div>
      <div className="mb-8 px-6">
        <h2 className="text-3xl font-bold text-white text-center font-ariom mb-4 leading-tight">
          Welcome to your Round Table
        </h2>
        <div className="mb-4">
          <h3
            className="text-xl font-semibold font-chivo mb-2 text-center"
            style={{ color: "#D1E50C" }}
          >
            {sessionData?.session?.topic || ""}
          </h3>
          <p className="text-zinc-400 text-base leading-relaxed max-w-sm font-chivo mx-auto text-center">
            Explore, discuss and connect.
          </p>
        </div>
      </div>
      {/* Participants Memojis */}
      <div className="mb-8 px-6">
        <div className="flex justify-center items-center mb-6">
          {users.map((user, index) => (
            <div
              key={index}
              className="relative -ml-3 first:ml-0 !w-16 !h-16"
              style={{
                zIndex: users.length - index,
              }}
            >
              {/* <div className="w-20 h-20 rounded-full bg-zinc-800 border-4 border-black flex items-center justify-center shadow-lg">
                <span className="text-3xl">{user.memoji}</span>
              </div> */}
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  width={100}
                  height={100}
                  alt="Profile"
                  className="!min-w-16 !min-h-16 !max-w-16 !max-h-16 object-cover  rounded-full"
                />
              ) : (
                <AvatarPlaceholder
                  fullName={user.name}
                  //   noRing
                  ringColor={"#CCCCCC"}
                  className="!w-16 !h-16"
                />
              )}
              {/* Small flag indicator */}
              {/* <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-zinc-700 border-2 border-black flex items-center justify-center">
                <span className="text-xs">{user.flag}</span>
              </div> */}
            </div>
          ))}
        </div>

        {/* Participants Text */}
        <p className="text-zinc-400 text-center text-sm">
          <span className="font-medium text-white">
            {users
              .slice(0, 2)
              .map((u) => u.name)
              .join(", ")}
          </span>
          {users.length > 2 && (
            <>
              <span> and </span>
              <span className="font-medium text-white">
                {users.length - 2} others
              </span>
            </>
          )}
          <span> are ready to connect.</span>
        </p>
      </div>
      <div className="space-y-4 w-full px-6">
        <CustomButton
          onClick={() => router.push(`/round-table/${params.id}`)}
          className="w-full rounded-2xl"
          variant="primary"
          size="lg"
        >
          Start Ice Breakers
        </CustomButton>
        <CustomButton
          onClick={() => router.replace(`/notifications`)}
          className="w-full rounded-2xl"
          size="lg"
          variant="outline-main"
        >
          Go Back
        </CustomButton>
      </div>
      {/* </div> */}
    </>
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
