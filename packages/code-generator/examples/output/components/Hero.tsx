import Link from 'next/link';

export function Hero() {
  return (
    <section className="flex flex-col justify-center items-center bg-[#f9fafb] p-16 h-screen">
      <h1 className="text-[#1f2937] text-5xl font-bold m-4">Build Your Landing Page in Minutes</h1>
      <p className="text-[#6b7280] text-xl m-4">AI-powered design generation with production-ready Next.js code</p>
      <Link href="/signup" className="bg-[#6366f1] text-[#ffffff] text-lg font-semibold p-4 m-8 rounded-lg">
        Get Started
      </Link>
    </section>
  );
}
