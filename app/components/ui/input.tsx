import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-base text-slate-900 placeholder:text-slate-400 transition-colors outline-none focus-visible:border-teal-600 focus-visible:ring-2 focus-visible:ring-teal-500/20 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-50 aria-invalid:border-red-500 aria-invalid:ring-2 aria-invalid:ring-red-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus-visible:border-teal-400 dark:focus-visible:ring-teal-400/20 dark:disabled:bg-slate-700 dark:aria-invalid:border-red-400 dark:aria-invalid:ring-red-400/20 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Input }