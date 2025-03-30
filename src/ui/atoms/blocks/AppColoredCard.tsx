import React from "react";

interface AppColoredCardProps {
    bgClass?: string;
    textColorClass?: string;
    title: string;
    body: string;
}
export default function AppColoredCard({
    bgClass = 'bg-primary',
    textColorClass = 'text-white',
    title,
    body
} : AppColoredCardProps) {
  return (
    <div className="w-4/5 md:w-1/5 bg-background-light">
      <div className={`${bgClass} ${textColorClass} font-bold py-3 px-2 rounded-tl-lg rounded-tr-lg`}>
        <h3>{title}</h3>
      </div>
      <div className="py-3 font-bold text-3xl">{body}</div>
    </div>
  );
}
