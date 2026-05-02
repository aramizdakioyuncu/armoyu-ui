import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', isLoading, children, ...props }, ref) => {
    
    // Core aesthetic premium styling (Glassmorphism & Modern UI)
    const baseStyles = "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-armoyu-primary disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 cursor-pointer";
    
    const variants = {
      primary: "bg-armoyu-primary text-white hover:bg-armoyu-primary hover:shadow-[0_0_15px_rgba(var(--armoyu-primary-rgb), 0.5)] border border-transparent",
      secondary: "bg-white/5 text-white hover:bg-white/10 backdrop-blur-md border border-white/10 hover:border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)]",
      danger: "bg-red-500/80 text-white hover:bg-red-600 border border-red-500/50 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]",
      ghost: "hover:bg-white/10 hover:text-white text-gray-300"
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
            <span className="mr-2 relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-white/50 border-2 border-white border-t-transparent animate-spin"></span>
            </span>
        ) : null}
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
