import React from "react";
import clsxm from "../../lib/clsxm";

enum ButtonVariant {
  "default",
  "outline",
}

type ButtonProps = {
  isLoading?: boolean;
  variant?: keyof typeof ButtonVariant;
} & React.ComponentPropsWithoutRef<"button">;

const Button = ({
  children,
  className,
  variant = "default",
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      className={clsxm(
        "font-medium",
        "rounded px-4 py-2 flex-shrink-0",
        "hover:brightness-125",
        "transition duration-100",
        {
          "bg-cust-blue text-white": variant === "default",
        },
        {
          "border-2 border-cust-blue text-cust-blue hover:text-white hover:bg-cust-blue":
            variant === "outline",
        },
        "disabled:transform-none disabled:cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
