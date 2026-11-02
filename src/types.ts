export type IndustryType = 
  | '반도체' 
  | '디스플레이' 
  | '자동차' 
  | '배터리' 
  | '바이오' 
  | '화학' 
  | '전자 및 IT';

export interface ProcessNode {
  id: string;
  order: number;
  name: string;
  shortDesc: string;
  detailedPrinciple: string;
  inDepthEngineering: string;
  equipment: {
    name: string;
    maker?: string;
    purpose: string;
  }[];
  keyTechnologies: string[];
  qualityControlFactors: {
    item: string;
    target: string;
    risk: string;
  }[];
  relatedJobs: {
    title: string;
    requiredSkills: string[];
    description: string;
  }[];
  interviewQuestions: {
    question: string;
    tip: string;
    modelAnswer: string;
  }[];
  verifiedStandard: boolean;
}

export interface Company {
  id: string;
  name: string;
  industry: IndustryType;
  logoText: string;
  ticker?: string;
  headquarters: string;
  overview: string;
  flagshipProducts: {
    name: string;
    description: string;
    marketPosition: string;
  }[];
  processFlows: {
    productName: string;
    summary: string;
    categoryNotice: string;
    nodes: ProcessNode[];
  }[];
  heroImage: string;
}

export interface LearningModule {
  id: string;
  industry: IndustryType;
  jobRole: string;
  title: string;
  estimatedMinutes: number;
  difficulty: '초급' | '중급' | '심화';
  summary: string;
  coreConcepts: {
    simpleExplanation: string;
    deepExplanation: string;
    keyFormulasOrSchematics?: string;
  };
  industrialApplicationCase: {
    title: string;
    companyContext: string;
    problem: string;
    solution: string;
    outcome: string;
  };
  glossary: {
    term: string;
    definition: string;
    importance: string;
  }[];
  interviewPrep: {
    question: string;
    intent: string;
    starGuide: {
      situation: string;
      task: string;
      action: string;
      result: string;
    };
    modelAnswer: string;
  }[];
  quiz: {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface MockInterviewEvaluation {
  score: number;
  grade: 'S' | 'A' | 'B' | 'C';
  strengths: string[];
  improvements: string[];
  starFeedback: {
    situationTask: string;
    action: string;
    result: string;
  };
  recommendedAnswer: string;
}

export interface JobPostingSample {
  id: string;
  companyName: string;
  jobTitle: string;
  industry: IndustryType;
  deadline: string;
  location: string;
  url?: string;
  content: string;
  requirements: string[];
  preferred: string[];
}

export interface PortfolioSample {
  id: string;
  title: string;
  applicantMajor: string;
  targetRole: string;
  summary: string;
  projects: {
    title: string;
    period: string;
    role: string;
    techStack: string[];
    description: string;
    quantifiableResults: string;
  }[];
  skills: string[];
  certifications: string[];
}

export interface RequirementMatch {
  jobRequirement: string;
  matchedProject: string;
  highlightPoints: string;
  logicalEvidence: string;
  status: '완벽 일치' | '부분 일치' | '보완 필요';
}

export interface CompetencyGap {
  skillOrKnowledge: string;
  category: '기술 역량' | '전공 지식' | '프로젝트 경험';
  recommendation: string;
}

export interface ApplicationStrategy {
  resumeFocus: string;
  interviewKeyProjects: string[];
  expectedInterviewQuestions: string[];
  preApplicationChecklist: string[];
}

export interface JobMatchResult {
  jobFitScore: number;
  requirementFulfillmentRate: number;
  overallVerdict: string;
  strengths: string[];
  matchingDetails: RequirementMatch[];
  missingCompetencies: CompetencyGap[];
  applicationStrategy: ApplicationStrategy;
}

export interface IndustryTrendItem {
  id: string;
  industry: IndustryType;
  weeklyNews: {
    title: string;
    date: string;
    source: string;
    url: string;
    summary: string;
    implication: string;
    isVerifiedFact: boolean;
  }[];
  topTechTrends: {
    rank: number;
    title: string;
    impactLevel: '매우 높음' | '높음' | '중간';
    description: string;
    affectedProcess: string;
  }[];
  companyInvestments: {
    company: string;
    investmentField: string;
    scale: string;
    strategicMeaning: string;
  }[];
  industryIssues: {
    issue: string;
    analysis: string;
    impactOnRecruitment: string;
  }[];
  promisingJobs: {
    jobTitle: string;
    demandLevel: '급상승' | '안정적 성장' | '신규 부상';
    coreSkills: string[];
    whyPromising: string;
  }[];
  applicantPrepRoadmap: {
    step: string;
    action: string;
  }[];
}

export interface UserState {
  name: string;
  email: string;
  targetIndustry: IndustryType;
  targetCompany: string;
  targetRole: string;
  savedCompanyIds: string[];
  savedJobIds: string[];
  completedModuleIds: string[];
  completedQuizScores: Record<string, number>;
  portfolioNotes: string;
  customPortfolioText: string;
  recentAnalyses: {
    id: string;
    date: string;
    jobTitle: string;
    companyName: string;
    score: number;
  }[];
}
