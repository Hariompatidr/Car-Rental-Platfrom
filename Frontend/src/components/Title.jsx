import React from "react";

const Title = ({title, subtitle, align = "center"}) => {
  return (
    <div
      className={
        `flex flex-col items-center text-center ${align === "left" && "md:items-start md:text-left"}`
      }>
        <h1 className="font-semibold text-4xl md:text-[40px]">{title}</h1>
        <h1 className="text-sm md:text-base text-gray-500/90 mt-2 max-w-156">{subtitle}</h1>
    </div>
  );
};

export default Title;
