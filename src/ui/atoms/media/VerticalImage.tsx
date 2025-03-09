import { ImageSrc } from "@/core/utils/constants";
import AppImage, { AppImageProps } from "./AppImage";

export default function VerticalImage({ 
        src, 
        alt, 
        width, 
        height, 
        className, 
        priority = false }: AppImageProps) {
  return (
    <div className="relative">
      {/* Rotated Shape */}
      <div className="absolute top-[-58px] right-[80px] animate-rotate opacity-40">
        <AppImage
          src={ImageSrc.svgPattern}
          alt="pattern"
          width={200}
          height={200}
          className="w-full h-auto"
        />
      </div>
      {/* Image */}
      <div className="relative w-3/6 mx-auto before:absolute before:top-6 before:right-6 before:w-full before:h-full before:bg-secondary before:z-[-1]">
        <AppImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`rounded-lg ${className}`}
          priority={priority}
        />
      </div>
    </div>
  );
}
