import React from "react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  name: string;
  value: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  name,
  value,
  icon: Icon,
  color,
  bgColor,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center">
        <div className={`${bgColor} p-3 rounded-lg`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{name}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
