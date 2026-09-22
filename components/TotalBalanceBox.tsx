import React from 'react';
import AnimatedCounter from './AnimatedCounter';
import DoughnutChart from './DoughnutChart';

function Flatline() {
  return (
    <svg width="100%" height="40" viewBox="0 0 520 40" preserveAspectRatio="none" className="block w-full">
      <line x1="0" y1="20" x2="516" y2="20" stroke="#D9D4C2" strokeWidth="1.2" strokeDasharray="2 6" strokeLinecap="round" />
      <circle cx="516" cy="20" r="3.5" fill="#B8863B" />
    </svg>
  );
}

const TotalBalanceBox = ({
  accounts = [],
  totalBanks = 0,
  totalCurrentBalance = 0,
}: TotalBalanceBoxProps) => {
  return (
    <section
      className="bn-fade-up w-full rounded-[10px] border border-line bg-paperRaised p-6 sm:p-8 shadow-sm transition-all"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex-1 w-full">
          <div className="text-[12.5px] font-medium text-textMuted uppercase tracking-wider mb-1.5">
            Total balance
          </div>

          <div className="bn-serif text-[42px] sm:text-[48px] font-medium text-text leading-[1.1] tracking-tight">
            <AnimatedCounter amount={totalCurrentBalance} />
          </div>

          <div className="text-[13px] text-textMuted mt-1.5 mb-4">
            {totalBanks === 0
              ? '0 accounts connected'
              : totalBanks === 1
              ? '1 account connected'
              : `${totalBanks} accounts connected`}
          </div>

          <Flatline />
        </div>

        {accounts && accounts.length > 0 && (
          <div className="hidden lg:flex size-[110px] items-center justify-center shrink-0 border-l border-line pl-6">
            <DoughnutChart accounts={accounts} />
          </div>
        )}
      </div>
    </section>
  );
};

export default TotalBalanceBox;