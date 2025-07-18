/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCurrentUser } from "@/app/hooks/use-current-user";
import IconButton from "@/components/atoms/IconButton";
import { FormSubmitButton } from "@/components/molecules/FormSubmitButton";
import Header from "@/components/molecules/Header";
import TextField from "@/components/molecules/TextField";
import { IProfileDetails, profileSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function EditProfile() {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const { data } = useCurrentUser();

  useEffect(() => {
    if (data?.user) {
      const { profileImage } = data.user;
      setProfileImage(profileImage || null);
      setValue("phoneNumber", data.user.phoneNumber.replace(/[^0-9]/g, ""));
      setValue("name", data.user.fullName || "");
    }
  }, [data]);

  const onBack = () => {
    router.back();
  };
  const {
    formState: { isValid, errors },
    register,
    setValue,
    handleSubmit,
  } = useForm<IProfileDetails>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
  });

  const onSubmit: SubmitHandler<IProfileDetails> = (data) => {
    console.log("Selected profile:", data);
    router.back();
  };

  useEffect(() => {
    if (profileImage) {
      setValue("profilePicture", profileImage);
    }
  }, [profileImage]);

  return (
    <>
      <Header onBack={onBack} title={"Edit Profile"} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-14 px-6 mt-8"
      >
        <div className="flex flex-col gap-14">
          <div className="flex justify-center">
            <div className="relative w-28 h-28">
              <div className="w-full h-full rounded-3xl bg-black/20 flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <Image
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    width={104}
                    height={104}
                  />
                ) : (
                  <></>
                )}
              </div>
              <IconButton
                onClick={() =>
                  router.push("/onboarding/take-a-photo?quick=true")
                }
                className="absolute bottom-0 right-0 w-8 h-8 bg-secondary hover:bg-secondary-600 text-main-300 transition-colors"
                icon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.3444 0.958172C11.1222 0.858708 11.9092 1.17678 12.7088 1.92915L12.7097 1.93002C13.512 2.68875 13.8772 3.45841 13.8224 4.24233C13.7695 4.99983 13.3304 5.64097 12.8296 6.17001M12.8296 6.17001L7.35899 11.9605C7.20477 12.1284 6.99711 12.2706 6.80024 12.3759C6.60085 12.4825 6.3702 12.5738 6.15368 12.6122L6.15035 12.6128L4.00445 12.9794C3.48407 13.0691 2.98507 12.939 2.6296 12.6019C2.27463 12.2653 2.11778 11.7744 2.17589 11.2514L2.17606 11.2499L2.42379 9.08054C2.45256 8.86474 2.53271 8.63122 2.62718 8.42864C2.72131 8.22679 2.84975 8.01276 3.00174 7.85096L3.00271 7.84993L8.47605 2.05659C8.97707 1.52734 9.59276 1.05429 10.3444 0.958172M9.2026 2.7437C9.20251 2.74379 9.20268 2.74362 9.2026 2.7437L3.73058 8.53564C3.73047 8.53576 3.7307 8.53552 3.73058 8.53564C3.67594 8.59395 3.60087 8.70678 3.53347 8.85129C3.4673 8.99319 3.42755 9.12446 3.41564 9.20884L3.16977 11.3618C3.16974 11.3621 3.16972 11.3623 3.16969 11.3625C3.14135 11.6192 3.22111 11.7847 3.31772 11.8763C3.41392 11.9676 3.58158 12.0375 3.83454 11.9939L3.83531 11.9938L5.98005 11.6274C6.06356 11.6123 6.19224 11.567 6.32875 11.494C6.46713 11.42 6.57124 11.3402 6.62335 11.2831L6.62932 11.2765L12.1027 5.48326C12.5485 5.01236 12.7962 4.58326 12.8249 4.1726C12.8517 3.78829 12.6937 3.29146 12.0232 2.6571C11.3563 2.02977 10.8533 1.90123 10.4712 1.95009C10.063 2.0023 9.64814 2.27312 9.2026 2.7437Z"
                      fill="currentColor"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.84888 2.87261C8.12173 2.8301 8.37738 3.01683 8.41989 3.28968C8.67131 4.90342 9.98099 6.1385 11.6093 6.3025C11.884 6.33017 12.0843 6.57534 12.0567 6.85009C12.029 7.12484 11.7838 7.32514 11.5091 7.29746C9.43071 7.08813 7.75373 5.50987 7.43181 3.44362C7.3893 3.17077 7.57603 2.91512 7.84888 2.87261Z"
                      fill="currentColor"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.5 14.6666C1.5 14.3905 1.72386 14.1666 2 14.1666H14C14.2761 14.1666 14.5 14.3905 14.5 14.6666C14.5 14.9428 14.2761 15.1666 14 15.1666H2C1.72386 15.1666 1.5 14.9428 1.5 14.6666Z"
                      fill="currentColor"
                    />
                  </svg>
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <div className="text-lg font-ariom font-medium text-main-600">
                Your phone number
              </div>
              <TextField
                {...register("phoneNumber")}
                autoFocus
                icon={<Phone className="w-5 h-5" />}
                error={errors.name?.message}
                className="border border-main-600 rounded-2xl px-4 py-3"
              />
            </div>
            <div className="flex flex-col gap-6">
              <div className="text-lg font-ariom font-medium text-main-600">
                Name
              </div>
              <TextField
                {...register("name")}
                icon={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.0008 2.29166C8.29688 2.29166 6.92578 3.66926 6.92578 5.36666C6.92578 7.01918 8.21668 8.35998 9.84652 8.43237C9.94536 8.4255 10.0498 8.42516 10.1483 8.4323C11.7765 8.35915 13.0682 7.01923 13.0758 5.36539C13.0751 3.66949 11.6968 2.29166 10.0008 2.29166ZM5.67578 5.36666C5.67578 2.98074 7.60469 1.04166 10.0008 1.04166C12.3876 1.04166 14.3258 2.97982 14.3258 5.36666L14.3258 5.36927C14.3161 7.70293 12.4766 9.60495 10.1551 9.68298C10.1274 9.68391 10.0996 9.68299 10.0719 9.68023C10.0317 9.67621 9.97169 9.67567 9.9157 9.68076C9.88991 9.68311 9.864 9.68385 9.83812 9.68298C7.51711 9.60496 5.67578 7.70281 5.67578 5.36666Z"
                      fill="currentColor"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.1447 10.3646C11.7515 10.3646 13.3901 10.7679 14.6564 11.6136C15.7946 12.3712 16.4467 13.4332 16.4467 14.576C16.4467 15.7188 15.7947 16.7827 14.6569 17.5444L14.6568 17.5445C13.3866 18.3943 11.746 18.8 10.1384 18.8C8.53116 18.8 6.89084 18.3945 5.62076 17.5449C4.48234 16.7873 3.83008 15.7253 3.83008 14.5823C3.83008 13.4395 4.48211 12.3756 5.6199 11.614L5.6222 11.6124L5.6222 11.6124C6.89589 10.7679 8.53763 10.3646 10.1447 10.3646ZM6.31411 12.6535C5.43607 13.2417 5.08008 13.9524 5.08008 14.5823C5.08008 15.212 5.43592 15.9206 6.31377 16.5046L6.31514 16.5056C7.33662 17.189 8.72098 17.55 10.1384 17.55C11.5558 17.55 12.9401 17.189 13.9616 16.5056C14.8404 15.9173 15.1967 15.2062 15.1967 14.576C15.1967 13.9463 14.8409 13.2377 13.9631 12.6537L13.9621 12.6531C12.9451 11.9738 11.5628 11.6146 10.1447 11.6146C8.72722 11.6146 7.3403 11.9735 6.31411 12.6535Z"
                      fill="currentColor"
                    />
                  </svg>
                }
                error={errors.name?.message}
                className="border border-main-600 rounded-2xl px-4 py-3"
              />
            </div>
          </div>
        </div>
        <FormSubmitButton
          defaultText="Save Changes"
          state={isValid ? "default" : "disabled"}
        />
      </form>
    </>
  );
}
