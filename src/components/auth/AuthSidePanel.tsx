import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import logoHadassaWhite from "../../assets/hadassa/hadassa_logoW.png";

interface AuthSidePanelProps {
  title: string;
  subtitle: string;
  stats?: { value: string; label: string }[];
  badge?: string;
}

export const AuthSidePanel = ({ title, subtitle, stats, badge }: AuthSidePanelProps) => {
  return (
    <>
      <div className="absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-96 h-96 bg-[var(--bg-white)]/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--bg-white)]/10 rounded-full blur-3xl"
        />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-[var(--bg-white)]">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <div className="w-32 h-32 rounded-full flex items-center justify-center">
            <img src={logoHadassaWhite} alt="" />
          </div>
        </motion.div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-5xl font-bold text-center mb-6"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xl text-[var(--bg-white)]/90 text-center max-w-md mb-8"
        >
          {subtitle}
        </motion.p>
        {badge && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-2 px-6 py-3 bg-[var(--bg-white)]/10 backdrop-blur-sm rounded-full"
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-sm">{badge}</span>
          </motion.div>
        )}
        {stats && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-16 grid grid-cols-3 gap-8 text-center"
          >
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-bold mb-2 text-[var(--bg-white)]">{stat.value}</div>
                <div className="text-sm text-[var(--bg-white)]/80">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </>
  );
};