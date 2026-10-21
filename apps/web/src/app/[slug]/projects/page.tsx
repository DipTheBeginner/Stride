"use client"

import { Plus } from "lucide-react";
import { useState } from "react";




export default function Projects() {

  const [isOpen, setIsOpen] = useState(false);


  return (

    <div className=" flex flex-col p-6 min-h-screen">
      <div className="flex justify-between">
        <div className="flex flex-col">
          
        <div className="text-3xl font-bold">Projects</div>
        <span className=" text-[#8A8F98]">Manage and organize your workspace projects</span>
        <div>
          boxes
        </div>
        </div>
        <button onClick={()=>setIsOpen(true)}
          className="bg-[#4F54E7] flex">
          <Plus/>
          <span>New project</span>
        </button>
        
      </div>
      <div className="flex" >
        <div className="flex flex-col">
          <div>
            <div>Search bar</div>
            <div>statuses</div>
            <div>sort by</div>
            <div>view type</div>
          </div>
          <div>
            projects list
          </div>
        </div>
        <div>
          project overview
        </div>
      </div>
    </div>
    
  )
}