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
  /** `brand`: warm tan surface. `light`: white surface. `default`: legacy primary palette. */
  calendarTheme?: "brand" | "light" | "default"
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  calendarAppearance = "range",
  calendarTheme = "default",
  ...props
}: CalendarProps) {
  const isSingleAppearance = calendarAppearance === "single"
  const isBrandTheme = calendarTheme === "brand"
  const isLightTheme = calendarTheme === "light"

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "p-4",
        isLightTheme ? "text-schedule-date-text" : "text-foreground-white",
        "[&_.rdp-weekday]:opacity-100",
        isLightTheme
          ? "[&_.rdp-outside]:text-schedule-days-text/50"
          : isBrandTheme
            ? "[&_.rdp-outside]:text-foreground-white/30"
            : "[&_.rdp-outside]:text-foreground-white/45",
        className,
      )}
      classNames={{
        months: "flex w-full flex-col gap-4",

        month: "w-full space-y-4",

        month_caption: "relative flex items-center justify-center pt-1 pb-2",

        caption_label: cn(
          "text-sm font-medium",
          isLightTheme ? "text-schedule-date-text" : "text-foreground-white",
        ),

        nav: "flex items-center gap-1",

        button_previous: cn(
          buttonVariants({ variant: "outline" }),
          isLightTheme
            ? "absolute left-1 top-1 h-8 w-8 rounded-full border-schedule-border bg-foreground-white p-0 text-secondary-light hover:bg-schedule-days-bg"
            : "absolute left-1 top-1 h-8 w-8 rounded-full border-foreground-white/80 bg-transparent p-0 text-foreground-white opacity-90 hover:bg-foreground-white/10 hover:opacity-100",
          !isBrandTheme && !isLightTheme && "h-7 w-7 border-border opacity-80 hover:opacity-100",
        ),

        button_next: cn(
          buttonVariants({ variant: "outline" }),
          isLightTheme
            ? "absolute right-1 top-1 h-8 w-8 rounded-full border-schedule-border bg-foreground-white p-0 text-secondary-light hover:bg-schedule-days-bg"
            : "absolute right-1 top-1 h-8 w-8 rounded-full border-foreground-white/80 bg-transparent p-0 text-foreground-white opacity-90 hover:bg-foreground-white/10 hover:opacity-100",
          !isBrandTheme && !isLightTheme && "h-7 w-7 border-border opacity-80 hover:opacity-100",
        ),

        month_grid: "w-full border-collapse",

        weekdays: "",

        weekday: cn(
          "w-[14.28%] p-0 text-center text-xs font-medium opacity-100",
          isLightTheme ? "text-schedule-days-text" : "text-foreground-white",
        ),

        day: cn(
          "relative p-0 text-center align-middle",
          isSingleAppearance && "group",
        ),

        day_button: cn(
          "rdp-day_button",
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 border-0 p-0 !text-sm font-normal aria-selected:opacity-100 focus:ring-0 focus:ring-offset-0",
          isLightTheme
            ? "text-schedule-date-text hover:bg-schedule-days-bg hover:text-schedule-date-text"
            : "text-foreground-white hover:bg-foreground-white/10 hover:text-foreground-white",
          isSingleAppearance &&
          (isLightTheme
            ? 'group-data-[selected="true"]:!bg-transparent group-data-[selected="true"]:!text-schedule-date-text group-data-[selected="true"]:font-semibold group-data-[selected="true"]:rounded-none group-data-[selected="true"]:hover:!bg-schedule-days-bg'
            : 'group-data-[selected="true"]:!bg-transparent group-data-[selected="true"]:!text-foreground-white group-data-[selected="true"]:font-semibold group-data-[selected="true"]:rounded-none group-data-[selected="true"]:hover:!bg-foreground-white/10'),
        ),

        /** Range: avoid solid `bg-primary` on every selected cell. Single: same muted bar as range row (`bg-foreground-white/20`). */
        selected: cn(
          isLightTheme ? "text-schedule-date-text" : "text-foreground-white",
          isSingleAppearance &&
          (isLightTheme ? "rounded-md bg-secondary-light/15" : "rounded-md bg-foreground-white/20"),
        ),

        range_start: cn(
          isLightTheme
            ? "rounded-l-full bg-secondary-light/15 [&_button]:rounded-full [&_button]:bg-secondary-light [&_button]:font-semibold [&_button]:text-foreground-white [&_button]:hover:bg-secondary-light"
            : isBrandTheme
              ? "rounded-l-full bg-foreground-white/20 [&_button]:rounded-full [&_button]:bg-foreground-white [&_button]:font-semibold [&_button]:text-secondary-light [&_button]:hover:bg-foreground-white"
              : "rounded-l-md bg-foreground-white/20 [&_button]:rounded-l-md [&_button]:bg-secondary-light [&_button]:font-semibold [&_button]:text-foreground-black [&_button]:hover:bg-secondary-light",
        ),

        range_middle: cn(
          isLightTheme
            ? "rounded-none bg-secondary-light/10 [&_button]:rounded-none [&_button]:!bg-transparent [&_button]:font-normal [&_button]:hover:bg-schedule-days-bg"
            : "rounded-none bg-foreground-white/18 [&_button]:rounded-none [&_button]:!bg-transparent [&_button]:font-normal [&_button]:hover:bg-foreground-white/10",
        ),

        range_end: cn(
          isLightTheme
            ? "rounded-r-full bg-secondary-light/15 [&_button]:rounded-full [&_button]:bg-secondary-light [&_button]:font-semibold [&_button]:text-foreground-white [&_button]:hover:bg-secondary-light"
            : isBrandTheme
              ? "rounded-r-full bg-foreground-white/20 [&_button]:rounded-full [&_button]:bg-foreground-white [&_button]:font-semibold [&_button]:text-secondary-light [&_button]:hover:bg-foreground-white"
              : "rounded-r-md bg-foreground-white/20 [&_button]:rounded-r-md [&_button]:bg-secondary-light [&_button]:font-semibold [&_button]:text-foreground-black [&_button]:hover:bg-secondary-light",
        ),

        today:
          isLightTheme
            ? "font-semibold text-secondary-light"
            : isBrandTheme
              ? "font-semibold text-foreground-white"
              : "bg-accent/30 text-foreground-white",

        chevron: cn(
          "size-4",
          isLightTheme ? "text-secondary-light" : "text-foreground-white",
        ),

        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className: chClassName, disabled }) => {
          const cnIcon = cn(
            "size-4 shrink-0",
            isLightTheme ? "text-secondary-light" : "text-foreground-white",
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
