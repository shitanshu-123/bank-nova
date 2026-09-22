import React from 'react';

const HeaderBox = ({ type = "title", title, subtext, user }: HeaderBoxProps) => {
  const dateStr = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  const greeting = getGreeting();

  return (
    <div className="flex items-baseline justify-between flex-wrap gap-2 mb-2 w-full">
      <div>
        <h1 className="bn-serif text-[26px] md:text-[30px] font-medium text-text leading-tight m-0">
          {type === 'greeting' ? `${greeting}, ${user || 'there'}` : title}
        </h1>
        <p className="text-[13.5px] text-textMuted mt-1">
          {subtext || "Here's where things stand today."}
        </p>
      </div>
      <span className="text-[12.5px] text-textMuted font-medium">
        {dateStr}
      </span>
    </div>
  );
};

export default HeaderBox;