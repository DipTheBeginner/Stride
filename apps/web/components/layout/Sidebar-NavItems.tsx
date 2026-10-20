

import { LucideIcon } from "lucide-react"


type SidebarNavItemsProps = {
  icon:LucideIcon 
  name: string
  href:string
}

export default function SidebarNavItems({ icon:Icon, name,href }: SidebarNavItemsProps) {



  return (
    <div className="flex p-4  hover:bg-white/6 hover:rounded-lg hover:">
      <div className="flex gap-4">
        <Icon size={20}/>
        <span className="text-sm font-medium text-[#8A8F98] hover:text-[#F7F8F8]">{name}</span>
      </div>
    </div>
  )
  
}