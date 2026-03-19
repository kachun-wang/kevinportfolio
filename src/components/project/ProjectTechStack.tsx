"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProjectTechStackProps {
  tech: string[];
  variant?: "grid" | "pills" | "compact";
}

// Map of tech names to their icon URLs and brand colors
const techIcons: Record<string, { icon: string; color: string }> = {
  // Languages
  Python: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    color: "59, 130, 246",
  },
  TypeScript: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    color: "49, 120, 198",
  },
  JavaScript: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    color: "247, 223, 30",
  },
  Go: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg",
    color: "0, 173, 216",
  },
  Rust: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg",
    color: "183, 65, 14",
  },

  // ML/AI
  PyTorch: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg",
    color: "238, 76, 44",
  },
  TensorFlow: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg",
    color: "255, 111, 0",
  },
  "scikit-learn": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg",
    color: "242, 148, 0",
  },
  Transformers: {
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/huggingface.svg",
    color: "255, 210, 30",
  },
  LangChain: {
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/langchain.svg",
    color: "31, 186, 154",
  },
  OpenAI: {
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg",
    color: "0, 0, 0",
  },
  LLaMA: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg",
    color: "102, 51, 153",
  },
  "GPT-4": {
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg",
    color: "0, 0, 0",
  },
  ONNX: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/onnx/onnx-original.svg",
    color: "0, 0, 0",
  },
  MLflow: {
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/mlflow.svg",
    color: "1, 148, 226",
  },
  Optuna: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    color: "51, 122, 183",
  },
  "Ray Tune": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    color: "0, 150, 199",
  },
  XGBoost: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    color: "230, 92, 0",
  },

  // Backend
  FastAPI: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
    color: "5, 150, 105",
  },
  Flask: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg",
    color: "148, 163, 184",
  },
  Django: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg",
    color: "9, 46, 32",
  },
  "Node.js": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    color: "34, 197, 94",
  },
  Express: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
    color: "128, 128, 128",
  },

  // Frontend
  React: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    color: "97, 218, 251",
  },
  "Next.js": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    color: "255, 255, 255",
  },
  "Tailwind CSS": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    color: "56, 189, 248",
  },
  "Three.js": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg",
    color: "255, 255, 255",
  },
  "Framer Motion": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg",
    color: "187, 77, 255",
  },
  Recharts: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    color: "139, 92, 246",
  },

  // Services & Platforms
  Supabase: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
    color: "62, 207, 142",
  },
  Stripe: {
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/stripe.svg",
    color: "99, 91, 255",
  },
  PostHog: {
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/posthog.svg",
    color: "255, 200, 0",
  },
  FFmpeg: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ffmpeg/ffmpeg-original.svg",
    color: "0, 127, 0",
  },
  tRPC: {
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/trpc.svg",
    color: "56, 189, 248",
  },
  Prisma: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg",
    color: "45, 212, 191",
  },
  Vite: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
    color: "149, 97, 255",
  },

  // Data
  PostgreSQL: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    color: "51, 103, 145",
  },
  Redis: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
    color: "220, 64, 50",
  },
  MongoDB: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
    color: "77, 179, 61",
  },
  Elasticsearch: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/elasticsearch/elasticsearch-original.svg",
    color: "255, 215, 0",
  },
  Neo4j: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/neo4j/neo4j-original.svg",
    color: "0, 140, 186",
  },
  Kafka: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg",
    color: "35, 31, 32",
  },
  Snowflake: {
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/snowflake.svg",
    color: "41, 181, 232",
  },
  InfluxDB: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/influxdb/influxdb-original.svg",
    color: "34, 174, 230",
  },
  ClickHouse: {
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/clickhouse.svg",
    color: "255, 204, 1",
  },
  Pinecone: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    color: "0, 0, 0",
  },
  Qdrant: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    color: "220, 64, 50",
  },
  MinIO: {
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/minio.svg",
    color: "195, 47, 39",
  },

  // Cloud & DevOps
  AWS: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    color: "255, 153, 0",
  },
  GCP: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg",
    color: "66, 133, 244",
  },
  Azure: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
    color: "0, 127, 255",
  },
  Docker: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    color: "33, 150, 243",
  },
  Kubernetes: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg",
    color: "50, 108, 229",
  },
  Terraform: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg",
    color: "98, 71, 178",
  },
  ArgoCD: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/argocd/argocd-original.svg",
    color: "239, 124, 68",
  },
  Prometheus: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prometheus/prometheus-original.svg",
    color: "230, 82, 43",
  },
  Grafana: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original.svg",
    color: "240, 148, 29",
  },
  Nginx: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg",
    color: "0, 150, 57",
  },
  Vercel: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
    color: "255, 255, 255",
  },
  "GitHub Actions": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg",
    color: "33, 150, 243",
  },
  S3: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    color: "230, 92, 0",
  },

  // Processing
  Ray: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    color: "0, 150, 199",
  },
  "Apache Flink": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apacheflink/apacheflink-original.svg",
    color: "227, 61, 121",
  },
  Triton: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nvidia/nvidia-original.svg",
    color: "118, 185, 0",
  },
  TensorRT: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nvidia/nvidia-original.svg",
    color: "118, 185, 0",
  },
  "NVIDIA Jetson": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nvidia/nvidia-original.svg",
    color: "118, 185, 0",
  },
  "NVIDIA DeepStream": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nvidia/nvidia-original.svg",
    color: "118, 185, 0",
  },

  // Computer Vision
  YOLOv8: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg",
    color: "255, 107, 107",
  },
  TrOCR: {
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/huggingface.svg",
    color: "255, 210, 30",
  },
  LayoutLM: {
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/huggingface.svg",
    color: "255, 210, 30",
  },
  DeepSORT: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg",
    color: "34, 197, 94",
  },
  "Stable Diffusion": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg",
    color: "161, 98, 232",
  },

  // NLP
  spaCy: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    color: "9, 168, 224",
  },
  Whisper: {
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg",
    color: "0, 0, 0",
  },
  NLLB: {
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/meta.svg",
    color: "0, 102, 255",
  },
  pyannote: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    color: "139, 92, 246",
  },
  "Sentence Transformers": {
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/huggingface.svg",
    color: "255, 210, 30",
  },
  CodeLLaMA: {
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/meta.svg",
    color: "0, 102, 255",
  },

  // Tools
  WebSocket: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    color: "255, 107, 107",
  },
  WebRTC: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/webrtc/webrtc-original.svg",
    color: "51, 122, 183",
  },
  RabbitMQ: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rabbitmq/rabbitmq-original.svg",
    color: "255, 102, 0",
  },
  Stan: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/r/r-original.svg",
    color: "178, 24, 43",
  },
  Feast: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    color: "224, 177, 66",
  },
  "Tree-sitter": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg",
    color: "255, 255, 255",
  },
  "PyTorch Geometric": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg",
    color: "238, 76, 44",
  },
};

// Default icon for unknown tech
const defaultIcon = {
  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/devicon/devicon-original.svg",
  color: "128, 128, 128",
};

function getTechInfo(techName: string) {
  return techIcons[techName] || defaultIcon;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 20,
    },
  },
};

export function ProjectTechStack({
  tech,
  variant = "pills",
}: ProjectTechStackProps) {
  if (tech.length === 0) return null;

  if (variant === "grid") {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
      >
        {tech.map((techName) => {
          const info = getTechInfo(techName);
          return (
            <motion.div
              key={techName}
              variants={itemVariants}
              className={cn(
                "group flex flex-col items-center gap-2 rounded-xl p-3",
                "border border-white/10 bg-black/30 backdrop-blur-sm",
                "transition-all duration-300",
                "hover:border-white/20 hover:bg-black/40"
              )}
              style={{
                boxShadow: `0 0 0 rgba(${info.color}, 0)`,
              }}
              whileHover={{
                boxShadow: `0 0 20px rgba(${info.color}, 0.3)`,
              }}
            >
              <div className="relative h-8 w-8 transition-transform duration-300 group-hover:scale-110">
                <img
                  src={info.icon}
                  alt={techName}
                  className="h-full w-full object-contain"
                  loading="lazy"
                />
              </div>
              <span className="text-center text-xs font-medium text-white/60 transition-colors group-hover:text-white/90">
                {techName}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="flex flex-wrap gap-1.5">
        {tech.map((techName) => (
          <span
            key={techName}
            className={cn(
              "rounded-full border border-white/10 bg-white/5 px-2 py-0.5",
              "text-xs font-medium text-white/60"
            )}
          >
            {techName}
          </span>
        ))}
      </div>
    );
  }

  // Default: pills with icons (horizontal scroll)
  return (
    <div className="scrollbar-hide -mx-4 overflow-x-auto px-4 sm:mx-0 sm:overflow-visible sm:px-0">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex gap-2 sm:flex-wrap"
      >
        {tech.map((techName) => {
          const info = getTechInfo(techName);
          return (
            <motion.div
              key={techName}
              variants={itemVariants}
              className={cn(
                "group flex flex-shrink-0 items-center gap-2 rounded-full px-3 py-1.5",
                "border border-white/10 bg-black/30 backdrop-blur-sm",
                "transition-all duration-300",
                "hover:border-white/20 hover:bg-black/40"
              )}
              whileHover={{
                boxShadow: `0 0 15px rgba(${info.color}, 0.25)`,
              }}
            >
              <div className="relative h-4 w-4 transition-transform duration-300 group-hover:scale-110">
                <img
                  src={info.icon}
                  alt={techName}
                  className="h-full w-full object-contain"
                  loading="lazy"
                />
              </div>
              <span className="whitespace-nowrap text-xs font-medium text-white/70 transition-colors group-hover:text-white">
                {techName}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
