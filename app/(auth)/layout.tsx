import Image from 'next/image';
import {
  ShieldCheck,
  Zap,
  TrendingUp,
  CreditCard,
  Lock,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full font-inter bg-[#FAFCFF]">
      {/* Left Form Container */}
      <div className="flex flex-1 flex-col justify-center items-center px-4 sm:px-8 py-10 lg:py-12 overflow-y-auto">
        <div className="w-full max-w-[460px]">{children}</div>
      </div>

      {/* Right Brand & Showcase Pane */}
      <div className="hidden lg:flex flex-1 relative flex-col justify-between p-12 xl:p-16 overflow-hidden bg-gradient-to-br from-[#081E48] via-[#0A2E6E] to-[#0150B8] text-white">
        {/* Background Ambient Glow & Mesh Elements */}
        <div className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 size-96 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px]" />

        {/* Top Header Highlight */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 backdrop-blur-md border border-white/15 text-13 font-medium text-blue-100">
            <Sparkles size={14} className="text-yellow-300" />
            <span>Smart Financial Dashboard</span>
          </div>

          <div className="flex items-center gap-1.5 text-12 font-medium text-blue-200">
            <div className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Systems Normal</span>
          </div>
        </div>

        {/* Center Floating Glass Cards Showcase */}
        <div className="relative z-10 my-auto py-8 flex flex-col gap-6 max-w-[480px]">
          {/* Card 1: Balance Snapshot */}
          <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:bg-white/[0.14] hover:border-white/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/30 border border-blue-400/30 text-white">
                  <CreditCard size={20} />
                </div>
                <div>
                  <p className="text-12 font-medium text-blue-200">Total Asset Balance</p>
                  <p className="text-24 font-bold tracking-tight text-white">₹14,28,500.00</p>
                </div>
              </div>
              <div className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-1 text-12 font-semibold text-emerald-300 border border-emerald-500/30">
                <TrendingUp size={13} />
                <span>+18.4%</span>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
              <div>
                <span className="text-11 text-blue-200 uppercase tracking-wider">Connected Banks</span>
                <p className="text-14 font-semibold text-white">Chase • BoA • Wells</p>
              </div>
              <div>
                <span className="text-11 text-blue-200 uppercase tracking-wider">Instant Transfer</span>
                <p className="text-14 font-semibold text-white">Enabled (Dwolla)</p>
              </div>
            </div>
          </div>

          {/* Card 2: Feature Highlights */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/15 bg-white/5 p-4 backdrop-blur-md">
              <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-300 mb-2.5">
                <ShieldCheck size={18} />
              </div>
              <h4 className="text-14 font-semibold text-white">Bank-Grade Security</h4>
              <p className="text-12 text-blue-200 mt-1">256-bit encryption & multi-factor validation.</p>
            </div>

            <div className="rounded-xl border border-white/15 bg-white/5 p-4 backdrop-blur-md">
              <div className="flex size-8 items-center justify-center rounded-lg bg-blue-500/20 text-blue-300 mb-2.5">
                <Zap size={18} />
              </div>
              <h4 className="text-14 font-semibold text-white">Instant Syncing</h4>
              <p className="text-12 text-blue-200 mt-1">Real-time balances & synced transaction history.</p>
            </div>
          </div>
        </div>

        {/* Bottom Social Proof & Trust Badges */}
        <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/15 text-13 text-blue-200">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="size-7 rounded-full bg-blue-400 border-2 border-[#0A2E6E] flex items-center justify-center text-10 font-bold text-white">
                AK
              </div>
              <div className="size-7 rounded-full bg-emerald-500 border-2 border-[#0A2E6E] flex items-center justify-center text-10 font-bold text-white">
                SM
              </div>
              <div className="size-7 rounded-full bg-purple-500 border-2 border-[#0A2E6E] flex items-center justify-center text-10 font-bold text-white">
                JD
              </div>
            </div>
            <span className="text-white font-medium">50,000+ users trust Bank Nova</span>
          </div>

          <div className="flex items-center gap-1 text-emerald-300 font-semibold text-12">
            <CheckCircle2 size={15} />
            <span>Plaid & Dwolla Certified</span>
          </div>
        </div>
      </div>
    </main>
  );
}
