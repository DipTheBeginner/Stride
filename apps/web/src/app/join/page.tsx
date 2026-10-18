export default function Join() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-[#F7F8F8]">
      <div className="flex w-full max-w-[380px] flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-[#0F1012]/90 p-8 shadow-2xl">
        <span className="text-2xl font-bold tracking-tight">
          Create a workspace
        </span>
        <span className="text-center text-sm text-[#8A8F98]">
          Move work forward across teams and agents
        </span>

        {/* Workspace Name */}
        <div className="mt-6 flex w-full flex-col gap-1.5">
          <span className="text-xs font-medium text-[#8A8F98]">Name</span>
          <input
            type="text"
            placeholder="e.g. Acme Engineering"
            className="w-full rounded-lg border border-white/10 bg-[#16181D] px-3 py-2 text-sm text-[#F7F8F8] placeholder-[#5E636E] outline-none transition-colors focus:border-indigo-500"
          />
        </div>

        {/* Workspace URL */}
        <div className="mt-4 flex w-full flex-col gap-1.5">
          <span className="text-xs font-medium text-[#8A8F98]">URL</span>
          <div className="flex w-full flex-row items-center rounded-lg border border-white/10 bg-[#16181D] px-3 py-2 transition-colors focus-within:border-indigo-500">
            <span className="select-none text-sm text-[#5E636E]">
              stride.app/
            </span>
            <input
              type="text"
              placeholder="acme-engineering"
              className="w-full bg-transparent text-sm text-[#F7F8F8] placeholder-[#5E636E] outline-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          className="mt-6 w-full cursor-pointer rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
        >
          Create workspace
        </button>
      </div>
    </div>
  );
}
