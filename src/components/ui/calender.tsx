"use client"

import * as React from "react"
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/style.css"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/utils/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  /** `single`: same muted bar palette as range (`bg-foreground-white/20`). `range`: range bar + endpoints. */
  calendarAppearance?: "single" | "range"
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  calendarAppearance = "range",
  ...props
}: CalendarProps) {
  const isSingleAppearance = calendarAppearance === "single"

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "p-3 text-foreground-white",
        "[&_.rdp-weekday]:opacity-100",
        "[&_.rdp-outside]:text-foreground-white/45",
        className,
      )}
      classNames={{
        months: "flex w-full flex-col gap-4",

        month: "w-full space-y-4",

        month_caption: "relative flex items-center justify-center pt-1",

        caption_label: "text-sm font-medium text-foreground-white",

        nav: "flex items-center gap-1",

        button_previous: cn(
          buttonVariants({ variant: "outline" }),
          "absolute left-1 top-1 h-7 w-7 border-border bg-transparent p-0 text-foreground-white opacity-80 hover:opacity-100",
        ),

        button_next: cn(
          buttonVariants({ variant: "outline" }),
          "absolute right-1 top-1 h-7 w-7 border-border bg-transparent p-0 text-foreground-white opacity-80 hover:opacity-100",
        ),

        month_grid: "w-full border-collapse",

        weekdays: "",

        weekday:
          "w-[14.28%] p-0 text-center text-xs font-medium text-foreground-white opacity-100",

        day: cn(
          "relative p-0 text-center align-middle",
          isSingleAppearance && "group",
        ),

        day_button: cn(
          "rdp-day_button",
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 border-0 p-0 !text-sm font-normal text-foreground-white aria-selected:opacity-100 focus:ring-0 focus:ring-offset-0 hover:bg-foreground-white/10 hover:text-foreground-white",
          isSingleAppearance &&
            'group-data-[selected="true"]:!bg-transparent group-data-[selected="true"]:!text-foreground-white group-data-[selected="true"]:font-semibold group-data-[selected="true"]:rounded-none group-data-[selected="true"]:hover:!bg-foreground-white/10',
        ),

        /** Range: avoid solid `bg-primary` on every selected cell. Single: same muted bar as range row (`bg-foreground-white/20`). */
        selected: cn(
          "text-foreground-white",
          isSingleAppearance &&
            "rounded-md bg-foreground-white/20",
        ),

        range_start: cn(
          "rounded-l-md bg-foreground-white/20",
          "[&_button]:rounded-l-md [&_button]:bg-secondary-light [&_button]:font-semibold [&_button]:text-foreground-black [&_button]:hover:bg-secondary-light",
        ),

        range_middle: cn(
          "rounded-none bg-foreground-white/18",
          "[&_button]:rounded-none [&_button]:!bg-transparent [&_button]:font-normal [&_button]:hover:bg-foreground-white/10",
        ),

        range_end: cn(
          "rounded-r-md bg-foreground-white/20",
          "[&_button]:rounded-r-md [&_button]:bg-secondary-light [&_button]:font-semibold [&_button]:text-foreground-black [&_button]:hover:bg-secondary-light",
        ),

        today:
          "bg-accent/30 text-foreground-white",

        chevron: "size-4 text-foreground-white",

        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className: chClassName, disabled }) => {
          const cnIcon = cn(
            "size-4 shrink-0 text-foreground-white",
            chClassName,
            disabled && "opacity-40",
          )
          if (orientation === "left")
            return <ChevronLeft className={cnIcon} aria-hidden />
          if (orientation === "right")
            return <ChevronRight className={cnIcon} aria-hidden />
          if (orientation === "up")
            return <ChevronUp className={cnIcon} aria-hidden />
          if (orientation === "down")
            return <ChevronDown className={cnIcon} aria-hidden />
          return <ChevronLeft className={cnIcon} aria-hidden />
        },
      }}
      {...props}
    />
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
