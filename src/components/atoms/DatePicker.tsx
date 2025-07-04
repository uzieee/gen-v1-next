"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"

export function DatePicker({
  date,
  setDate,
  error
}: {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  error?: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <Popover>
        <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "justify-start text-left font-normal focus:text-primary text-main-600 font-ariom",
                "!p-4 rounded-2xl h-auto",
              )}
              type="button"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "dd/MM/yyyy") : <span>Pick a date</span>}
            </Button>
        </PopoverTrigger>
        <PopoverContent className="min-w-2xs w-full p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="!w-full !bg-main-600"
            captionLayout="dropdown"
            />
        </PopoverContent>
      </Popover>
      {error && <span className="text-error text-sm">{error}</span>}
    </div>
  )
}
