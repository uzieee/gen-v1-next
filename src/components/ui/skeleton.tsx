'use client'

import clsx from 'clsx'

export default function Skeleton({
  width = 'w-full',
  height = 'h-full',
  rounded = 'rounded-md',
  className,
}: {
  width?: string
  height?: string
  rounded?: string
  className?: string
}) {
  return (
    <div
      className={clsx(
        'relative overflow-hidden bg-zinc-800/70',   // dark placeholder
        width,
        height,
        rounded,
        className,
      )}
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-zinc-700/40 to-transparent" />
    </div>
  )
}
