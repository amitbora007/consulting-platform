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
      className={cn("p-3 sm:p-4 relative w-full", className)}
      classNames={{
        root: "relative w-full",
        months: "relative w-full",
        month: "w-full",
        nav: "flex items-center justify-between absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 h-8 z-10 pointer-events-none",
        button_previous: cn(
          buttonVariants({ variant: "outline" }),
          "pointer-events-auto h-7 w-7 bg-white/5 border border-white/10 p-0 text-white/70 hover:text-white hover:bg-white/10 rounded-md transition-colors flex items-center justify-center cursor-pointer shadow-sm hover:border-white/20 active:scale-95"
        ),
        button_next: cn(
          buttonVariants({ variant: "outline" }),
          "pointer-events-auto h-7 w-7 bg-white/5 border border-white/10 p-0 text-white/70 hover:text-white hover:bg-white/10 rounded-md transition-colors flex items-center justify-center cursor-pointer shadow-sm hover:border-white/20 active:scale-95"
        ),
        month_caption: "flex justify-center items-center h-8 w-full mb-3 select-none",
        caption_label: "font-serif text-sm font-semibold text-white tracking-wide",
        month_grid: "w-full border-collapse",
        weekdays: "flex justify-between w-full mb-2",
        weekday:
          "text-white/40 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider w-8 sm:w-9 h-7 sm:h-8 flex items-center justify-center font-normal",
        week: "flex justify-between w-full mt-1",
        day: "relative p-0 text-center text-xs sm:text-sm font-mono w-8 sm:w-9 h-8 sm:h-9 flex items-center justify-center",
        day_button: cn(
          "h-8 w-8 sm:h-9 sm:w-9 p-0 font-mono text-xs rounded-lg transition-all duration-200 text-white/80 hover:bg-white/10 hover:text-white flex items-center justify-center active:scale-95"
        ),
        range_start: "range_start",
        range_end: "range_end",
        selected:
          "!bg-gradient-to-r !from-[#DFC285] !via-[#D4B26F] !to-[#C0A062] !text-[#06080E] !font-bold hover:!opacity-95 shadow-[0_0_15px_rgba(192,160,98,0.45)] !scale-105",
        today: "border border-bronze-400/50 text-bronze-300 font-semibold",
        outside:
          "outside text-white/20 opacity-30 aria-selected:opacity-60",
        disabled: "text-white/15 opacity-25 cursor-not-allowed hover:bg-transparent",
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
