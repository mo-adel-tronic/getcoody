interface AppBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
  }
  
  export default function AppBtn({ children, className, type = 'submit', ...rest }: AppBtnProps) {
    return (
      <button
        type={type}
        className={`w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-hover transition-colors ${className}`}
        {...rest}
      >
        {children}
      </button>
    );
  }
  