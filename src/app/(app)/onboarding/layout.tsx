import PageTransition from "@/components/motion/PageTransition";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageTransition>{children}</PageTransition>;
}
