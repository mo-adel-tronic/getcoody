import Link, { LinkProps } from "next/link";

interface AppLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}
export default function AppLink({
    href,
    children,
    className,
    ...rest
} : AppLinkProps) {
  return (
    <Link
      href={href}
      className={`bg-secondary hover:bg-secondary-hover text-secondary-foreground block py-2 px-3 shadow-lg rounded-lg w-fit ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
