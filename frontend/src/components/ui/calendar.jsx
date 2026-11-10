import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        month_caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "font-serif text-sm font-semibold text-white",
        nav: "flex items-center gap-1",
        button_previous: cn(
          buttonVariants({ variant: "outline" }),
          "absolute left-1 h-7 w-7 bg-transparent border-white/10 p-0 text-white/60 hover:text-white hover:bg-white/10 rounded-none"
        ),
        button_next: cn(
          buttonVariants({ variant: "outline" }),
          "absolute right-1 h-7 w-7 bg-transparent border-white/10 p-0 text-white/60 hover:text-white hover:bg-white/10 rounded-none"
        ),
        month_grid: "w-full border-collapse",
        weekdays: "flex justify-between",
        weekday:
          "text-white/40 font-mono text-[10px] uppercase tracking-wider w-9 font-normal text-center",
        week: "flex w-full mt-2 justify-between",
        day: cn(
          "relative p-0 text-center text-sm font-mono rounded-none"
        ),
        day_button: cn(
          "h-9 w-9 p-0 font-mono text-xs rounded-none transition-colors duration-200 text-white/80 hover:bg-white/10 hover:text-white"
        ),
        range_start: "range_start",
        range_end: "range_end",
        selected:
          "!bg-bronze-500 !text-black !font-bold hover:!bg-bronze-500 focus:!bg-bronze-500 shadow-md",
        today: "underline decoration-bronze-500 underline-offset-4 font-semibold text-white",
        outside:
          "outside text-white/20 opacity-40 aria-selected:bg-bronze-500/50 aria-selected:text-black",
        disabled: "text-white/20 opacity-30 cursor-not-allowed",
        range_middle:
          "aria-selected:bg-bronze-500/20 aria-selected:text-white",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, ...props }) =>
          orientation === "left" ? (
            <ChevronLeft className="h-4 w-4" {...props} />
          ) : (
            <ChevronRight className="h-4 w-4" {...props} />
          ),
      }}
      {...props} />
  );
}
Calendar.displayName = "Calendar"

export { Calendar }
