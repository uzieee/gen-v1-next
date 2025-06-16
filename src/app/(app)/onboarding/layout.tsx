export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background w-full min-h-screen sm:max-h-[940px] sm:min-h-[calc(100vh-100px)] relative overflow-hidden">
      {children}
    </div>
  );
}
