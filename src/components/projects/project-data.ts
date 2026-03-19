export interface Project {
  id: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  image: string;
  technologies: string[];
  color: string;
  link?: string;
  github?: string;
  caseStudy?: {
    challenge: string;
    solution: string;
    results: string[];
  };
}

export const projects: Project[] = [
  {
    id: "ai-forecast",
    title: "Demand Forecasting AI",
    description:
      "Production ML pipeline for retail demand prediction using transformer-based time series models with real-time feature engineering.",
    metric: "+20%",
    metricLabel: "Forecast Accuracy",
    image: "/projects/forecast.jpg",
    technologies: ["PyTorch", "FastAPI", "PostgreSQL", "AWS", "Docker"],
    color: "#8b5cf6",
    caseStudy: {
      challenge:
        "Legacy system had 65% accuracy, causing $2M annual overstock losses",
      solution:
        "Built custom transformer architecture with attention mechanisms for multi-horizon forecasting",
      results: [
        "Achieved 85% forecast accuracy",
        "Reduced overstock by 40%",
        "Saved $800K annually",
        "Real-time predictions under 100ms",
      ],
    },
  },
  {
    id: "llm-assistant",
    title: "Enterprise RAG System",
    description:
      "Custom knowledge retrieval system with fine-tuned embeddings, semantic search, and multi-modal document processing.",
    metric: "1M+",
    metricLabel: "Queries/Month",
    image: "/projects/rag.jpg",
    technologies: ["LangChain", "OpenAI", "Pinecone", "Next.js", "Python"],
    color: "#06b6d4",
    caseStudy: {
      challenge:
        "Customer support team spending 40% time searching documentation",
      solution:
        "Developed RAG pipeline with custom chunking strategies and re-ranking",
      results: [
        "95% query relevance score",
        "60% reduction in search time",
        "Handles 1M+ queries monthly",
        "Multi-language support",
      ],
    },
  },
  {
    id: "anomaly-detection",
    title: "Real-time Anomaly Detection",
    description:
      "Streaming ML system for detecting infrastructure anomalies with sub-second latency using autoencoders and statistical methods.",
    metric: "99.7%",
    metricLabel: "Detection Rate",
    image: "/projects/anomaly.jpg",
    technologies: ["Kafka", "TensorFlow", "InfluxDB", "Grafana", "K8s"],
    color: "#ec4899",
    caseStudy: {
      challenge: "Manual monitoring missing 30% of critical incidents",
      solution:
        "Built streaming anomaly detector with ensemble of LSTM autoencoders",
      results: [
        "99.7% anomaly detection rate",
        "< 500ms detection latency",
        "Reduced incidents by 45%",
        "MTTR improved by 60%",
      ],
    },
  },
  {
    id: "recommendation-engine",
    title: "Personalization Engine",
    description:
      "Hybrid recommendation system combining collaborative filtering, content-based, and deep learning approaches for e-commerce.",
    metric: "+35%",
    metricLabel: "Conversion Rate",
    image: "/projects/recommend.jpg",
    technologies: ["Python", "Spark", "Redis", "TensorFlow", "GCP"],
    color: "#f59e0b",
    caseStudy: {
      challenge: "Static recommendations with 2% CTR",
      solution:
        "Two-tower neural network with real-time feature serving and A/B testing framework",
      results: [
        "35% increase in conversions",
        "CTR improved to 8%",
        "$5M additional revenue",
        "200ms p99 latency",
      ],
    },
  },
  {
    id: "nlp-analytics",
    title: "Sentiment Analytics Platform",
    description:
      "Multi-language NLP pipeline for brand sentiment analysis across social media, reviews, and support tickets.",
    metric: "50M+",
    metricLabel: "Documents/Day",
    image: "/projects/sentiment.jpg",
    technologies: ["Transformers", "FastAPI", "Elasticsearch", "React", "AWS"],
    color: "#10b981",
    caseStudy: {
      challenge: "No visibility into customer sentiment across channels",
      solution:
        "Fine-tuned multilingual BERT with aspect-based sentiment extraction",
      results: [
        "Processes 50M+ documents daily",
        "92% sentiment accuracy",
        "15 language support",
        "Real-time dashboard",
      ],
    },
  },
  {
    id: "computer-vision",
    title: "Visual Quality Inspector",
    description:
      "Computer vision system for manufacturing defect detection with edge deployment and automated quality control.",
    metric: "99.5%",
    metricLabel: "Accuracy",
    image: "/projects/vision.jpg",
    technologies: ["PyTorch", "ONNX", "OpenCV", "NVIDIA", "C++"],
    color: "#6366f1",
    caseStudy: {
      challenge: "Manual inspection missing 5% of defects, 200 items/hour",
      solution: "Custom CNN with attention mechanisms deployed on edge devices",
      results: [
        "99.5% defect detection",
        "2000 items/hour throughput",
        "80% reduction in QA costs",
        "< 50ms inference time",
      ],
    },
  },
];
