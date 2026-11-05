import { ChevronDown, LucideClipboardList } from "lucide-react"
import { useState } from "react"
import { issuePriority, IssueStatuses, issueType, ProjectMember } from "./issue-constants"
import { useProjects } from "../projects/projects-context"



type IssueAttributesPanelsProps = {

  member:ProjectMember[]
  
  type: string;
  setType: (type: string) => void;

  status: string;
  setStatus: (status: string) => void;

  priority: string;
  setPriority: (priority: string) => void;

  assignee: string;
  setAssignee: (type: string) => void;
 
}



export default function IssueAttributesPanels() {


  const [typeDropdown, setTypeDropdown] = useState(false)
  const [statusDropdown, setStatusDropdown] = useState(false)
  const [priorityDropdown, setPriorityDropdown] = useState(false)
  const [assigneeDropdown, setAssigneeDropdown] = useState(false)

  

  
  
  



  return (

    <div>
      

    <div className="flex flex-row gap-2">



      {/*Task type*/}

      <button className="flex justify-between rounded-lg p-3 w-full items-center  bg-[#1A1D23]"
        onClick={()=>setTypeDropdown(!typeDropdown)}>
        <div className="flex gap-1 items-center">
          
        <LucideClipboardList />
        <h1>Task</h1>
        </div>
        <div>
          <ChevronDown/>
        </div>
        
      </button>

      {typeDropdown && (
        <div className="flex flex-col rounded-lg">
          {issueType.map((type) => (
            <button key={type.value} className="flex  px-4 py-3 items-center text-left gap-3 hover:bg-[#252B33]">
              <span>{type.label}</span>
            </button>
          ))}
        </div>
      )}




      {/*Status*/}
      
      
      <button className="flex items-center justify-between w-full"
        onClick={()=>setStatusDropdown(!statusDropdown)}>
          <div className="flex">
            
          <div className="rounded-full h-2.5 w-2.5" />
          <h1>To Do</h1>
          </div>

          <div>
            <ChevronDown/>
          </div>
      </button>

      {statusDropdown && (
        <div>
          {IssueStatuses.map((status) => (
            <button key={status.value} className="flex flex-col items-center text-left">
              {status.label}
              
            </button>
          ))}
        </div>
      )}



      {/*Priority*/}


      <button className="flex items-center justify-between w-full"
        onClick={()=>setPriorityDropdown(!priorityDropdown)}>
          <div className="flex">
            
          <div className="rounded-full h-2.5 w-2.5" />
          <h1>Medium</h1>
          </div>

          <div>
            <ChevronDown/>
          </div>
      </button>

      {priorityDropdown && (
        <div>
          {issuePriority.map((issue) => (
            <button key={issue.value} className="flex flex-col items-center text-left">
              {issue.label}
              
            </button>
          ))}
        </div>
      )}
      
      
      
     
        






      
      
      </div>


      <button className="flex items-center justify-between w-full"
        onClick={()=>setAssigneeDropdown(!assigneeDropdown)}>
          <div className="flex">
            
          <div className="rounded-full h-2.5 w-2.5" />
          <h1>Unassigned</h1>
          </div>

          <div>
            <ChevronDown/>
          </div>
      </button>

      {assigneeDropdown && (
        <div>
          {.map((issue) => (
            <button key={issue.value} className="flex flex-col items-center text-left">
              {issue.label}
              
            </button>
          ))}
        </div>
      )}
      

      
    
    </div>
  )
}