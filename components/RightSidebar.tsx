import Link from 'next/link';
import React from 'react';
import BankCard from './BankCard';
import { countTransactionCategories } from '@/lib/utils';
import Category from './Category';
import { Plus } from 'lucide-react';

const RightSidebar = ({ user, transactions = [], banks = [] }: RightSidebarProps) => {
  const categories: CategoryCount[] = countTransactionCategories(transactions || []);

  const initial = user?.firstName?.[0] || user?.name?.[0] || 'U';
  const fullName = `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || user?.name || 'User';

  return (
    <aside className="no-scrollbar hidden h-screen max-h-screen flex-col border-l border-line bg-paperRaised xl:flex w-[355px] xl:overflow-y-scroll">
      <section className="flex flex-col pb-6">
        <div className="h-[100px] w-full bg-gradient-to-r from-ink to-ink2 border-b border-inkSoft" />
        <div className="relative flex px-6">
          <div className="flex-center absolute -top-8 size-20 rounded-full bg-gold text-ink font-semibold bn-serif text-3xl border-4 border-paperRaised shadow-md">
            <span>{initial}</span>
          </div>

          <div className="flex flex-col pt-16">
            <h1 className="bn-serif text-[22px] font-medium text-text truncate">
              {fullName}
            </h1>
            <p className="text-[13px] text-textMuted truncate">
              {user?.email}
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-between gap-6 px-6 py-4">
        <div className="flex w-full justify-between items-center">
          <h2 className="bn-serif text-[17px] font-medium text-text">Connected cards</h2>
          <Link href="/my-banks" className="flex items-center gap-1.5 text-text hover:text-gold transition-colors text-[13px] font-semibold">
            <Plus size={15} color="#B8863B" />
            <span>Manage</span>
          </Link>
        </div>

        {banks?.length > 0 ? (
          <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
            <div className="relative z-10 w-full">
              <BankCard 
                key={banks[0].id || banks[0].$id}
                account={banks[0]}
                userName={fullName}
                showBalance={false}
              />
            </div>
            {banks[1] && (
              <div className="absolute right-0 top-8 z-0 w-[90%] opacity-80">
                <BankCard 
                  key={banks[1].id || banks[1].$id}
                  account={banks[1]}
                  userName={fullName}
                  showBalance={false}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-[8px] border border-dashed border-line p-5 text-center text-textMuted bg-paper">
            <p className="text-[13px]">No banks connected yet</p>
          </div>
        )}

        {categories && categories.length > 0 && (
          <div className="mt-4 flex flex-1 flex-col gap-4">
            <h2 className="bn-serif text-[17px] font-medium text-text">Top categories</h2>

            <div className="space-y-4">
              {categories.map((category) => (
                <Category key={category.name} category={category} />
              ))}
            </div>
          </div>
        )}
      </section>
    </aside>
  );
};

export default RightSidebar;