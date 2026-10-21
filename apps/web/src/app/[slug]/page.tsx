import WorkspaceHeader from "../../../components/workspace/dashboard/workspace-header";

export default function WorkspacePage() {
  return (
    <div className="flex min-h-full w-full">
      <main className="w-[75%] p-6">

        <WorkspaceHeader/>
        
      </main>

      <aside className="w-[25%] border-l border-[#363943] p-4">right</aside>
    </div>
  );
}
