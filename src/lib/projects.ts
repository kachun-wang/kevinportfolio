import type { ProjectDetails } from "@/types/project";

export type { ProjectDetails };

const projects: Record<string, ProjectDetails> = {
  "sales-forecasting-ai": {
    slug: "sales-forecasting-ai",
    title: "Quackshift: AI-Powered Sales Forecasting",
    subtitle: "Transforming Retail Demand Planning with Deep Learning",
    description:
      "A production ML pipeline that increased forecasting accuracy by 20%, enabling millions in inventory optimization for a major retail chain. Built with PyTorch, FastAPI, and deployed on AWS.",
    keywords: [
      "machine learning",
      "time series forecasting",
      "PyTorch",
      "demand planning",
      "retail AI",
      "FastAPI",
      "AWS",
      "transformer models",
    ],
    publishedAt: "2025-08-15",
    updatedAt: "2026-01-10",
    readingTime: 12,
    ogImage: "/og/sales-forecasting.jpg",
    color: "#8b5cf6",
    gradientFrom: "#8b5cf6",
    gradientTo: "#06b6d4",
    metrics: [
      {
        value: "+20%",
        label: "Forecast Accuracy",
        description: "Improvement over legacy statistical models",
      },
      {
        value: "$2.4M",
        label: "Annual Savings",
        description: "Reduced overstock and stockout costs",
      },
      {
        value: "< 100ms",
        label: "Inference Time",
        description: "Real-time predictions at scale",
      },
      {
        value: "10K+",
        label: "SKUs Managed",
        description: "Across 200+ retail locations",
      },
    ],
    problem: {
      title: "The Challenge",
      description:
        "Our client, a major retail chain with 200+ locations, was drowning in inventory inefficiency. Their legacy forecasting system—built on decades-old statistical methods—was failing to capture the complexity of modern consumer behavior.",
      painPoints: [
        "65% baseline accuracy causing massive overstock losses",
        "$3.2M annual waste from expired perishables",
        "Stockouts during peak seasons costing 15% of potential revenue",
        "Manual demand planning taking 40+ hours per week",
        "No ability to factor in external signals (weather, events, trends)",
      ],
    },
    solution: {
      title: "The Solution",
      description:
        "We built Quackshift—a state-of-the-art forecasting engine powered by transformer-based deep learning. The system ingests multi-modal data streams and produces granular, explainable forecasts that buyers actually trust.",
      highlights: [
        "Custom temporal fusion transformer architecture",
        "Multi-horizon forecasting (1-day to 90-day predictions)",
        "Automatic feature engineering from 50+ data sources",
        "Explainable AI with SHAP-based feature attribution",
        "Self-improving model with online learning capabilities",
        "Seamless integration with existing ERP systems",
      ],
    },
    architecture: {
      title: "System Architecture",
      description:
        "A fully automated, production-grade ML pipeline designed for reliability, scalability, and continuous improvement.",
      layers: [
        {
          name: "Data Ingestion",
          description:
            "Real-time and batch data pipelines collecting POS transactions, inventory levels, weather data, social trends, and promotional calendars.",
          tech: ["Apache Kafka", "AWS Kinesis", "dbt", "Snowflake"],
        },
        {
          name: "Feature Engineering",
          description:
            "Automated feature store with 500+ engineered features including lag features, rolling statistics, Fourier transforms for seasonality, and embedding-based categorical encodings.",
          tech: ["Feast", "Pandas", "NumPy", "scikit-learn"],
        },
        {
          name: "Model Training",
          description:
            "Distributed training pipeline with hyperparameter optimization, cross-validation, and automatic model selection based on business metrics.",
          tech: ["PyTorch", "Lightning", "Optuna", "MLflow", "AWS SageMaker"],
        },
        {
          name: "Inference API",
          description:
            "High-performance prediction service with sub-100ms latency, automatic batching, and graceful degradation.",
          tech: ["FastAPI", "ONNX", "Redis", "Kubernetes"],
        },
        {
          name: "Monitoring & Observability",
          description:
            "Comprehensive model monitoring with drift detection, performance tracking, and automated retraining triggers.",
          tech: ["Prometheus", "Grafana", "Evidently AI", "PagerDuty"],
        },
      ],
    },
    results: {
      title: "The Impact",
      description:
        "Quackshift transformed our client's demand planning from a liability into a competitive advantage. The numbers speak for themselves.",
      achievements: [
        {
          metric: "Forecast Accuracy",
          value: "85%",
          comparison: "vs 65% baseline",
        },
        {
          metric: "Overstock Reduction",
          value: "40%",
          comparison: "across all categories",
        },
        {
          metric: "Stockout Rate",
          value: "-60%",
          comparison: "during peak seasons",
        },
        {
          metric: "Planning Time",
          value: "4 hrs/week",
          comparison: "vs 40 hrs previously",
        },
        {
          metric: "ROI",
          value: "8x",
          comparison: "in first year",
        },
        {
          metric: "Model Confidence",
          value: "92%",
          comparison: "buyer adoption rate",
        },
      ],
    },
    techStack: [
      { name: "PyTorch", icon: "pytorch", category: "ml" },
      { name: "Lightning", icon: "lightning", category: "ml" },
      { name: "Transformers", icon: "huggingface", category: "ml" },
      { name: "ONNX", icon: "onnx", category: "ml" },
      { name: "FastAPI", icon: "fastapi", category: "backend" },
      { name: "Python", icon: "python", category: "backend" },
      { name: "PostgreSQL", icon: "postgresql", category: "data" },
      { name: "Redis", icon: "redis", category: "data" },
      { name: "Snowflake", icon: "snowflake", category: "data" },
      { name: "Kafka", icon: "kafka", category: "data" },
      { name: "AWS", icon: "aws", category: "infra" },
      { name: "Kubernetes", icon: "kubernetes", category: "infra" },
      { name: "Docker", icon: "docker", category: "infra" },
      { name: "Terraform", icon: "terraform", category: "infra" },
    ],
    codeSnippets: [
      {
        title: "FastAPI Prediction Endpoint",
        language: "python",
        description:
          "High-performance async endpoint handling thousands of concurrent prediction requests with automatic batching.",
        code: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import torch
from typing import List
import numpy as np

app = FastAPI(title="Quackshift Forecasting API")

class ForecastRequest(BaseModel):
    sku_id: str
    store_id: str
    horizon_days: int = 14
    include_confidence: bool = True

class ForecastResponse(BaseModel):
    sku_id: str
    predictions: List[float]
    confidence_intervals: List[tuple[float, float]] | None
    feature_importance: dict | None

@app.post("/predict", response_model=ForecastResponse)
async def predict_demand(request: ForecastRequest):
    """
    Generate demand forecast for a specific SKU-store combination.
    
    Uses temporal fusion transformer with attention-based
    feature selection for interpretable predictions.
    """
    # Load features from feature store
    features = await feature_store.get_features(
        sku_id=request.sku_id,
        store_id=request.store_id,
        lookback_days=90
    )
    
    # Run inference with ONNX-optimized model
    with torch.inference_mode():
        predictions, attention_weights = model.predict(
            features,
            horizon=request.horizon_days
        )
    
    # Calculate confidence intervals via quantile regression
    confidence = None
    if request.include_confidence:
        confidence = model.predict_quantiles(
            features,
            quantiles=[0.1, 0.9]
        )
    
    return ForecastResponse(
        sku_id=request.sku_id,
        predictions=predictions.tolist(),
        confidence_intervals=confidence,
        feature_importance=attention_weights
    )`,
      },
      {
        title: "Temporal Fusion Transformer",
        language: "python",
        description:
          "Core model architecture combining LSTM encoders with multi-head attention for capturing complex temporal patterns.",
        code: `import torch
import torch.nn as nn
from torch import Tensor

class TemporalFusionTransformer(nn.Module):
    """
    Temporal Fusion Transformer for multi-horizon forecasting.
    
    Combines recurrent layers for local patterns with
    self-attention for long-range dependencies.
    """
    
    def __init__(
        self,
        input_size: int,
        hidden_size: int = 256,
        num_heads: int = 8,
        num_layers: int = 4,
        dropout: float = 0.1,
        max_horizon: int = 90
    ):
        super().__init__()
        
        # Variable selection networks
        self.static_vsn = VariableSelectionNetwork(
            input_size, hidden_size, dropout
        )
        self.temporal_vsn = VariableSelectionNetwork(
            input_size, hidden_size, dropout
        )
        
        # LSTM encoder for local temporal patterns
        self.lstm_encoder = nn.LSTM(
            hidden_size, hidden_size,
            num_layers=2, batch_first=True,
            dropout=dropout, bidirectional=True
        )
        
        # Gated residual network
        self.grn = GatedResidualNetwork(
            hidden_size * 2, hidden_size, dropout
        )
        
        # Multi-head attention for long-range dependencies
        self.attention = nn.MultiheadAttention(
            hidden_size, num_heads,
            dropout=dropout, batch_first=True
        )
        
        # Quantile output heads for uncertainty estimation
        self.quantile_heads = nn.ModuleDict({
            'p10': nn.Linear(hidden_size, max_horizon),
            'p50': nn.Linear(hidden_size, max_horizon),
            'p90': nn.Linear(hidden_size, max_horizon),
        })
        
    def forward(
        self, 
        x: Tensor,
        static_features: Tensor,
        horizon: int = 14
    ) -> tuple[Tensor, Tensor]:
        # Variable selection
        static_ctx = self.static_vsn(static_features)
        temporal_features, var_weights = self.temporal_vsn(x)
        
        # LSTM encoding
        lstm_out, _ = self.lstm_encoder(temporal_features)
        lstm_out = self.grn(lstm_out, static_ctx)
        
        # Self-attention with interpretable weights
        attn_out, attn_weights = self.attention(
            lstm_out, lstm_out, lstm_out
        )
        
        # Generate quantile predictions
        predictions = {
            q: head(attn_out[:, -1, :])[:, :horizon]
            for q, head in self.quantile_heads.items()
        }
        
        return predictions, attn_weights`,
      },
    ],
    testimonials: [
      {
        quote:
          "Quackshift didn't just improve our numbers—it changed how we think about inventory. Our buyers now trust the AI more than their gut feelings, and that's saying something after 20 years in retail.",
        author: "Sarah Chen",
        role: "VP of Supply Chain",
        company: "Major Retail Client",
      },
      {
        quote:
          "The 8x ROI in year one was impressive, but what really sold us was the explainability. When the model suggests ordering 40% more sunscreen because it detected a heatwave correlation, our team gets it.",
        author: "Michael Torres",
        role: "Director of Analytics",
        company: "Major Retail Client",
      },
    ],
    tableOfContents: [
      { id: "overview", title: "Overview" },
      { id: "problem", title: "The Challenge" },
      { id: "solution", title: "The Solution" },
      { id: "architecture", title: "Architecture" },
      { id: "results", title: "Results" },
      { id: "tech-stack", title: "Tech Stack" },
      { id: "code", title: "Code Deep Dive" },
      { id: "testimonials", title: "Testimonials" },
    ],
    beforeAfter: {
      before: {
        title: "Before Quackshift",
        description: "Legacy statistical forecasting with manual adjustments",
        metrics: [
          "65% forecast accuracy",
          "$3.2M annual overstock waste",
          "15% revenue loss from stockouts",
          "40 hours/week manual planning",
          "No external signal integration",
        ],
      },
      after: {
        title: "After Quackshift",
        description:
          "AI-powered intelligent demand sensing with continuous learning",
        metrics: [
          "85% forecast accuracy",
          "$800K overstock waste (75% reduction)",
          "6% revenue loss from stockouts",
          "4 hours/week automated planning",
          "50+ external data sources integrated",
        ],
      },
    },
  },
};

export function getProjectBySlug(slug: string): ProjectDetails | null {
  return projects[slug] || null;
}

export function getAllProjectSlugs(): string[] {
  return Object.keys(projects);
}

export function getAllProjects(): ProjectDetails[] {
  return Object.values(projects);
}
