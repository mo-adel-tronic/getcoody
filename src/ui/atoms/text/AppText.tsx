import React from "react";
interface AppTextProps {
  text: string;
  size?: string,
  color?: string,
}
export default function AppText({ text, size='md:text-lg', color='text-foreground' }: AppTextProps) {
  return <p className={`${color} font-bold leading-normal text-[16px] ${size}`}>{text}</p>;
}
