import { AlertTriangle } from "lucide-react";

export default function PriorityIcon({ value }: { value: string }) {
  if (value === "URGENT") {
    return <AlertTriangle size={18} className="text-red-500" />;
  }

  const levels: Record<string, number> = {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
  };

  const colors: Record<string, string> = {
    LOW: "#8A8F98",
    MEDIUM: "#3B82F6",
    HIGH: "#F59E0B",
  };

  return (
    <div className="flex h-5 items-end gap-0.75">
      {[1, 2, 3].map((bar) => (
        <div
          key={bar}
          className="w-1.25 rounded-sm"
          style={{
            height: `${bar * 5 + 3}px`,
            backgroundColor:
              bar <= (levels[value] ?? 0) ? colors[value] : "#30343B",
          }}
        />
      ))}
    </div>
  );
}