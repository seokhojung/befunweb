import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "./card";

interface AnimatedCardProps extends React.ComponentProps<typeof Card> {
  children: React.ReactNode;
  isActive?: boolean;
  isTransitioning?: boolean;
  onClick?: () => void;
  className?: string;
}

export function AnimatedCard({
  children,
  isActive = false,
  isTransitioning = false,
  onClick,
  className,
  ...props
}: AnimatedCardProps) {
  return (
    <div
      className={cn(
        "relative cursor-pointer h-full overflow-hidden rounded-24 transition-all duration-700 ease-in-out transform",
        isActive 
          ? "ring-4 ring-white/30 shadow-2xl scale-105" 
          : "hover:shadow-xl hover:scale-102",
        isTransitioning && "animate-pulse",
        className
      )}
      onClick={onClick}
    >
      <Card 
        className="border-0 p-0 bg-transparent shadow-none h-full"
        {...props}
      >
        <CardContent className="p-0 h-full">
          {children}
        </CardContent>
      </Card>
    </div>
  );
}
