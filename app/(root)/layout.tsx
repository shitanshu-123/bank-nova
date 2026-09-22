import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import SiteFooter from "@/components/SiteFooter";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = await getLoggedInUser();

  if(!loggedIn) redirect('/sign-in');

  return (
    <main className="flex h-screen w-full bg-paper text-text font-sans antialiased overflow-hidden">
      <Sidebar user={loggedIn} />

      <div className="flex size-full flex-col overflow-y-auto bn-scroll bg-paper">
        <div className="flex md:hidden items-center justify-between w-full px-5 py-3.5 bg-ink text-textOnInk border-b border-white/10 shadow-sm sticky top-0 z-30">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center bn-serif size-7 rounded-full bg-gold text-ink font-semibold text-13">
              N
            </div>
            <span className="bn-serif text-16 font-medium tracking-wide text-textOnInk">
              Bank Nova
            </span>
          </div>
          <div>
            <MobileNav user={loggedIn} />
          </div>
        </div>

        <div className="flex-1">
          {children}
        </div>
        <SiteFooter />
      </div>
    </main>
  );
}
