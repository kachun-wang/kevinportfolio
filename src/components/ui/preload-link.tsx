"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";

type PreloadLinkProps = ComponentProps<typeof Link>;

export function PreloadLink({ href, children, ...props }: PreloadLinkProps) {
  const router = useRouter();

  const handleMouseEnter = () => {
    if (typeof href === "string") {
      router.prefetch(href);
    }
  };

  return (
    <Link
      href={href}
      onMouseEnter={handleMouseEnter}
      onFocus={handleMouseEnter}
      {...props}
    >
      {children}
    </Link>
  );
}
