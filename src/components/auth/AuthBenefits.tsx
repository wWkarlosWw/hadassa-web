import { motion } from "motion/react";
import { Heart, Users as UsersIcon, Target } from "lucide-react";

interface BenefitItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface AuthBenefitsProps {
  benefits: BenefitItem[];
}

export const AuthBenefits = ({ benefits }: AuthBenefitsProps) => {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="space-y-6 w-full max-w-md"
    >
      {benefits.map((benefit, index) => (
        <div
          key={index}
          className="flex items-start gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-[var(--radius-lg)]"
        >
          <div className="w-12 h-12 rounded-full bg-[var(--bg-white)]/20 flex items-center justify-center flex-shrink-0">
            {benefit.icon}
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2 text-[var(--bg-white)]">{benefit.title}</h3>
            <p className="text-sm text-[var(--bg-white)]/80">{benefit.description}</p>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

const benefitsData = [
  {
    icon: <UsersIcon className="w-6 h-6 text-[var(--bg-white)]" />,
    title: "Comunidad Activa",
    description: "Únete a cientos de personas comprometidas con hacer la diferencia",
  },
  {
    icon: <Target className="w-6 h-6 text-[var(--bg-white)]" />,
    title: "Impacto Real",
    description: "Cada contribución llega directamente a quienes más lo necesitan",
  },
  {
    icon: <Heart className="w-6 h-6 text-[var(--bg-white)] fill-white" />,
    title: "Transparencia Total",
    description: "Conoce exactamente cómo se utilizan tus donaciones",
  },
];

export const benefits = benefitsData;