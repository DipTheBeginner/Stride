import type { LucideIcon } from "lucide-react";



type OverviewStatCardProps = {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  weeklyChange?: number;
};

export default function IssueStatCard({ title, value, icon:Icon, color, weeklyChange }: OverviewStatCardProps) {


  return (
    <div className="flex items-center gap-4 rounded-xl border border-white/10 p-4">
          <Icon size={22} style={{ color }} />
    
          <div>
            <h2 className="text-2xl font-semibold">{value}</h2>
            <p className="text-sm text-zinc-400">{title}</p>
          </div>
        </div>
  )
}