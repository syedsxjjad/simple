"use client"

import * as React from "react"
import { format, isSameDay, isValid } from "date-fns"
import { Calendar } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/utils/utils"
import {
  formatLocalDateToIso,
  isoMinMaxDisabledMatchers,
  parseIsoDateOnlyToDate,
} from "@/utils/iso-date"
import { FormLabel } from "@/components/ui/form"
import { Calendar as CalendarGrid } from "@/components/ui/calender"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function sanitizeRange(input?: DateRange): DateRange | undefined {
  if (!input) return undefined
  const from = input.from && isValid(input.from) ? input.from : undefined
  const to = input.to && isValid(input.to) ? input.to : undefined
  if (!from && !to) return undefined
  return { from: from ?? to, to: to }
}

/** Matches {@link DatePickerInput} field chrome (label, row, icon, error row). */
const baseWrapperClass =
  "relative flex w-full items-center rounded-2xl px-4 border border-border bg-primary h-12 md:h-14 shrink-0 overflow-visible"
const triggerTextClass =
  "flex min-h-0 flex-1 items-center self-stretch pr-2 text-left text-base font-normal leading-[3rem] md:leading-[3.5rem] focus:outline-none focus-visible:ring-0 [color-scheme:dark]"

type SharedRangeDatePickerProps = {
  placeholder?: string
  className?: string
  label?: string
  labelClassName?: string
  required?: boolean
  error?: string
  errorClassName?: string
  disabled?: boolean
  "aria-label"?: string
  triggerClassName?: string
  /**
   * When true, omit label + error message (parent supplies them). Still applies
   * `error` to trigger border when set.
   */
  embedded?: boolean
}

export type RangeDatePickerRangeProps = SharedRangeDatePickerProps & {
  selection?: "range"
  value?: DateRange
  onChange?: (range: DateRange | undefined) => void
}

export type RangeDatePickerSingleProps = SharedRangeDatePickerProps & {
  selection: "single"
  value?: string
  onChange?: (value: string) => void
  min?: string
  max?: string
}

export type RangeDatePickerProps =
  | RangeDatePickerRangeProps
  | RangeDatePickerSingleProps

export function RangeDatePicker(props: RangeDatePickerProps) {
  const isSingle = props.selection === "single"
  const embedded = props.embedded ?? false

  const {
    className,
    label,
    labelClassName,
    required,
    error,
    errorClassName,
    disabled = false,
    "aria-label": ariaLabel,
    triggerClassName,
  } = props

  const placeholder =
    props.placeholder ??
    (isSingle ? "Select date" : "Select date range")

  const [open, setOpen] = React.useState(false)

  const [rangeDate, setRangeDate] = React.useState<DateRange | undefined>(() =>
    !isSingle ? sanitizeRange(props.value) : undefined,
  )

  const [singleDate, setSingleDate] = React.useState<Date | undefined>(() =>
    isSingle ? parseIsoDateOnlyToDate(props.value) : undefined,
  )

  const rangeValue = !isSingle ? props.value : undefined
  const singleValue = isSingle ? props.value : undefined

  React.useEffect(() => {
    if (isSingle) {
      setSingleDate(parseIsoDateOnlyToDate(singleValue))
    } else {
      setRangeDate(sanitizeRange(rangeValue))
    }
  }, [isSingle, rangeValue, singleValue])

  const handleRangeSelect = (range: DateRange | undefined) => {
    if (!isSingle) {
      const next = sanitizeRange(range)
      setRangeDate(next)
      ;(props as RangeDatePickerRangeProps).onChange?.(range)
      // First range tap often sets `from` === `to`; only close once the span is two distinct days.
      if (
        next?.from &&
        next?.to &&
        isValid(next.from) &&
        isValid(next.to) &&
        !isSameDay(next.from, next.to)
      ) {
        setOpen(false)
      }
    }
  }

  const handleSingleSelect = (d: Date | undefined) => {
    if (!isSingle || disabled) return
    setSingleDate(d)
    const iso = d ? formatLocalDateToIso(d) : ""
    ;(props as RangeDatePickerSingleProps).onChange?.(iso)
    setOpen(false)
  }

  const from = rangeDate?.from
  const to = rangeDate?.to
  const fromOk = Boolean(from && isValid(from))
  const toOk = Boolean(to && isValid(to))
  const singleOk = Boolean(singleDate && isValid(singleDate))

  const defaultMonthRange =
    fromOk && from ? from : toOk && to ? to : new Date()
  const defaultMonthSingle =
    singleDate ??
    parseIsoDateOnlyToDate(
      isSingle ? (props as RangeDatePickerSingleProps).max : undefined,
    ) ??
    parseIsoDateOnlyToDate(
      isSingle ? (props as RangeDatePickerSingleProps).min : undefined,
    ) ??
    new Date()

  const rangeLabel =
    fromOk && from
      ? toOk && to
        ? `${format(from, "LLL dd, y")} – ${format(to, "LLL dd, y")}`
        : format(from, "LLL dd, y")
      : null

  const singleLabel =
    singleOk && singleDate ? format(singleDate, "LLL dd, y") : null

  const displayLabel = isSingle ? singleLabel : rangeLabel
  const hasDisplay = Boolean(displayLabel)

  const singleDisabledMatchers = isSingle
    ? isoMinMaxDisabledMatchers(
        (props as RangeDatePickerSingleProps).min,
        (props as RangeDatePickerSingleProps).max,
      )
    : undefined

  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 h-22 justify-start",
        embedded && "h-auto gap-0",
        className,
      )}
    >
      {!embedded && label ? (
        <FormLabel
          className={cn(
            "text-sm font-medium text-foreground-white! uppercase",
            labelClassName,
          )}
        >
          {label}{" "}
          {required ? <span className="text-required-red">*</span> : null}
        </FormLabel>
      ) : null}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            aria-label={ariaLabel}
            className={cn(
              baseWrapperClass,
              error && "border-destructive",
              disabled && "opacity-60",
              triggerClassName,
            )}
          >
            <span
              className={cn(
                triggerTextClass,
                hasDisplay ? "text-placeholder" : "text-placeholder/30",
              )}
            >
              {displayLabel ?? placeholder}
            </span>
            <Calendar
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 shrink-0 -translate-y-1/2 text-secondary-dark"
              aria-hidden
            />
          </button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          sideOffset={8}
          className={cn(
            "z-[100] w-auto rounded-2xl border border-border bg-primary p-0 shadow-xl text-foreground-white",
          )}
        >
          {isSingle ? (
            <CalendarGrid
              mode="single"
              required={false}
              calendarAppearance="single"
              selected={singleDate}
              onSelect={handleSingleSelect}
              defaultMonth={defaultMonthSingle}
              disabled={disabled ? true : singleDisabledMatchers}
              numberOfMonths={1}
            />
          ) : (
            <CalendarGrid
              mode="range"
              calendarAppearance="range"
              defaultMonth={defaultMonthRange}
              selected={rangeDate}
              onSelect={handleRangeSelect}
              numberOfMonths={1}
            />
          )}
        </PopoverContent>
      </Popover>

      {!embedded && error ? (
        <div className="-mt-1 flex h-5 items-start">
          <p
            className={cn(
              "font-normal text-xs text-destructive",
              errorClassName,
            )}
          >
            {error}
          </p>
        </div>
      ) : null}
    </div>
  )
}
