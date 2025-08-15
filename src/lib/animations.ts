import { useReducedMotion } from "framer-motion";

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1
    }
  }
};

export const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 80
    }
  }
};

export const textRevealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const slideUpVariants = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Performance-optimized variants that respect reduced motion preferences
export const useOptimizedVariants = () => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return {
      containerVariants: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } }
      },
      itemVariants: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } }
      },
      textRevealVariants: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } }
      }
    };
  }

  return { containerVariants, itemVariants, textRevealVariants };
};
