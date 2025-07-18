/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { z } from "zod";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import HeaderWithSteps from "@/components/molecules/HeaderWithSteps";
import TextField from "@/components/molecules/TextField";
import ComboBox from "@/components/molecules/ComboBox";
import { FormSubmitButton } from "@/components/molecules/FormSubmitButton";
import { Attribute, Profession } from "@/payload-types";
import useApiQuery from "@/app/hooks/use-api-query";
import { fetchAttributes } from "@/app/services/http/attributes";
import { useEffect, useMemo } from "react";
import RadioField from "@/components/atoms/RadioField";
import TextArea from "@/components/molecules/TextArea";
import { saveProfessionAction } from "@/app/actions/profession";
import { useCurrentUser } from "@/app/hooks/use-current-user";

export const professionalSchema = z.object({
  field: z.string().min(1, "Select an option"),
  jobTitle: z.string().min(2, "Too short"),
  jobDescription: z
    .string()
    .max(500, "Max 500 characters")
    .optional()
    .nullable(),
  startup: z.boolean().optional(),
});
export type IProfessional = z.infer<typeof professionalSchema>;

export default function ProfessionalField() {
  const router = useRouter();

  const {
    formState: { isValid, errors },
    control,
    register,
    watch,
    reset,
  } = useForm<IProfessional>({
    resolver: zodResolver(professionalSchema),
    mode: "onChange",
  });

  const { data, isSuccess: isFetchUserSuccess } = useCurrentUser(2);

  useEffect(() => {
    const { profession } = (data?.user || {}) as { profession: Profession };
    if (profession) {
      reset({
        field: (profession.professionalField as Attribute).id,
        jobTitle: profession.jobTitle,
        jobDescription: profession.jobDescription,
        startup: !!data?.user?.startups,
      });
    }
  }, [data?.user]);

  const { data: attributesByCategory } = useApiQuery({
    payload: { categories: ["professional-fields"] },
    apiHandler: fetchAttributes,
    queryKey: ["attributes", "professional-fields"],
  });

  const professionalOptions = useMemo(() => {
    return (attributesByCategory?.[0]?.attributes || []).map((attr) => ({
      label: attr.label,
      value: attr.id,
    }));
  }, [attributesByCategory]);

  const onSkip = () => {
    router.push("/onboarding/interests-hobbies");
  };

  async function onSubmit() {
    const data = watch();
    const fd = new FormData();
    fd.append("professionalField", data.field);
    fd.append("jobTitle", data.jobTitle);
    if (data.jobDescription) fd.append("jobDescription", data.jobDescription);
    await saveProfessionAction(null, fd);
    router.push(
      data.startup
        ? "/onboarding/startup-vision"
        : "/onboarding/interests-hobbies"
    );
  }

  return (
    <>
      <HeaderWithSteps
        onSkip={onSkip}
        action="Save & Skip"
        activeIndicator={1}
      />

      <form action={onSubmit} className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-6">
          <div className="text-2xl font-bold text-main-600 font-ariom">
            What do you do for work (or want to do)?
          </div>
          <div className="text-secondary-800 font-ariom">
            Your career journey helps us spark relevant connections.
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-lg font-medium text-main-300">
              Select your industry
            </p>
            <Controller
              name="field"
              control={control}
              render={({ field }) => (
                <ComboBox
                  options={professionalOptions}
                  disabled={!isFetchUserSuccess}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select your field"
                  error={errors.field?.message}
                />
              )}
            />
          </div>
          {/* job title */}
          <div className="flex flex-col gap-3">
            <p className="text-lg font-medium text-main-300">
              Describe your current role/ title
            </p>
            <TextField
              {...register("jobTitle")}
              placeholder="e.g. Product Designer"
              disabled={!isFetchUserSuccess}
              error={errors.jobTitle?.message}
              className="border border-main-600 rounded-2xl px-4 py-3"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-lg font-medium text-main-300">
            Care to elaborate&nbsp;
            <span className="text-secondary-800">(optional)</span>
          </p>
          <TextArea
            {...register("jobDescription")}
            placeholder="Tell us a bit more about your role, passions, or projects…"
            disabled={!isFetchUserSuccess}
            rows={5}
            error={errors.jobDescription?.message}
            className="border border-main-600 rounded-2xl px-4"
          />
        </div>
        <div className="space-y-5 mb-5">
          <p className="text-lg font-medium text-main-300">
            Are you building on a startup or working on a passion project?
          </p>
          <Controller
            name="startup"
            control={control}
            render={({ field }) => (
              <RadioField
                options={[
                  { value: "true", label: "Yes", id: "true" },
                  { value: "false", label: "No", id: "false" },
                ]}
                error={errors.startup?.message}
                disabled={!isFetchUserSuccess}
                {...field}
                value={
                  field.value && typeof field.value !== "undefined"
                    ? "true"
                    : "false"
                }
                onValueChange={(value) => field.onChange(value === "true")}
              />
            )}
          />
        </div>
        <FormSubmitButton
          className="w-full rounded-2xl mb-6"
          state={isValid && isFetchUserSuccess ? "default" : "disabled"}
        />
      </form>
    </>
  );
}
