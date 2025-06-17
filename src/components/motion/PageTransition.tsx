"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { motion, Variants } from "framer-motion";

const variants: Variants = {
  initial: { x: "100%", opacity: 0, visibility: "hidden" }, // ② hide
  animate: {
    x: 0,
    opacity: 1,
    visibility: "visible",
  },
  exit: { x: "-30%", opacity: 0 },
};

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // include querystring so key ALWAYS changes on navigation
  const fullKey = pathname + "?" + searchParams.toString();

  return (
    <div className="bg-background w-full min-h-screen sm:max-h-[940px] sm:min-h-[calc(100vh-100px)] relative overflow-hidden">
      <motion.div
        key={fullKey}
        variants={variants}
        custom={{ entering: true }}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ type: "tween", ease: "easeInOut", duration: 0.35 }}
        /* absolute stacking prevents the quick flash */
        className="absolute inset-0 will-change-transform flex flex-col"
      >
        {children}
      </motion.div>
    </div>
  );
}
