"use client";

import { useState } from "react";
import { X } from "lucide-react";
import DatePicker from "../ui/date-picker";

type ProjectDateTagsProps = {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;

  startDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;

  dueDate: string;
  setDueDate: React.Dispatch<React.SetStateAction<string>>;
};


export default function ProjectDateTags({
  tags,
  setTags,
  startDate,
  setStartDate,
  dueDate,
  setDueDate,
}: ProjectDateTagsProps) {
  const [tagInput, setTagInput] = useState("");

  function addTag() {
    const newTag = tagInput.trim();

    if (!newTag) {
      return;
    }

    if (tags.some((tag) => tag.toLowerCase() === newTag.toLowerCase())) {
      return;
    }

    setTags((prev) => [...prev, newTag]);
    setTagInput("")
  }

  function removeTag(tagtoRemove: string) {
    setTags((prev)=>prev.filter((tag)=>tag!==tagtoRemove))
 }

  return (
    <div className="flex flex-col gap-5">
      {/* Project Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold">Start date *</span>

          <DatePicker
            value={startDate}
            onChange={(date) => {
              setStartDate(date);

              if (dueDate && dueDate < date) {
                setDueDate("");
              }
            }}
            placeholder="Select start date"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold">Due date *</span>

          <DatePicker
            value={dueDate}
            onChange={setDueDate}
            placeholder="Select due date"
            minDate={startDate || undefined}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span>Project tags</span>
        <div className="flex min-h-11 flex-wrap items-center gap-2 rounded-lg border border-white/10 bg-[#191E22] px-3 py-2">
          {tags.map((tag) => (
            <div key={tag} className="flex items-center gap-1.5 rounded-md bg-[#30334C] px-2 py-1 text-xs  text-[#C4B5FD]">
              <span>{tag}</span>
              <button className="cursor-pointer text-[#C4B5FD] transition-colors hover:text-white" onClick={() => removeTag(tag)}
                aria-label={`Remove ${tag}`}>
                <X size={10}/>
              </button>
            </div>
          ))}

          <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
              
            }} placeholder={tags.length === 0 ? "Add a tag..." : "Add more"}

          className="minw-28 bg-transparent text-sm text-white outline-none placeholder:text-[#8A8F98]"/>
        </div>
        
      </div>
    </div>
  );
}
