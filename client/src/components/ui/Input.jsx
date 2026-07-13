import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      type = "text",
      placeholder,
      leftIcon,
      rightIcon,
      error,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block mb-2 text-sm font-semibold text-slate-700">
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            className={`
              w-full
              rounded-xl
              border
              bg-white
              py-3
              transition-all
              duration-200
              outline-none
              ${
                leftIcon ? "pl-12" : "pl-4"
              }
              ${
                rightIcon ? "pr-12" : "pr-4"
              }
              ${
                error
                  ? "border-red-500 focus:ring-red-300"
                  : "border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              }
            `}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p className="mt-2 text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;