import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";

const PlanCard = ({ plan }: { plan: any }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="
        bg-white rounded-2xl shadow-md
        p-6 h-40 flex flex-col justify-between
      "
    >
      <div>
        <h3 className="font-bold text-lg text-[#1E2A35]">
          {plan.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {plan.description}
        </p>
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <CalendarDays size={14} />
          {plan.days} Days
        </div>
        <span>
          {plan.startDate} - {plan.endDate}
        </span>
      </div>
    </motion.div>
  );
};

export default PlanCard;
