import type { Project } from "@/types/project";

// Real projects portfolio - 16 projects with actual implementations
export const projects: Project[] = [
  {
    title: "Zitro.AI — AI-Powered Creator Studio",
    slug: "zitro-ai",
    impact: "Viral clips from scripts, no editing experience required",
    description:
      "AI-powered creator studio for generating viral video clips from scripts (Dec 2025 – Feb 2026). Built with Next.js, TypeScript, and modern AI tools. Features automated video generation, script-to-clip conversion, and content optimization for social media platforms. Designed for creators who want professional results without video editing experience.",
    defaultImage: "/projects/zitro-ai/hero.png",
    gallery: [
      "/projects/zitro-ai/hero.png",
      "/projects/zitro-ai/gallery-1.png",
      "/projects/zitro-ai/gallery-2.png",
    ],
    technicalHighlights: [
      "AI-powered video generation pipeline with script analysis and scene composition",
      "Real-time preview system with Next.js and TypeScript for instant feedback",
      "Automated content optimization for different social media platforms and formats",
    ],
    challengesSolutions: [
      "Complex video generation → Built modular pipeline with AI-driven scene composition and transitions",
      "Platform-specific optimization → Implemented adaptive rendering for different aspect ratios and durations",
    ],
    links: [{ label: "Live App", url: "https://zitro.ai" }],
    categories: ["AI/ML", "Full-Stack Application"],
    techStack: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "AI/ML",
      "Git/GitHub",
    ],
    year: 2026,
  },
  {
    title:
      "Open Recommender — Open Source AI Recommendation System for Videos & Articles",
    slug: "open-recommender",
    impact: "Self-hosted AI that learns your interests for timeless content",
    description:
      "Open source AI-powered recommendation system for YouTube videos and articles (Dec 2023 – Feb 2024). Uses LLMs to learn from your interests and surface timeless, learning-focused content. Self-hosted solution built with TypeScript and Python, featuring tRPC for type-safe APIs and Prisma for database management.",
    defaultImage: "/projects/open-recommender/hero.png",
    gallery: ["/projects/open-recommender/hero.png"],
    technicalHighlights: [
      "Backend built with Node.js, tRPC for end-to-end type safety, and Prisma ORM for database operations",
      "Python workers for AI processing with Modelfusion, LangChain, and OpenAI-compatible APIs",
      "React + TypeScript frontend with seamless integration to type-safe backend APIs",
      "Content ingestion from YouTube (via yt-dlp), Twitter/X (optional), and web search",
    ],
    challengesSolutions: [
      "Learning user preferences → Implemented LLM-based interest modeling that adapts to user behavior over time",
      "Content quality filtering → Built AI pipeline to prioritize timeless, educational content over viral trends",
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/kevindev523/open-recommender",
      },
    ],
    categories: ["AI/ML", "LLM Integration", "Full-Stack Application"],
    techStack: [
      "Node.js",
      "TypeScript",
      "React",
      "tRPC",
      "Prisma",
      "Python",
      "LangChain",
      "OpenAI",
      "Git/GitHub",
    ],
    year: 2024,
  },
  {
    title: "End-to-End Demand Forecasting and Inventory Optimization",
    slug: "demand-forecasting-inventory",
    impact: "Multi-modal ML pipeline with uncertainty-aware forecasting",
    description:
      "End-to-end demand forecasting and inventory optimization with Databricks (Nov 2024 – Jan 2025) - multi-modal ML (time series, images, tabular), LightGBM, MAPIE conformal prediction and MLOps for retail and fashion. Implements full pipeline on Databricks with uncertainty-aware forecasting, drift monitoring, and inventory dashboards.",
    defaultImage: "/projects/demand-forecasting-inventory/hero.png",
    gallery: [
      "/projects/demand-forecasting-inventory/hero.png",
      "/projects/demand-forecasting-inventory/forecast-error-monitoring.png",
      "/projects/demand-forecasting-inventory/inventory-monitoring.png",
      "/projects/demand-forecasting-inventory/dataset-drift.png",
      "/projects/demand-forecasting-inventory/data-quality-tests.png",
      "/projects/demand-forecasting-inventory/drift-tests.png",
    ],
    technicalHighlights: [
      "Multi-modal ML pipeline: time series, images (imgbeddings), and tabular data on Databricks",
      "Forecasting with Nixtla MLForecast and LightGBM; uncertainty quantification via MAPIE conformal prediction",
      "MLOps: Evidently AI for drift monitoring, MLflow for model registry and serving, Unity Catalog",
      "Bronze-Silver-Gold data architecture with Delta Lake for sales, price, weather, trends, and inventory",
    ],
    challengesSolutions: [
      "Uncertainty in forecasts → Implemented MAPIE conformal prediction for prediction intervals",
      "Multi-modal data integration → Built unified pipeline combining time series, images, and tabular features",
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/kevindev523/End-to-end_Demand_forecasting_inventory_optimization",
      },
    ],
    categories: ["AI/ML", "Forecasting/Time-Series", "MLOps/Deployment"],
    techStack: [
      "Python",
      "Databricks",
      "PySpark",
      "LightGBM",
      "MLflow",
      "Delta Lake",
      "Evidently AI",
      "Git/GitHub",
    ],
    year: 2025,
  },
  {
    title: "UNMISSABLERP — FiveM GTA RP Community Website",
    slug: "unmissablerp",
    impact: "Modern community platform with live stats and whitelist system",
    description:
      "Official website for UNMISSABLERP - a FiveM GTA RP community (Oct 2025 – Nov 2025). Built with Next.js, TypeScript, and Tailwind CSS. Features whitelist applications with validation, live server stats dashboard with 10s polling, server assets management (scripts, MLOs, vehicles), Discord integration, and store placeholder. Designed for serious roleplay communities with curated whitelist and player-driven economy.",
    defaultImage: "/projects/unmissablerp/hero.png",
    gallery: [
      "/projects/unmissablerp/hero.png",
      "/projects/unmissablerp/store.png",
      "/projects/unmissablerp/dashboard.png",
    ],
    technicalHighlights: [
      "Next.js 14 App Router with TypeScript, Tailwind CSS, and Framer Motion animations",
      "Whitelist application system with React Hook Form + Zod validation (client + server)",
      "Live stats dashboard with SWR polling (10s intervals), Recharts visualizations, and real-time player count",
      "Server assets management for scripts, MLOs, and vehicles with filtering and OneDrive sync placeholder",
    ],
    challengesSolutions: [
      "Real-time data updates → Implemented SWR with 10-second polling for live player stats and server metrics",
      "Form validation and security → Built dual-layer validation with Zod schemas on client and server",
    ],
    links: [
      { label: "Live App", url: "https://unmissablerp.vercel.app" },
      { label: "GitHub", url: "https://github.com/kevindev523/unmissablerp" },
    ],
    categories: ["Full-Stack Application"],
    techStack: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "SWR",
      "Recharts",
      "Zod",
      "Vercel",
      "Git/GitHub",
    ],
    year: 2025,
  },
  {
    title: "Customer Segmentation with KMeans Clustering",
    slug: "customer-segmentation-kmeans",
    impact: "Interactive ML pipeline for customer behavior analysis",
    description:
      "Customer segmentation using KMeans clustering in Python (Nov 2024 – Mar 2025). Includes data preprocessing, Silhouette evaluation, PCA visualization and an interactive Streamlit dashboard. Complete unsupervised machine learning pipeline for segmenting customers with real-time cluster exploration and marketing analytics insights.",
    defaultImage: "/projects/customer-segmentation-kmeans/dashboard.png",
    gallery: [
      "/projects/customer-segmentation-kmeans/dashboard.png",
      "/projects/customer-segmentation-kmeans/dashboard1.png",
      "/projects/customer-segmentation-kmeans/clustering.png",
    ],
    technicalHighlights: [
      "Data preprocessing with StandardScaler and LabelEncoder for cleaning, encoding, and scaling customer data",
      "KMeans clustering with Silhouette Score evaluation for optimal cluster quality assessment",
      "PCA dimensionality reduction for 2D cluster visualization with Matplotlib and Seaborn",
      "Interactive Streamlit dashboard for real-time data exploration and dynamic cluster count adjustment",
    ],
    challengesSolutions: [
      "Optimal cluster selection → Implemented Silhouette Score evaluation to measure cluster cohesion and separation",
      "High-dimensional data visualization → Applied PCA for dimensionality reduction to create interpretable 2D plots",
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/kevindev523/customer-segmentation-project",
      },
    ],
    categories: ["AI/ML", "Predictive Modeling"],
    techStack: [
      "Python",
      "scikit-learn",
      "Streamlit",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "Git/GitHub",
    ],
    year: 2025,
  },
  {
    title:
      "Argo CD Kubernetes Rollout Patterns — Blue-Green & Canary Deployments",
    slug: "argocd-k8s-rollout-patterns",
    impact: "Progressive delivery with automated rollbacks and traffic control",
    description:
      "Progressive delivery on Kubernetes with Argo CD and Argo Rollouts (Sep 2024 – Dec 2024): Blue-Green and Canary deployment examples and manifests. GitOps-driven deployment strategies with ready-to-use Kubernetes manifests for safe releases, automated rollbacks, and gradual traffic shifting. Production-ready patterns for modern cloud-native deployments.",
    defaultImage: "/projects/argocd-k8s-rollout-patterns/hero.png",
    gallery: [
      "/projects/argocd-k8s-rollout-patterns/hero.png",
      "/projects/argocd-k8s-rollout-patterns/blue-green.png",
      "/projects/argocd-k8s-rollout-patterns/canary.png",
    ],
    technicalHighlights: [
      "Blue-Green deployments with active/preview services for instant rollback and zero-downtime releases",
      "Canary deployments with gradual traffic shifting (20% → 50% → 100%) and configurable pause steps",
      "GitOps workflow using Argo CD for declarative sync from Git with Argo Rollouts CRDs",
      "Kubernetes-native manifests with Services, Ingress, and AnalysisTemplates for automated health checks",
    ],
    challengesSolutions: [
      "Safe production releases → Implemented progressive delivery patterns with automated rollback on failure",
      "Traffic management complexity → Used Argo Rollouts for declarative traffic splitting with pause controls",
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/kevindev523/argocd-k8s-rollout-patterns",
      },
    ],
    categories: ["MLOps/Deployment"],
    techStack: [
      "Kubernetes",
      "Argo CD",
      "Argo Rollouts",
      "Docker",
      "Git/GitHub",
    ],
    year: 2024,
  },
  {
    title: "E2E AI Chatbot — Document Q&A with Local LLM",
    slug: "e2e-ai-chatbot",
    impact: "Offline AI chatbot with 0.5s response time using Redis caching",
    description:
      "End-to-end AI chatbot for document Q&A (Oct 2023 – Feb 2024). Local LLM (GPT4All), FastAPI, Gradio, MongoDB, Elasticsearch, Redis. RAG over your PDFs - runs completely offline. Production-ready system with full-text search, chat history caching, and document ingestion pipeline. Reduced response time from 97s to 0.5s with Redis caching.",
    defaultImage: "/projects/e2e-ai-chatbot/hero.png",
    gallery: [
      "/projects/e2e-ai-chatbot/hero.png",
      "/projects/e2e-ai-chatbot/architecture.png",
      "/projects/e2e-ai-chatbot/chat-interface.png",
      "/projects/e2e-ai-chatbot/mongo-express.png",
      "/projects/e2e-ai-chatbot/mongo-compass.png",
    ],
    technicalHighlights: [
      "Local LLM deployment with GPT4All for offline document Q&A without external API dependencies",
      "RAG (Retrieval-Augmented Generation) pipeline with MongoDB for document storage and Elasticsearch for semantic search",
      "Redis caching layer reducing response time from 97s to 0.5s per question (194x speedup)",
      "Full-stack architecture: FastAPI backend, Gradio UI, Nginx reverse proxy, Docker containerization, and Kubernetes orchestration",
    ],
    challengesSolutions: [
      "Slow inference time → Implemented Redis caching for chat history, achieving 194x speedup (97s → 0.5s)",
      "Document ingestion at scale → Built ETL pipeline with Logstash for MongoDB to Elasticsearch data migration",
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/kevindev523/E2E-AI-Chatbot",
      },
      { label: "Website", url: "https://khoivn.space" },
    ],
    categories: ["AI/ML", "LLM Integration", "Full-Stack Application"],
    techStack: [
      "Python",
      "FastAPI",
      "Gradio",
      "GPT4All",
      "MongoDB",
      "Elasticsearch",
      "Redis",
      "Docker",
      "Kubernetes",
      "Nginx",
      "Git/GitHub",
    ],
    year: 2024,
  },
  {
    title: "Rule-based LLMs — AI Chatbot with IBM Decision Services",
    slug: "rule-based-llms",
    impact: "Accurate, policy-driven AI with rule engine integration",
    description:
      "Integrate Large Language Models with IBM ODM/ADS rule engines (Oct 2024 – Feb 2025). Chatbot demo combining LLM intelligence with business rules for reliable, compliant answers. Supports dual LLM backends (Ollama local, IBM Watsonx.ai cloud), LangChain orchestration, and Docker deployment. HR automation demo shows rule-based accuracy for vacation policies.",
    defaultImage: "/projects/rule-based-llms/architecture.png",
    gallery: [
      "/projects/rule-based-llms/architecture.png",
      "/projects/rule-based-llms/rancher-desktop.png",
      "/projects/rule-based-llms/hr-policy.gif",
    ],
    technicalHighlights: [
      "Dual LLM backend support: Ollama (local) and IBM Watsonx.ai (cloud) with seamless switching",
      "LangChain-based Python backend orchestrating LLM calls and IBM ODM/ADS decision service integration",
      "React + TypeScript + Vite frontend with Carbon Design System for modern chatbot UI",
      "Docker-based deployment with docker-compose for ODM, backend, and frontend services",
    ],
    challengesSolutions: [
      "LLM hallucinations on policy questions → Integrated IBM ODM/ADS rule engines for accurate, compliant answers",
      "Complex deployment → Containerized entire stack with Docker Compose for one-command setup",
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/kevindev523/rule-based-llms",
      },
    ],
    categories: ["AI/ML", "LLM Integration", "Full-Stack Application"],
    techStack: [
      "Python",
      "LangChain",
      "React",
      "TypeScript",
      "Vite",
      "IBM ODM",
      "IBM ADS",
      "Ollama",
      "IBM Watsonx",
      "Docker",
      "Flask",
      "Git/GitHub",
    ],
    year: 2025,
  },
  {
    title: "X (Twitter) Customer Support Chatbot — RAG-Powered AI Assistant",
    slug: "x-customer-support-chatbot",
    impact: "Sub-50ms retrieval with FAISS semantic search",
    description:
      "RAG-powered AI chatbot for Twitter/X customer support (Apr 2025 – Jun 2025). LangChain + FAISS + GPT-4 + Streamlit. Semantic search over support docs with 384-dim embeddings (all-MiniLM-L6-v2) for accurate, context-aware answers. Features conversation memory, multi-style prompts, and exponential backoff retry logic. Built for Twitter/X support automation with account access, security, and recovery assistance.",
    defaultImage: "/projects/x-customer-support-chatbot/hero.png",
    gallery: [
      "/projects/x-customer-support-chatbot/hero.png",
      "/projects/x-customer-support-chatbot/delete-account.png",
      "/projects/x-customer-support-chatbot/recover-account.png",
    ],
    technicalHighlights: [
      "Sub-50ms retrieval with FAISS IndexFlatL2 over 384-dimensional embeddings (all-MiniLM-L6-v2)",
      "RAG pipeline: Retrieve relevant support docs → GPT-4 generates natural-language answers with conversation memory",
      "LangChain orchestration with last 3 turns memory for follow-up questions and context awareness",
      "Streamlit chat UI with session state, example questions sidebar, and multi-style prompts (expert, technical, concise)",
    ],
    challengesSolutions: [
      "Slow retrieval performance → Implemented FAISS L2 search achieving sub-50ms response times",
      "API rate limits → Added exponential backoff retry logic with hardware-aware batch sizing (CUDA/MPS/CPU)",
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/kevindev523/X-CustomerSupport-Chatbot",
      },
    ],
    categories: ["AI/ML", "LLM Integration", "NLP/Chatbots"],
    techStack: [
      "Python",
      "LangChain",
      "OpenAI",
      "GPT-4",
      "FAISS",
      "Streamlit",
      "SentenceTransformers",
      "spaCy",
      "Git/GitHub",
    ],
    year: 2025,
  },
  {
    title: "AI Medical Chatbot — Healthcare Conversational AI with RAG & LLMs",
    slug: "ai-medical-chatbot",
    impact: "Production-ready healthcare AI with multi-model support",
    description:
      "Production-ready AI medical chatbot for healthcare (Aug 2023 – Nov 2023). IBM WatsonX, OpenAI, RAG, Llama 3, Mixtral. Open-source medical consultation assistant using Retrieval Augmented Generation with multiple foundation models (flan-ul2, mt0-xxl, gpt-neox, Llama 3, GPT-4). Features medical interviewer, fine-tuning pipelines, vector stores (Milvus, FAISS, ChromaDB), and Gradio web UIs. Production setup with pytest, type hints, and Makefile.",
    defaultImage: "/projects/ai-medical-chatbot/watsonx.png",
    gallery: [
      "/projects/ai-medical-chatbot/watsonx.png",
      "/projects/ai-medical-chatbot/consultation.png",
      "/projects/ai-medical-chatbot/consultation-alt.png",
    ],
    technicalHighlights: [
      "Multi-model support: IBM WatsonX (flan-ul2-20b, mt0-xxl-13b, gpt-neox-20b), OpenAI GPT-4/3.5, Meta Llama 3, Mixtral with fine-tuned variants",
      "RAG-powered answers with vector stores (Milvus, FAISS, ChromaDB) for context-aware medical responses",
      "Medical interviewer chatbot conducting structured medical interviews with Gradio web interface",
      "Production-ready codebase with pytest tests, type hints, PEP 8 compliance, Makefile, and optional CI/CD",
    ],
    challengesSolutions: [
      "Medical accuracy concerns → Implemented RAG with vector similarity search for context-grounded responses",
      "Multiple model deployment → Built unified interface supporting WatsonX, OpenAI, and open-source LLMs with seamless switching",
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/kevindev523/ai-medical-chatbot",
      },
      {
        label: "IBM WatsonX.ai",
        url: "https://www.ibm.com/products/watsonx-ai",
      },
    ],
    categories: ["AI/ML", "LLM Integration", "NLP/Chatbots"],
    techStack: [
      "Python",
      "IBM Watsonx",
      "OpenAI",
      "LangChain",
      "Llama 3",
      "Mixtral",
      "Gradio",
      "FAISS",
      "Milvus",
      "ChromaDB",
      "Hugging Face",
      "Git/GitHub",
    ],
    year: 2023,
  },
  {
    title: "Moshi — Speech-Text Foundation Model for Real-Time Voice Dialogue",
    slug: "moshi-voice-assistant",
    impact: "~200ms end-to-end latency with full-duplex voice AI",
    description:
      "Open-source speech-text foundation model for real-time full-duplex voice dialogue (Sep 2024 – Dec 2024). Uses Mimi neural audio codec (24 kHz → 12.5 Hz, 1.1 kbps, 80 ms frames). PyTorch, MLX (Apple Silicon), and Rust backends. Features Moshika (female) and Moshiko (male) voices with multiple quantizations (bf16, int8, int4). 7B-parameter Temporal Transformer with theoretical 160ms latency, practical ~200ms on L4 GPU.",
    defaultImage: "/projects/moshi-voice-assistant/architecture.png",
    gallery: [
      "/projects/moshi-voice-assistant/architecture.png",
      "/projects/moshi-voice-assistant/mimi-codec.png",
    ],
    technicalHighlights: [
      "Mimi neural audio codec: 24 kHz audio → 12.5 Hz representation at 1.1 kbps with 80ms frame latency, fully streaming",
      "Dual audio streams: Models user input and Moshi output simultaneously with inner monologue text prediction for quality",
      "7B-parameter architecture: Depth Transformer for inter-codebook dependencies + Temporal Transformer for time modeling",
      "Multi-backend support: PyTorch, MLX (Apple Silicon M-series), and Rust/Candle with Web UI and CLI clients",
    ],
    challengesSolutions: [
      "High latency in voice AI → Achieved ~200ms end-to-end latency with streaming codec and efficient transformer architecture",
      "Platform compatibility → Built three backends (PyTorch, MLX, Rust) supporting CUDA, Metal, and CPU with quantization options",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/kyutai-labs/moshi" },
      { label: "Hugging Face", url: "https://huggingface.co/kyutai" },
      { label: "Paper", url: "http://kyutai.org/Moshi.pdf" },
    ],
    categories: ["AI/ML", "LLM Integration"],
    techStack: [
      "Python",
      "PyTorch",
      "Rust",
      "MLX",
      "Hugging Face",
      "Transformers",
      "CUDA",
      "Metal",
      "Git/GitHub",
    ],
    year: 2024,
  },
  {
    title: "Salty Dream Bot — Discord AI Image Generator with Stable Diffusion",
    slug: "salty-dream-bot",
    impact: "Async Discord bot with modular cogs architecture",
    description:
      "Python Discord bot for AI image generation via AUTOMATIC1111 Stable Diffusion (Dec 2022 – Mar 2023). Features txt2img, img2img, CLIP/DeepDanbooru interrogation, and PNG info extraction. Built with py-cord, async architecture, and modular cogs. Supports negative prompts, multiple samplers, hypernetworks, custom seeds, and image orientation presets (square, landscape, portrait).",
    defaultImage: "/projects/salty-dream-bot/generated.png",
    gallery: [
      "/projects/salty-dream-bot/generated.png",
      "/projects/salty-dream-bot/interrogated.png",
    ],
    technicalHighlights: [
      "AUTOMATIC1111 Web UI API integration for txt2img, img2img, and interrogation features",
      "Async Discord bot with py-cord supporting negative prompts, samplers, hypernetworks, and seed control",
      "Modular cogs architecture for maintainable code with separate command groups and error handling",
      "Image generation features: orientation presets (square/landscape/portrait), size presets (small/normal/large), and PNG metadata extraction",
    ],
    challengesSolutions: [
      "Bot responsiveness → Implemented async architecture with py-cord for non-blocking image generation",
      "Code maintainability → Used modular cogs pattern for organized command structure and easy feature additions",
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/kevindev523/salty-dream-bot",
      },
    ],
    categories: ["AI/ML", "Full-Stack Application"],
    techStack: [
      "Python",
      "Discord.py",
      "Stable Diffusion",
      "AUTOMATIC1111",
      "py-cord",
      "Git/GitHub",
    ],
    year: 2023,
  },
  {
    title:
      "VALL-E — Zero-Shot Text-to-Speech with Neural Codec Language Models",
    slug: "vall-e-tts",
    impact: "Zero-shot voice cloning from 3-second audio sample",
    description:
      "Unofficial PyTorch implementation of VALL-E for zero-shot text-to-speech and voice cloning (Jan 2023 – Mar 2023). Uses neural codec language models with EnCodec tokenizer to generate high-quality speech matching any speaker's voice from a single 3-second reference audio. Features autoregressive (AR) and non-autoregressive (NAR) transformer architectures with DeepSpeed training for scalable model development.",
    defaultImage: "/projects/vall-e-tts/architecture.png",
    gallery: ["/projects/vall-e-tts/architecture.png"],
    technicalHighlights: [
      "Zero-shot TTS: Generate speech in any voice from a single 3-second reference audio without fine-tuning",
      "Neural codec language modeling with EnCodec tokenizer for audio quantization and decoding",
      "Dual architecture: Autoregressive (AR) model for first quantizer + Non-autoregressive (NAR) for remaining quantizers",
      "DeepSpeed training integration for scalable distributed training with CUDA/ROCm support",
    ],
    challengesSolutions: [
      "Voice cloning without fine-tuning → Implemented neural codec language model approach for zero-shot synthesis",
      "Scalable training → Integrated DeepSpeed for distributed training with efficient memory management",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/enhuiz/vall-e" },
      { label: "Paper", url: "https://arxiv.org/abs/2301.02111" },
    ],
    categories: ["AI/ML", "LLM Integration"],
    techStack: [
      "Python",
      "PyTorch",
      "EnCodec",
      "Transformers",
      "DeepSpeed",
      "CUDA",
      "Git/GitHub",
    ],
    year: 2023,
  },
  {
    title:
      "Admin Issuer Portal — Certificate & Digital Signature Management UI",
    slug: "admin-issuer-portal",
    impact: "Complete certificate lifecycle management with audit trail",
    description:
      "React admin dashboard for certificate issuance and digital signature management (Dec 2025 – Jan 2026). Built for universities, academies, and professional institutes to manage certificate issuers, design signature layouts on PDF templates, and track signing activity with full audit trails. Features dashboard metrics, issuer verification, signature field editor with canvas, PDF preview with zoom/download, and document workflow management.",
    defaultImage: "/projects/admin-issuer-portal/dashboard.png",
    gallery: [
      "/projects/admin-issuer-portal/dashboard.png",
      "/projects/admin-issuer-portal/signature-editor.png",
    ],
    technicalHighlights: [
      "React 18 + TypeScript with Vite for fast development and optimized production builds",
      "Signature field editor: Canvas-based placement with zoom, grid, placeholders, and configurable properties (required, method, lock)",
      "PDF preview system with zoom, pagination, download/print, signer info overlay, and complete audit trail (events, timestamps, IP, device)",
      "Dashboard with real-time metrics (certificates issued, pending signatures, PDFs generated) and recent activity monitoring",
    ],
    challengesSolutions: [
      "Complex signature workflows → Built canvas-based editor for precise signature field placement with issuer/recipient assignment",
      "Audit compliance → Implemented comprehensive audit trail tracking all signing events with timestamps, actors, IP addresses, and device info",
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/kevendev523/Admin_Issuer_Portal_UI",
      },
    ],
    categories: ["Full-Stack Application"],
    techStack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Radix UI",
      "React Hook Form",
      "Recharts",
      "Lucide React",
      "Git/GitHub",
    ],
    year: 2026,
  },
  {
    title: "Rising Dot Agency — Full-Stack Web Development Agency Platform",
    slug: "rising-dot-agency",
    impact: "Complete agency platform with CMS, SEO tools, and admin dashboard",
    description:
      "Modern, high-performance web development agency website built with Next.js 14 (Dec 2025 – Jan 2026). Features stunning animations with Framer Motion and GSAP, 3D elements with Three.js, comprehensive admin dashboard with MongoDB-backed CMS, SEO optimization tools with keyword strategy and analytics integration, and production-ready API routes for blogs, portfolio, contact, and analytics. Showcases web design, Shopify development, SEO, chatbot development, and N8N automation services.",
    defaultImage: "/projects/rising-dot-agency/hero.png",
    gallery: [
      "/projects/rising-dot-agency/hero.png",
      "/projects/rising-dot-agency/portfolio.png",
      "/projects/rising-dot-agency/seo-tools.png",
    ],
    technicalHighlights: [
      "Next.js 14 App Router with TypeScript, Tailwind CSS, and MongoDB for full-stack content management",
      "Advanced animations: Framer Motion, GSAP, and Lenis for butter-smooth scroll and fluid interactions",
      "3D graphics integration with Three.js, React Three Fiber, and Spline for immersive visualizations",
      "Admin dashboard: Content management, SEO tools (keyword cloud, importance scoring, PageSpeed integration), media library (Cloudinary), navigation editor, and user management with NextAuth.js 2FA",
    ],
    challengesSolutions: [
      "Complex animations and performance → Optimized with code splitting, lazy loading, and efficient animation libraries (Framer Motion, GSAP)",
      "Content management at scale → Built MongoDB-backed CMS with role-based access control and visual editors for non-technical users",
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/kevindev523/rising-dot-agency",
      },
    ],
    categories: ["Full-Stack Application"],
    techStack: [
      "Next.js",
      "TypeScript",
      "React",
      "MongoDB",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
      "Three.js",
      "NextAuth.js",
      "Cloudinary",
      "Vercel",
      "Git/GitHub",
    ],
    year: 2026,
  },
  {
    title:
      "Solana Bundler — Token Deployment & Multi-Wallet Management Platform",
    slug: "solana-bundler",
    impact:
      "Complete Solana token lifecycle with multi-wallet trading automation",
    description:
      "Powerful token deployment and management tool for Solana blockchain (Jul 2025 – Sep 2025). Deploy SPL tokens on pump.fun, letsbonk.fun, cook.meme, and other platforms with one-click deployment. Features comprehensive multi-wallet management (dev & fund wallets), batch trading operations, real-time charts via DEXTools integration, and local-only private key storage. Built with React, TypeScript, Tailwind CSS, and Solana Web3.js for secure, client-side token operations.",
    defaultImage: "/projects/solana-bundler/wallet-management.png",
    gallery: [
      "/projects/solana-bundler/wallet-management.png",
      "/projects/solana-bundler/fund-wallets.png",
      "/projects/solana-bundler/token-deployment.png",
      "/projects/solana-bundler/architecture.png",
    ],
    technicalHighlights: [
      "Multi-platform token deployment: pump.fun, letsbonk.fun, cook.meme, boop.fun, moon.it with custom configuration (name, symbol, supply, liquidity)",
      "Advanced wallet management: Dev & fund wallet separation, bulk operations, wallet grouping, real-time SOL/token balances, import/export functionality",
      "Batch trading engine: Execute buy/sell operations across multiple wallets simultaneously with performance analytics and transaction history",
      "Security-first architecture: Local-only storage, encrypted private keys, no server communication, auto-logout, and secure backup/restore",
    ],
    challengesSolutions: [
      "Multi-wallet coordination → Built batch operation system for simultaneous trading across wallets with single-click execution",
      "Private key security → Implemented local-only storage with optional encryption, ensuring keys never leave the browser",
    ],
    links: [
      { label: "Live App", url: "https://www.bundlerbot.fun/" },
      {
        label: "GitHub",
        url: "https://github.com/0xBundlerBot/Solana_Bundler_Bot",
      },
    ],
    categories: ["Full-Stack Application"],
    techStack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Solana Web3.js",
      "LocalStorage",
      "Git/GitHub",
    ],
    year: 2025,
  },
];

// Helper functions
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllCategories(): string[] {
  const categories = new Set<string>();
  projects.forEach((project) => {
    project.categories.forEach((category) => categories.add(category));
  });
  return Array.from(categories).sort();
}

export function getAllYears(): number[] {
  const years = new Set<number>();
  projects.forEach((project) => years.add(project.year));
  return Array.from(years).sort((a, b) => b - a);
}

export function getProjectsByYear(): Map<number, Project[]> {
  const projectsByYear = new Map<number, Project[]>();
  projects.forEach((project) => {
    const year = project.year;
    if (!projectsByYear.has(year)) {
      projectsByYear.set(year, []);
    }
    projectsByYear.get(year)!.push(project);
  });
  return projectsByYear;
}
