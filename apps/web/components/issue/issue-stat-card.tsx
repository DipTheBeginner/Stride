import { ArrowUp, type LucideIcon } from "lucide-react";

type OverviewStatCardProps = {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  weeklyChange?: number;
};

export default function IssueStatCard({
  title,
  value,
  icon: Icon,
  color,
  weeklyChange,
}: OverviewStatCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-white/10 p-4">
      <div className="flex shrink-0 items-center justify-center rounded-lg border p-4 " style={{backgroundColor: `${color}20`, borderColor: `${color}30`,}} >
        
      <Icon size={22} style={{ color }} />
      </div>

      <div>
        <h2 className="text-2xl font-semibold">{value}</h2>
        <p className="text-sm text-zinc-400">{title}</p>
      </div>

      {weeklyChange !== undefined && weeklyChange > 0 && (
                <div className="mt-1 flex items-center gap-1 text-xs font-medium text-emerald-400">
                  <ArrowUp size={14} />
                  <span>{weeklyChange} this week</span>
                </div>
              )}

      
    </div>
  );
}
