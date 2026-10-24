import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "../lib/utils"

export interface SeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  /** Optional text centred on the line, e.g. "OR". */
  label?: string
}

const Separator = React.forwardRef<React.ElementRef<typeof SeparatorPrimitive.Root>, SeparatorProps>(
  ({ className, orientation = "horizontal", decorative = true, label, ...props }, ref) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border relative",
        orientation === "vertical" ? "w-px h-full" : "h-px w-full",
        className
      )}
      {...props}
    >
      {label ? (
        <span
          className={cn(
            "text-xs text-muted-foreground bg-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center",
            orientation === "vertical" ? "w-[1px] px-1 py-2" : "h-[1px] py-1 px-2"
          )}
        >
          {label}
        </span>
      ) : null}
    </SeparatorPrimitive.Root>
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
