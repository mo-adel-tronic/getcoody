import Image from "next/image";

export interface AppImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    priority?: boolean;
}

export default function AppImage(
    { 
        src, 
        alt, 
        width, 
        height, 
        className, 
        priority = false }: AppImageProps) {
    return (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={className}
            loading="lazy"
            placeholder="empty"
            priority={priority}
        />
    );
}