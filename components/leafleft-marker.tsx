import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PinProps {
  color?: string;
  size?: number;
  className?: string;
  icon?: ReactNode;
  iconColor?: string;
}

export function LeafleftMarker({
  color,
  size = 50,
  className = "",
  icon,
}: PinProps) {
  return (
    <svg
      width={size}
      height={size * 1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={cn("relative", className)}
    >
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="1" floodColor="#000000" floodOpacity="0.4" />
        </filter>
      </defs>
      <path
        fill="white"
        fillRule="evenodd"
        d="M11.291 21.706 12 21l-.709.706zM12 21l.708.706a1 1 0 0 1-1.417 0l-.006-.007-.017-.017-.062-.063a47.708 47.708 0 0 1-1.04-1.106 49.562 49.562 0 0 1-2.456-2.908c-.892-1.15-1.804-2.45-2.497-3.734C4.535 12.612 4 11.248 4 10c0-4.539 3.592-8 8-8 4.408 0 8 3.461 8 8 0 1.248-.535 2.612-1.213 3.87-.693 1.286-1.604 2.585-2.497 3.735a49.583 49.583 0 0 1-3.496 4.014l-.062.063-.017.017-.006.006L12 21zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
        clipRule="evenodd"
        filter="url(#shadow)"
      />
      {icon && (
        <foreignObject x="6" y="4" width="12" height="12">
          <div className={`w-full h-full flex items-center justify-center rounded-full p-0.5`} style={{ backgroundColor: color }}>
            {icon}
          </div>
        </foreignObject>
      )}
    </svg>
  );
}