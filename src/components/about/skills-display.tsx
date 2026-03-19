"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  type Variants,
} from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// Tech stack data with official icon URLs
interface TechItem {
  name: string;
  icon: string;
  brandColor: string;
}

interface TechCategory {
  id: string;
  title: string;
  gradient: string;
  items: TechItem[];
}

const techStack: TechCategory[] = [
  {
    id: "languages",
    title: "Languages & Core",
    gradient: "from-yellow-400 to-blue-500",
    items: [
      {
        name: "Python",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
        brandColor: "59, 130, 246",
      },
      {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
        brandColor: "49, 120, 198",
      },
      {
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
        brandColor: "247, 223, 30",
      },
      {
        name: "Node.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
        brandColor: "34, 197, 94",
      },
      {
        name: "Go",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg",
        brandColor: "0, 173, 216",
      },
      {
        name: "Rust",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg",
        brandColor: "206, 145, 120",
      },
    ],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    gradient: "from-emerald-400 to-cyan-500",
    items: [
      {
        name: "FastAPI",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
        brandColor: "5, 150, 105",
      },
      {
        name: "Flask",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg",
        brandColor: "148, 163, 184",
      },
      {
        name: "Express.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
        brandColor: "148, 163, 184",
      },
      {
        name: "GraphQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg",
        brandColor: "229, 53, 171",
      },
      {
        name: "tRPC",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/trpc/trpc-original.svg",
        brandColor: "56, 189, 248",
      },
      {
        name: "Prisma",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg",
        brandColor: "45, 212, 191",
      },
    ],
  },
  {
    id: "ai-ml",
    title: "AI / Machine Learning",
    gradient: "from-orange-500 to-red-500",
    items: [
      {
        name: "PyTorch",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg",
        brandColor: "238, 76, 44",
      },
      {
        name: "OpenAI",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg",
        brandColor: "168, 85, 247",
      },
      {
        name: "Hugging Face",
        icon: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg",
        brandColor: "255, 210, 30",
      },
      {
        name: "TensorFlow",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg",
        brandColor: "255, 109, 0",
      },
      {
        name: "scikit-learn",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg",
        brandColor: "249, 115, 22",
      },
      {
        name: "MLflow",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/mlflow.svg",
        brandColor: "1, 148, 226",
      },
    ],
  },
  {
    id: "frontend",
    title: "Frontend & Design",
    gradient: "from-cyan-400 to-blue-500",
    items: [
      {
        name: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
        brandColor: "97, 218, 251",
      },
      {
        name: "Next.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
        brandColor: "255, 255, 255",
      },
      {
        name: "Tailwind CSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
        brandColor: "56, 189, 248",
      },
      {
        name: "Three.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg",
        brandColor: "255, 255, 255",
      },
      {
        name: "Framer Motion",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg",
        brandColor: "187, 77, 255",
      },
      {
        name: "Vite",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
        brandColor: "189, 52, 254",
      },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    gradient: "from-orange-400 to-amber-500",
    items: [
      {
        name: "AWS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
        brandColor: "255, 153, 0",
      },
      {
        name: "Docker",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
        brandColor: "33, 150, 243",
      },
      {
        name: "Kubernetes",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg",
        brandColor: "50, 108, 229",
      },
      {
        name: "Vercel",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
        brandColor: "255, 255, 255",
      },
      {
        name: "Nginx",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg",
        brandColor: "0, 150, 57",
      },
      {
        name: "GitHub Actions",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg",
        brandColor: "33, 150, 243",
      },
    ],
  },
  {
    id: "tools",
    title: "Tools & Integrations",
    gradient: "from-purple-400 to-pink-500",
    items: [
      {
        name: "Git",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
        brandColor: "240, 80, 51",
      },
      {
        name: "MongoDB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
        brandColor: "71, 162, 72",
      },
      {
        name: "PostgreSQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
        brandColor: "51, 103, 145",
      },
      {
        name: "Redis",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
        brandColor: "220, 47, 2",
      },
      {
        name: "VAPI",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/v.svg",
        brandColor: "139, 92, 246",
      },
      {
        name: "GoHighLevel",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/googleanalytics.svg",
        brandColor: "34, 197, 94",
      },
    ],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
};

const contentVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

function TechCard({ item }: { item: TechItem }) {
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 20, y: -x * 20 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      variants={itemVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
        boxShadow: isHovered
          ? `0 0 30px rgba(${item.brandColor}, 0.4), 0 10px 40px rgba(0, 0, 0, 0.3)`
          : "0 4px 20px rgba(0, 0, 0, 0.2)",
      }}
      className={cn(
        "group relative flex flex-col items-center justify-center",
        "rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md",
        "p-4 sm:p-5",
        "transition-all duration-300 ease-out",
        "hover:border-white/30 hover:bg-white/15",
        "cursor-pointer"
      )}
    >
      {/* Glow effect on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at center, rgba(${item.brandColor}, 0.15) 0%, transparent 70%)`,
        }}
      />

      {/* Icon */}
      <div className="relative mb-3 h-14 w-14 sm:h-16 sm:w-16">
        <img
          src={item.icon}
          alt={item.name}
          className="h-full w-full object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* Name */}
      <span className="text-center text-xs font-medium text-white/90 transition-colors duration-300 group-hover:text-white sm:text-sm">
        {item.name}
      </span>
    </motion.div>
  );
}

function TabButton({
  category,
  isActive,
  onClick,
}: {
  category: TechCategory;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 sm:px-6 sm:py-3",
        "border backdrop-blur-md",
        isActive
          ? "border-transparent bg-black/50 text-white"
          : "border-white/10 bg-black/30 text-white/60 hover:border-white/20 hover:bg-black/40 hover:text-white/80"
      )}
    >
      {/* Active indicator with gradient border */}
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "linear-gradient(135deg, rgba(6, 182, 212, 0.3) 0%, rgba(168, 85, 247, 0.3) 100%)",
            padding: "1px",
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
        >
          <div className="h-full w-full rounded-full bg-black/80" />
        </motion.div>
      )}

      {/* Gradient underline for active tab */}
      {isActive && (
        <motion.div
          layoutId="activeUnderline"
          className="absolute -bottom-1 left-1/2 h-0.5 w-3/4 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
        />
      )}

      <span className="relative z-10">{category.title}</span>
    </button>
  );
}

function TechGrid({ category }: { category: TechCategory }) {
  return (
    <motion.div
      key={category.id}
      variants={contentVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full"
    >
      {/* Category gradient label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 flex items-center justify-center gap-3"
      >
        <div
          className={cn(
            "h-px w-12 bg-gradient-to-r opacity-50 sm:w-20",
            category.gradient
          )}
        />
        <span
          className={cn(
            "bg-gradient-to-r bg-clip-text text-xs font-semibold uppercase tracking-widest text-transparent sm:text-sm",
            category.gradient
          )}
        >
          {category.title}
        </span>
        <div
          className={cn(
            "h-px w-12 bg-gradient-to-l opacity-50 sm:w-20",
            category.gradient
          )}
        />
      </motion.div>

      {/* Tech Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6 lg:gap-6"
      >
        {category.items.map((item) => (
          <TechCard key={item.name} item={item} />
        ))}
      </motion.div>
    </motion.div>
  );
}

export function SkillsDisplay() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState("ai-ml"); // Default to AI/ML

  const activeCategory =
    techStack.find((cat) => cat.id === activeTab) || techStack[2];

  return (
    <div ref={ref} className="space-y-8">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2"
        >
          <Sparkles className="h-4 w-4 text-purple-400" />
          <span className="text-sm font-medium text-purple-300">
            Tech Stack
          </span>
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl font-bold text-white sm:text-3xl"
        >
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Technical Arsenal
          </span>
        </motion.h3>
      </motion.div>

      {/* Tabs Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative"
      >
        {/* Scrollable tabs wrapper */}
        <div className="scrollbar-hide -mx-4 overflow-x-auto overflow-y-hidden px-4 sm:mx-0 sm:overflow-visible sm:px-0 [contain:inline-size]">
          <div className="flex min-w-max justify-start gap-2 pb-2 sm:flex-wrap sm:justify-center sm:gap-3">
            {techStack.map((category) => (
              <TabButton
                key={category.id}
                category={category}
                isActive={activeTab === category.id}
                onClick={() => setActiveTab(category.id)}
              />
            ))}
          </div>
        </div>

        {/* Fade edges for mobile scroll indication */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-slate-950 to-transparent sm:hidden" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-slate-950 to-transparent sm:hidden" />
      </motion.div>

      {/* Content Panel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="min-h-[300px] rounded-3xl border border-white/5 bg-white/[0.02] p-4 sm:p-6 md:p-8"
      >
        <AnimatePresence mode="wait">
          <TechGrid key={activeTab} category={activeCategory} />
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
