"use client";

import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerProps = {
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
  minDate?: string;
};

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function DatePicker({
  value,
  onChange,
  placeholder = "Select date",
  minDate,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex w-full cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-[#191E22] p-3 text-left text-sm"
        >
          <CalendarDays size={18} className="text-[#8A8F98]" />

          <span className={value ? "text-white" : "text-[#8A8F98]"}>
            {value || placeholder}
          </span>
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="z-60 w-auto border border-white/10 bg-[#191E22] p-2 text-white"
      >
        <Calendar
          mode="single" 
          selected={
            value ? new Date(`${value}T00:00:00`) : undefined
          }
          disabled={
            minDate
              ? (date) => formatDate(date) < minDate
              : undefined
          }
          onSelect={(date) => {
            if (!date) return;

            onChange(formatDate(date));
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}