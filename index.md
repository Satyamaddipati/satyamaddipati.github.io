---
layout: home
author_profile: true
header:
  overlay_image: /assets/images/chicago-banner.jpg
  overlay_filter: 0.5
  caption: "Photo: Chicago Downtown"
---

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px; margin-bottom: 30px; color: white; text-align: center;">
  <h2 style="margin: 0 0 10px 0; color: white;">🎯 Seeking Summer 2025 ML Engineering / Applied AI Internships</h2>
  <p style="margin: 5px 0; font-size: 1.1em;">MS CS @ UW-Madison | 2+ years production ML experience | Available May - August 2025</p>
  <div style="margin-top: 15px;">
    <a href="/assets/resume.pdf" style="background: white; color: #667eea; padding: 10px 20px; margin: 5px; border-radius: 5px; text-decoration: none; font-weight: 600; display: inline-block;">📄 Resume</a>
    <a href="mailto:sbmaddipati@wisc.edu" style="background: white; color: #667eea; padding: 10px 20px; margin: 5px; border-radius: 5px; text-decoration: none; font-weight: 600; display: inline-block;">📧 Email</a>
    <a href="https://linkedin.com/in/satya-bhargav-maddipati-9a47b8158" style="background: white; color: #667eea; padding: 10px 20px; margin: 5px; border-radius: 5px; text-decoration: none; font-weight: 600; display: inline-block;">💼 LinkedIn</a>
  </div>
</div>

I'm Satya, an MS Computer Science student at **UW-Madison** with **2 years of production ML experience** at **Tata AIA Life Insurance** and research background from **IIT Bombay**.

I specialize in **LLM engineering and production ML systems** — from RAG pipelines to multi-agent workflows — with a track record of deploying AI systems that deliver measurable business impact.

---

## 💻 Technical Skills

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

**Languages:** Python, SQL, JavaScript  
**ML/AI:** PyTorch, TensorFlow, scikit-learn, Hugging Face Transformers, LangChain, LangGraph  
**LLM Engineering:** RAG systems, Fine-tuning, Prompt engineering, Evaluation frameworks  
**Infrastructure:** Docker, AWS (Lambda, S3, EC2), FastAPI, Redis, PostgreSQL, ChromaDB  
**Tools:** Git, Weights & Biases, MLflow, Jupyter, Postman

</div>

---

## 🛠️ Featured Projects

### 1. Multi-Agent LLM Evaluation System ⭐

Built autonomous evaluation system achieving **89% correlation with human evaluators** across **50,000+ evaluations**. Deployed in production serving **500+ daily requests**.

**The Problem:** Manual evaluation of LLM outputs was time-consuming and inconsistent, creating bottlenecks in prompt optimization.

**My Solution:** Architected a multi-agent system using LangGraph where specialized agents evaluate different quality dimensions (accuracy, relevance, coherence, safety). Agents collaborate to produce comprehensive evaluations.

**Impact:** 
- Reduced evaluation time from hours to minutes
- Enabled rapid A/B testing of prompts
- 89% correlation with human expert ratings
- Deployed across multiple business units

**Tech Stack:** Python, LangChain, LangGraph, FastAPI, OpenAI API, Docker, AWS Lambda

📂 [View Code](#) | 📝 [Read Case Study](/blog/llm-eval) | 🚀 [Live Demo](#)

---

### 2. Production RAG System for Insurance Documents

Built hybrid RAG pipeline achieving **35% reduction in manual claims review time**, saving **2,000+ person-hours annually** for a 200-person claims processing team.

**The Challenge:** Claims processors spent 4+ hours daily searching through policy documents, SOPs, and regulatory guidelines. Traditional keyword search missed context, and pure semantic search returned too many irrelevant results.

**My Solution:** 
- Designed adaptive retrieval strategy combining semantic + keyword search
- Implemented context-aware chunking for insurance documents
- Built prompt engineering pipeline for domain-specific queries
- Deployed with <200ms p95 latency using AWS Lambda

**Impact:**
- 35% reduction in manual review time
- Processed 10M+ documents with 94% accuracy
- Deployed to 200+ users across 3 departments
- $200K+ annual operational savings

**Tech Stack:** LangChain, ChromaDB, Sentence Transformers, FastAPI, AWS Lambda, Docker, PostgreSQL

📊 [Architecture Diagram](/assets/rag-architecture.png) | 📝 [Technical Deep Dive](/blog/rag-production)

---

### 3. Fine-Tuned Document Classifier (94% Accuracy)

Custom fine-tuned transformer model for insurance document classification, achieving **94% accuracy** and processing **10M+ documents** in production.

**The Problem:** Insurance documents (claims, policies, correspondence) needed accurate classification for routing and processing. Off-the-shelf models achieved only 78% accuracy due to domain-specific terminology.

**My Approach:**
- Collected and labeled 50K domain-specific training examples
- Fine-tuned BERT-base on insurance corpus
- Implemented active learning pipeline for continuous improvement
- Optimized inference latency to <100ms

**Impact:**
- 94% classification accuracy (vs. 78% baseline)
- Automated 80% of manual classification work
- Reduced processing time by 60%
- Deployed via FastAPI serving 1,000+ daily requests

**Tech Stack:** Hugging Face Transformers, PyTorch, FastAPI, MLflow, Docker, AWS EC2

📓 [View Notebook](#) | 📝 [Blog Post](/blog/fine-tuning-insurance) | 📈 [Results Dashboard](#)

---

### 4. Urban Air Quality Forecasting (IIT Bombay Research)

Developed ensemble time-series models for **3-5 day air quality prediction** across 5 major Indian cities, achieving **85%+ forecast accuracy**.

**The Research Question:** Can we predict urban air pollution spikes early enough to enable public health interventions?

**My Approach:**
- Collected 3 years of air quality + meteorological data
- Built Random Forest and XGBoost ensemble models
- Integrated temporal patterns, weather factors, and emission sources
- Validated across Delhi, Mumbai, Bangalore, Chennai, Kolkata

**Impact:**
- 85%+ accuracy on 3-day forecasts
- Identified key predictive features (temperature inversions, wind patterns)
- Published as dual degree thesis at IIT Bombay
- Research contributed to municipal early warning system pilots

**Tech Stack:** Python, scikit-learn, XGBoost, pandas, NumPy, Matplotlib, Jupyter

📄 [Read Thesis](/assets/thesis.pdf) | 💻 [GitHub Repository](#) | 📊 [Interactive Viz](#)

---

## 📊 Impact at a Glance

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0;">

<div style="background: #e3f2fd; padding: 20px; border-radius: 8px; text-align: center;">
<h3 style="color: #1976d2; margin: 0;">3</h3>
<p style="margin: 5px 0;">Production ML Systems</p>
<small>Serving 1,000+ daily users</small>
</div>

<div style="background: #f3e5f5; padding: 20px; border-radius: 8px; text-align: center;">
<h3 style="color: #7b1fa2; margin: 0;">2,000+</h3>
<p style="margin: 5px 0;">Person-Hours Saved</p>
<small>Through automation annually</small>
</div>

<div style="background: #e8f5e9; padding: 20px; border-radius: 8px; text-align: center;">
<h3 style="color: #388e3c; margin: 0;">89-94%</h3>
<p style="margin: 5px 0;">Model Accuracy</p>
<small>Across multiple applications</small>
</div>

<div style="background: #fff3e0; padding: 20px; border-radius: 8px; text-align: center;">
<h3 style="color: #f57c00; margin: 0;">$200K+</h3>
<p style="margin: 5px 0;">Annual Savings</p>
<small>From operational efficiency</small>
</div>

</div>

---

## 💼 Experience

### Assistant Manager – Data Science
**Tata AIA Life Insurance** | Mumbai, India | July 2022 - July 2024

**Built Production LLM Systems:**
- Architected multi-agent evaluation framework processing 50K+ evals/month with 89% correlation to human scoring
- Deployed RAG pipeline reducing claims review time by 35% (2,000+ hours saved annually)
- Fine-tuned domain-specific LLM achieving 94% accuracy on document classification
- Implemented A/B testing infrastructure for prompt optimization

**Drove Business Impact:**
- ML systems contributed to 15% growth in digital policy sales
- Automated workflows saving $200K+ annually in operational costs
- Reduced API costs by 40% through prompt optimization and caching
- Mentored 3 junior data scientists on MLOps and LLM best practices

**Tech Stack:** Python, LangChain, LangGraph, FastAPI, Docker, AWS, PyTorch, PostgreSQL

---

### Research Assistant
**IIT Bombay** | Mumbai, India | Aug 2020 - May 2022

**Air Quality Forecasting Research:**
- Developed ensemble ML models for 3-5 day air quality prediction across 5 major Indian cities
- Achieved 85%+ forecast accuracy using meteorological data and emission sources
- Published dual degree thesis on urban pollution forecasting
- Collaborated with environmental scientists on real-world validation and deployment

**Tech Stack:** Python, scikit-learn, XGBoost, pandas, NumPy, Matplotlib, Jupyter

---

## 🎓 Education

**University of Wisconsin-Madison** — MS Computer Science  
*Expected May 2026 | Madison, WI*

**Indian Institute of Technology Bombay** — Dual Degree (B.Tech + M.Tech)  
*Graduated 2022 | Mumbai, India | Major: Chemical Engineering*

---

## ✍️ Technical Blog

I write about building production ML systems and lessons learned from real deployments:

**Featured Posts:**
- [Building a Production RAG System: Architecture & Lessons Learned](/blog/rag-production)
- [Multi-Agent LLM Evaluation at Scale](/blog/llm-eval)
- [Fine-Tuning Transformers for Domain-Specific Tasks](/blog/fine-tuning-insurance)
- [From Research to Production: Air Quality Forecasting](/blog/air-quality-ml)

[View All Posts →](/blog/)

---

## 📬 Let's Connect

I'm actively seeking **Summer 2025 internships** in ML Engineering, Applied AI, or LLM Systems. I'm particularly interested in:

✨ Production LLM applications and agent systems  
⚙️ Large-scale ML infrastructure and MLOps  
🚀 AI products with measurable user impact  
🔬 Research-to-production ML pipelines

**Also open to:** Full-time opportunities starting May 2026

<div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin: 20px 0;">

📧 **Email:** [sbmaddipati@wisc.edu](mailto:sbmaddipati@wisc.edu)  
💼 **LinkedIn:** [Connect with me](https://linkedin.com/in/satya-bhargav-maddipati-9a47b8158)  
💻 **GitHub:** [View my code](https://github.com/Satyamaddipati)  
📄 **Resume:** [Download PDF](/assets/resume.pdf)

</div>

---

*Currently building cool things at UW-Madison. Always happy to chat about ML systems, internship opportunities, or interesting technical challenges!*

*Last updated: December 2024*
