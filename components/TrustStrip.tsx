import React from "react";
import { FaCheckCircle } from "react-icons/fa";

interface TrustStripProps {
  points: string[];
  className?: string;
  itemClassName?: string;
}

const TrustStrip: React.FC<TrustStripProps> = ({
  points,
  className = "",
  itemClassName = "text-sm text-gray-600",
}) => {
  return (
    <div className={`border-b border-slate-200 bg-white ${className}`}>
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {points.map((point) => (
            <li
              key={point}
              className={`inline-flex items-center gap-1.5 ${itemClassName}`}
            >
              <FaCheckCircle className="shrink-0 text-xs text-brand-950" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrustStrip;
