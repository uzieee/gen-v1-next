/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Header from "@/components/molecules/Header";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import CompletedSession from "./_components/CompletedSession";
import useApiQuery from "@/app/hooks/use-api-query";
import { fetchSessionTable } from "@/app/services/http/sessions";
import AvatarPlaceholder from "@/components/molecules/AvatarPlaceholder";
import Image from "next/image";

interface PanEvent {
  deltaX: number;
  deltaY: number;
  center: { x: number; y: number };
  velocityX?: number;
  velocityY?: number;
}

export default function RoundTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeStatus, setSwipeStatus] = useState("");
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[] | null>([]);

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

  const { users, iceBreakers } = useMemo(() => {
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

    // 2. Build the iceBreakers array
    const iceBreakers = sessionData.attendees.flatMap((att, idx) =>
      att.questions.map((q) => ({
        question: q.text,
        userIndex: idx,
      }))
    );
    return { users, iceBreakers };
  }, [sessionData]);

  console.log({ iceBreakers, users });

  const onBack = () => {
    router.back();
  };

  const initCards = (): void => {
    const newCards = (cardsRef.current || []).filter(
      (card): card is HTMLDivElement =>
        card !== null && !card.classList.contains("removed")
    );

    newCards.forEach((card, index) => {
      card.style.zIndex = (iceBreakers.length - index).toString();
      card.style.transform = `scale(${(20 - index) / 20}) translateY(-${30 * index}px)`;
      card.style.opacity = ((10 - index) / 10).toString();
    });

    if (cardsContainerRef.current) {
      cardsContainerRef.current.classList.add("loaded");
    }
  };

  const handlePanStart = (e: PanEvent, cardElement: HTMLDivElement): void => {
    cardElement.classList.add("moving");
  };

  const handlePanMove = (e: PanEvent, cardElement: HTMLDivElement): void => {
    if (e.deltaX === 0) return;
    if (e.center.x === 0 && e.center.y === 0) return;

    const container = cardsContainerRef.current;
    if (container) {
      container.classList.toggle("tinder_love", e.deltaX > 0);
      container.classList.toggle("tinder_nope", e.deltaX < 0);
      setSwipeStatus(e.deltaX > 0 ? "love" : "nope");
    }

    const xMulti = e.deltaX * 0.03;
    const yMulti = e.deltaY / 80;
    const rotate = xMulti * yMulti;

    cardElement.style.transform = `translate(${e.deltaX}px, ${e.deltaY}px) rotate(${rotate}deg)`;
  };

  const handlePanEnd = (e: PanEvent, cardElement: HTMLDivElement): void => {
    cardElement.classList.remove("moving");
    const container = cardsContainerRef.current;
    if (container) {
      container.classList.remove("tinder_love", "tinder_nope");
    }
    setSwipeStatus("");

    const moveOutWidth = document.body.clientWidth;
    const keep = Math.abs(e.deltaX) < 80 || Math.abs(e.velocityX || 0) < 0.5;

    if (keep) {
      cardElement.style.transform = "";
    } else {
      cardElement.classList.add("removed");
      const endX = Math.max(
        Math.abs(e.velocityX || 0) * moveOutWidth,
        moveOutWidth
      );
      const toX = e.deltaX > 0 ? endX : -endX;
      const endY = Math.abs(e.velocityY || 0) * moveOutWidth;
      const toY = e.deltaY > 0 ? endY : -endY;
      const xMulti = e.deltaX * 0.03;
      const yMulti = e.deltaY / 80;
      const rotate = xMulti * yMulti;

      cardElement.style.transform = `translate(${toX}px, ${toY + e.deltaY}px) rotate(${rotate}deg)`;

      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        initCards();
      }, 300);
    }
  };

  useEffect(() => {
    if (iceBreakers.length > 0) initCards();
  }, [iceBreakers]);

  useEffect(() => {
    const handleTouch = (cardElement: HTMLDivElement) => {
      let startX = 0;
      let startY = 0;
      let currentX = 0;
      let currentY = 0;
      let isDragging = false;

      const onTouchStart = (event: TouchEvent): void => {
        const touch = event.touches[0];
        if (!touch) return;

        startX = touch.clientX;
        startY = touch.clientY;
        isDragging = true;
        handlePanStart({} as PanEvent, cardElement);
      };

      const onTouchMove = (event: TouchEvent): void => {
        if (!isDragging) return;
        event.preventDefault();

        const touch = event.touches[0];
        if (!touch) return;

        currentX = touch.clientX - startX;
        currentY = touch.clientY - startY;

        handlePanMove(
          {
            deltaX: currentX,
            deltaY: currentY,
            center: { x: touch.clientX, y: touch.clientY },
          },
          cardElement
        );
      };

      const onTouchEnd = (): void => {
        if (!isDragging) return;
        isDragging = false;

        handlePanEnd(
          {
            deltaX: currentX,
            deltaY: currentY,
            center: { x: 0, y: 0 },
            velocityX: Math.abs(currentX) > 100 ? currentX / 100 : 0,
            velocityY: Math.abs(currentY) > 100 ? currentY / 100 : 0,
          },
          cardElement
          // cardIndex
        );
      };

      cardElement.addEventListener("touchstart", onTouchStart, {
        passive: false,
      });
      cardElement.addEventListener("touchmove", onTouchMove, {
        passive: false,
      });
      cardElement.addEventListener("touchend", onTouchEnd, {
        passive: false,
      });

      return () => {
        cardElement.removeEventListener("touchstart", onTouchStart);
        cardElement.removeEventListener("touchmove", onTouchMove);
        cardElement.removeEventListener("touchend", onTouchEnd);
      };
    };

    const cleanupFunctions: (() => void)[] = [];

    (cardsRef.current || []).forEach((card) => {
      if (card) {
        const cleanup = handleTouch(card);
        cleanupFunctions.push(cleanup);
      }
    });

    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());
    };
  }, [currentIndex]);

  const progress = (currentIndex / iceBreakers.length) * 100;
  const remainingCards = iceBreakers.length - currentIndex;
  const isCompleted = currentIndex >= iceBreakers.length;

  const currentQuestion = iceBreakers[currentIndex];
  const activeUserIndex = currentQuestion ? currentQuestion.userIndex : 0;

  if (!isSessionDataFetchSuccess) {
    return <div className="text-white">Loading</div>;
  }

  if (isCompleted)
    return (
      <CompletedSession
        tableNumber={String(sessionData.tableNumber || "")}
        onStartOver={() => {
          setCurrentIndex(0);
          initCards();
        }}
        iceBreakers={iceBreakers}
      />
    );

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
      {/* Cards Container */}
      <div
        ref={cardsContainerRef}
        className={`relative tinder-container ${swipeStatus === "love" ? "tinder_love" : ""} ${swipeStatus === "nope" ? "tinder_nope" : ""}`}
      >
        <div className="flex-1 flex items-center justify-center px-6 py-8">
          <div className="relative w-full max-w-sm" style={{ height: "50vh" }}>
            {iceBreakers.map((iceBreaker, index) => (
              <div
                key={index}
                ref={(el) => {
                  // @ts-ignore
                  cardsRef.current[index] = el;
                }}
                className={`tinder-card absolute inset-0 rounded-3xl p-8 shadow-2xl cursor-grab select-none ${
                  index < currentIndex ? "removed" : ""
                }`}
                style={{
                  zIndex: iceBreakers.length - index,
                  willChange: "transform",
                  transition: "all 0.3s ease-in-out",
                  background:
                    "linear-gradient(145deg, #3a3a3a 0%, #2a2a2a 50%, #1a1a1a 100%)",
                  touchAction: "none",
                }}
              >
                {/* Subtle Border */}
                <div className="absolute inset-0 rounded-3xl border border-zinc-600 opacity-30" />

                <div className="h-full flex items-center justify-center text-center">
                  <div>
                    {/* Show which user the question is for */}
                    <div className="mb-6">
                      <div
                        className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium"
                        style={{ backgroundColor: "#D1E50C", color: "#000000" }}
                      >
                        <span className="mr-2">
                          {users[iceBreaker.userIndex].avatar}
                        </span>
                        <span>
                          Question for{" "}
                          {users[iceBreaker.userIndex].name.split(" ")[0]}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-8 leading-relaxed text-white">
                      {iceBreaker.question}
                    </h3>
                    <p className="text-white text-base opacity-70">
                      Swipe left to skip, right to answer.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Progress Bar */}
        <div className="px-6 pb-4">
          <div className="w-full max-w-xs mx-auto">
            <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-zinc-400 text-center mt-2">
              {remainingCards} cards remaining
            </p>
          </div>
        </div>
      </div>
      <div className="pb-4">
        <div className="flex space-x-4 overflow-x-auto py-2 scrollbar-hide px-6 ">
          {users.map((user, index) => {
            const isActive = !isCompleted && index === activeUserIndex;
            return (
              <div
                key={index}
                className="flex flex-col items-center flex-shrink-0"
              >
                <div
                  className={`relative w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all duration-300 ${
                    isActive
                      ? "ring-4 ring-primary shadow-lg shadow-primary/50"
                      : "ring-2 ring-zinc-700"
                  }`}
                >
                  <div className="w-14 h-14 bg-zinc-800 rounded-full flex items-center justify-center">
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        width={100}
                        height={100}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <AvatarPlaceholder
                        fullName={user.name}
                        noRing
                        className="!border-none !w-16 !h-16"
                      />
                    )}
                  </div>
                  {isActive && (
                    <div className="absolute -inset-1 rounded-full bg-primary opacity-20 animate-pulse" />
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p
                    className={`text-xs font-medium ${isActive ? "text-primary" : "text-white"}`}
                  >
                    {user.name.split(" ")[0]}
                  </p>
                  {/* <p className="text-xs">{user.flag}</p> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
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
