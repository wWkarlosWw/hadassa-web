import { motion } from "motion/react";

interface StatItem {
  value: string;
  label: string;
}

interface AuthStatsProps {
  stats: StatItem[];
}

export const AuthStats = ({ stats }: AuthStatsProps) => {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.9 }}
      className="mt-16 grid grid-cols-3 gap-8 text-center"
    >
      {stats.map((stat, index) => (
        <div key={index}>
          <div className="text-3xl font-bold mb-2 text-[var(--bg-white)]">{stat.value}</div>
          <div className="text-sm text-white/80">{stat.label}</div>
        </div>
      ))}
    </motion.div>
  );
};