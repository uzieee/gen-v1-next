/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";

import HeaderWithSteps from "@/components/molecules/HeaderWithSteps";
import TextField from "@/components/molecules/TextField";
import TextArea from "@/components/molecules/TextArea";
import ComboBox from "@/components/molecules/ComboBox";
import { FormSubmitButton } from "@/components/molecules/FormSubmitButton";
import useApiQuery from "@/app/hooks/use-api-query";
import { fetchAttributes } from "@/app/services/http/attributes";
import { updateUserProfile } from "@/app/actions/users";
import { saveStartupVisionAction } from "@/app/actions/startup";
import { useCurrentUser } from "@/app/hooks/use-current-user";
import { Attribute, Startup } from "@/payload-types";

export const visionSchema = z.object({
  projectTitle: z.string().nullable(),
  stage: z.enum(["established", "building", "scaling", "idea"], {
    errorMap: () => ({ message: "Select a stage" }),
  }),
  projectDescription: z
    .string()
    .max(500, "Max 500 characters")
    .optional()
    .nullable(),
  industries: z.string().min(1, "Select an industry"),
  support: z
    .enum(
      [
        "funding",
        "mentorship",
        "collaborators",
        "tools",
        "early-users",
        "encouragement",
        "other",
      ],
      { errorMap: () => ({ message: "Select a type of support" }) }
    )
    .optional()
    .nullable(),
  supportOther: z.string().optional().nullable(),
});
export type IVision = z.infer<typeof visionSchema>;

/* -------------------------------------------------------------------------- */
/* 2 – fixed select options                                                   */
/* -------------------------------------------------------------------------- */
const stageOptions = [
  { label: "Established", value: "established" },
  { label: "Building", value: "building" },
  { label: "Scaling", value: "scaling" },
  { label: "Still an idea", value: "idea" },
];

const supportOptions = [
  { label: "Funding", value: "funding" },
  { label: "Mentorship", value: "mentorship" },
  { label: "Collaborators", value: "collaborators" },
  { label: "Tools & Resources", value: "tools" },
  { label: "Early users", value: "early-users" },
  { label: "Encouragement", value: "encouragement" },
  { label: "Other", value: "other" },
];

/* -------------------------------------------------------------------------- */
/* 3 – screen component                                                       */
/* -------------------------------------------------------------------------- */
export default function StartupVision() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const isQuickEdit = searchParams.get("quick");

  /* react-hook-form */
  const {
    formState: { isValid, errors },
    control,
    register,
    reset,
    watch,
  } = useForm<IVision>({
    resolver: zodResolver(visionSchema),
    mode: "onChange",
  });

  const { data, isSuccess: isFetchUserSuccess } = useCurrentUser(2);

  useEffect(() => {
    const { startups } = (data?.user || {}) as { startups: Startup[] };
    const [startup] = startups || [];
    if (startup) {
      reset({
        projectTitle: startup.title,
        stage: startup.stage,
        projectDescription: startup.description,
        industries: startup.industries?.[0]
          ? (startup.industries[0] as Attribute).id
          : "",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        support: (startup.supportNeeded || [])[0] as any,
      });
    }
  }, [data?.user]);

  /* fetch industries */
  const { data: attributesByCategory } = useApiQuery({
    payload: { categories: ["professional-fields"] },
    apiHandler: fetchAttributes,
    queryKey: ["attributes", "professional-fields"],
  });

  const industryOptions = useMemo(
    () =>
      (attributesByCategory?.[0]?.attributes || []).map((a) => ({
        label: a.label,
        value: a.id,
      })),
    [attributesByCategory]
  );

  /* submit */
  async function onSubmit() {
    const data = watch();
    const fd = new FormData();
    fd.append("projectStage", data.stage);
    fd.append("industries", data.industries);
    if (data.projectTitle) fd.append("projectTitle", data.projectTitle);
    if (data.projectDescription)
      fd.append("projectDescription", data.projectDescription);
    if (data.support) fd.append("supportNeeded", data.support);
    // if (data.supportOther) fd.append("supportOther", data.supportOther);
    await saveStartupVisionAction(null, fd);

    await updateUserProfile(fd);
    if (isQuickEdit) {
      router.replace("/profile");
    } else router.push("/onboarding/interests-hobbies"); // next screen
  }

  const onSkip = () => {
    if (isQuickEdit) {
      router.replace("/profile");
    } else router.push("/interests-hobbies");
  };

  return (
    <>
      <HeaderWithSteps
        onSkip={onSkip}
        action="Save & Skip"
        activeIndicator={2}
      />

      <form action={onSubmit} className="p-6">
        <div className="flex flex-col w-full pb-12 gap-6">
          <div className="text-2xl font-bold text-main-600 font-ariom">
            Let’s talk vision.
          </div>
          <div className="text-secondary-800 font-ariom mb-6">
            Whether it’s a full-time startup or an idea you’re building, we’d
            love to hear about it.
          </div>

          {/* project title */}
          <div className="flex flex-col gap-3">
            <p className="text-lg font-medium text-main-300">Project title</p>
            <TextField
              {...register("projectTitle")}
              placeholder="e.g. Gen"
              disabled={!isFetchUserSuccess}
              autoFocus
              error={errors.projectTitle?.message}
              className="border border-main-600 rounded-2xl px-4 py-3"
            />
          </div>

          {/* stage */}
          <div className="flex flex-col gap-3">
            <p className="text-lg font-medium text-main-300">
              What stage is it in?
            </p>
            <Controller
              name="stage"
              control={control}
              render={({ field }) => (
                <ComboBox
                  options={stageOptions} // [{label,value}]
                  value={field.value}
                  disabled={!isFetchUserSuccess}
                  onChange={field.onChange}
                  placeholder="Select stage"
                  error={errors.stage?.message}
                />
              )}
            />
          </div>

          {/* description */}
          <div className="flex flex-col gap-3">
            <p className="text-lg font-medium text-main-300">
              Tell us a bit more&nbsp;
              <span className="text-secondary-800">(optional)</span>
            </p>
            <TextArea
              {...register("projectDescription")}
              placeholder="Elevator pitch, mission, current challenges…"
              disabled={!isFetchUserSuccess}
              rows={5}
              error={errors.projectDescription?.message}
              className="border border-main-600 rounded-2xl px-4"
            />
          </div>

          {/* Industries combobox */}
          <div className="flex flex-col gap-3">
            <p className="text-lg font-medium text-main-300">Industries</p>
            <Controller
              name="industries"
              control={control}
              render={({ field }) => (
                <ComboBox
                  options={industryOptions}
                  value={field.value}
                  disabled={!isFetchUserSuccess}
                  onChange={field.onChange}
                  placeholder="Select an industry"
                  error={errors.industries?.message}
                />
              )}
            />
          </div>

          {/* support */}
          <div className="flex flex-col gap-3">
            <p className="text-lg font-medium text-main-300">
              What kind of support would be most helpful at this stage?{" "}
              <span className="text-secondary-800">(optional)</span>
            </p>
            <Controller
              name="support"
              control={control}
              render={({ field }) => (
                <ComboBox
                  options={supportOptions}
                  disabled={!isFetchUserSuccess}
                  value={field.value as string}
                  onChange={field.onChange}
                  placeholder="Select support type"
                  error={errors.support?.message}
                />
              )}
            />

            {/* only show write-in when "Other" selected */}
            {watch("support") === "other" && (
              <TextField
                {...register("supportOther")}
                disabled={!isFetchUserSuccess}
                placeholder="Describe the support you need"
                className="border border-main-600 rounded-2xl px-4 py-3"
              />
            )}
          </div>
        </div>
        <FormSubmitButton
          className="w-full rounded-2xl mb-6"
          state={isValid && isFetchUserSuccess ? "default" : "disabled"}
        />
      </form>
    </>
  );
}
