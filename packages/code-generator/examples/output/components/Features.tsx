export function Features() {
  return (
    <section className="flex flex-col items-center bg-[#ffffff] p-16">
      <h1 className="text-[#1f2937] text-4xl font-bold m-8">Powerful Features</h1>
      <div className="grid gap-8">
        <div className="flex flex-col bg-[#f9fafb] p-6 rounded-lg">
          <h1 className="text-xl font-semibold m-2">AI Design</h1>
          <p className="text-[#6b7280]">Generate beautiful designs from text prompts</p>
        </div>
        <div className="flex flex-col bg-[#f9fafb] p-6 rounded-lg">
          <h1 className="text-xl font-semibold m-2">Clean Code</h1>
          <p className="text-[#6b7280]">Production-ready Next.js + TailwindCSS</p>
        </div>
        <div className="flex flex-col bg-[#f9fafb] p-6 rounded-lg">
          <h1 className="text-xl font-semibold m-2">One-Click Deploy</h1>
          <p className="text-[#6b7280]">Deploy to Vercel with a single click</p>
        </div>
      </div>
    </section>
  );
}
