import { ImageSrc } from "@/core/utils/constants";
import AppImage from "./AppImage";

interface LogoProps {
    width?: number
    height?: number
    className?: string
}
export default function Logo({
    width = 150,
    height = 80,
    className = ''
} : LogoProps) {
  return (
    <AppImage
      src={ImageSrc.logoLG}
      alt="logo"
      width={width}
      height={height}
      className={className}
    />
  );
}
