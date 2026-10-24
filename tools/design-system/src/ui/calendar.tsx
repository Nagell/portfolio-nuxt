import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "../lib/utils"
import { buttonVariants } from "./button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

/** Date picker grid (react-day-picker v9) styled like the site's reka-ui calendar. */
function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "relative flex flex-col gap-y-4 sm:flex-row sm:gap-x-4 sm:gap-y-0",
        month: "flex flex-col gap-y-4",
        month_caption: "relative flex h-7 w-full items-center justify-center pt-1",
        caption_label: "text-sm font-medium",
        nav: "absolute inset-x-0 top-0 z-10 flex w-full items-center justify-between pt-1",
        button_previous: cn(buttonVariants({ variant: "outline" }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"),
        button_next: cn(buttonVariants({ variant: "outline" }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday: "w-9 rounded-md text-[0.8rem] font-normal text-muted-foreground",
        week: "flex mt-2 w-full",
        day: cn(
          "relative h-9 w-9 p-0 text-center text-sm focus-within:relative focus-within:z-20",
          "data-[selected=true]:rounded-md data-[selected=true]:bg-accent [&[data-selected=true][data-outside=true]]:bg-accent/50",
          "[&[data-today=true]:not([data-selected=true])>button]:bg-accent [&[data-today=true]:not([data-selected=true])>button]:text-accent-foreground",
          "[&[data-selected=true]>button]:bg-primary [&[data-selected=true]>button]:text-primary-foreground [&[data-selected=true]>button]:opacity-100 [&[data-selected=true]>button]:hover:bg-primary [&[data-selected=true]>button]:hover:text-primary-foreground [&[data-selected=true]>button]:focus:bg-primary [&[data-selected=true]>button]:focus:text-primary-foreground",
          "[&[data-disabled=true]>button]:text-muted-foreground [&[data-disabled=true]>button]:opacity-50",
          "[&[data-outside=true]>button]:text-muted-foreground [&[data-outside=true]>button]:opacity-50 [&[data-outside=true][data-selected=true]>button]:bg-accent/50 [&[data-outside=true][data-selected=true]>button]:text-muted-foreground [&[data-outside=true][data-selected=true]>button]:opacity-30"
        ),
        day_button: cn(buttonVariants({ variant: "ghost" }), "h-9 w-9 p-0 font-normal"),
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className: c }) =>
          orientation === "left" ? <ChevronLeft className={cn("h-4 w-4", c)} /> : <ChevronRight className={cn("h-4 w-4", c)} />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
