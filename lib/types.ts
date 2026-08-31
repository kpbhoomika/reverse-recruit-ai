export type UserRole = "candidate" | "admin";
export type CandidateTier = "student" | "professional";

export type ApplicationStatus =
  | "Queued"
  | "Applied"
  | "Screening"
  | "Interview Scheduled"
  | "Offer Received"
  | "Rejected";

export type LeadStatus =
  | "New Lead"
  | "DM Sent"
  | "Audit Sent"
  | "Converted ($20)"
  | "Converted ($99)";

export interface CandidateProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedinUrl: string;
  githubUrl?: string;
  portfolioUrl?: string;
  tier: CandidateTier;
  targetRoles: string[];
  targetLocations: string[];
  workModel: ("Remote" | "Hybrid" | "On-site")[];
  minSalary: number;
  currency: string;
  yearsOfExperience: number;
  visaStatus: string;
  noticePeriodDays: number;
  blacklistedCompanies: string[];
  skills: string[];
  masterResumeText: string;
  parsedSummary?: string;
  interviewsGuaranteed: number;
  interviewsLanded: number;
  applicationsSubmitted: number;
  subscriptionActive: boolean;
  createdAt: string;
}

export interface JobPosting {
  id: string;
  companyName: string;
  companyLogoUrl?: string;
  roleTitle: string;
  location: string;
  workModel: "Remote" | "Hybrid" | "On-site";
  salaryRange?: string;
  atsPlatform: "Greenhouse" | "Lever" | "Ashby" | "Workday" | "Direct";
  applyUrl: string;
  postedDate: string;
  description: string;
  requiredSkills: string[];
  preferredSkills?: string[];
  matchScore?: number;
}

export interface ApplicationItem {
  id: string;
  candidateId: string;
  jobId: string;
  companyName: string;
  roleTitle: string;
  location: string;
  status: ApplicationStatus;
  appliedDate: string;
  atsPlatform: string;
  matchScore: number;
  tailoredResumeSnippet?: string;
  coverLetterSnippet?: string;
  recruiterPitchSnippet?: string;
  recruiterEmail?: string;
  outreachSent: boolean;
  interviewDate?: string;
  notes?: string;
}

export interface ClientLead {
  id: string;
  fullName: string;
  headline: string;
  targetRole: string;
  yearsOfExperience: number;
  location: string;
  linkedinUrl: string;
  source: string;
  estimatedAtsScore: number;
  missingSkills: string[];
  daysLooking: number;
  status: LeadStatus;
  suggestedTier: "student" | "professional";
  notes?: string;
}

export interface ATSAnalysisResult {
  matchScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  recommendations: string[];
  tailoredSummary: string;
  tailoredBulletPoints: {
    original: string;
    improved: string;
    reason: string;
  }[];
}

export interface CoverLetterResult {
  companyName: string;
  roleTitle: string;
  fullLetter: string;
  recruiterInMailPitch: string;
  emailSubjectLine: string;
}

export interface LinkedInOptimizationResult {
  suggestedHeadline: string;
  optimizedAbout: string;
  keySkillsToFeature: string[];
  bulletPointUpgrades: {
    before: string;
    after: string;
  }[];
  recruiterSearchTips: string[];
}

export interface OfferNegotiationResult {
  currentOfferTotal: number;
  marketBenchmarkMedian: number;
  marketBenchmarkHigh: number;
  percentileScore: number;
  counterOfferRecommendation: {
    baseSalaryTarget: number;
    signingBonusTarget: number;
    equityTarget: string;
  };
  negotiationEmailScript: string;
  talkingPoints: string[];
}

// =========================================================================
// 4-IN-1 AI CAREER SUITE TYPES
// =========================================================================

export type IssueSeverity = "critical" | "warning" | "passed";

export interface StructuralIssue {
  id: string;
  category: "Formatting" | "Structure" | "Contact Info" | "Content Length" | "Action Verbs" | "ATS Parsing";
  severity: IssueSeverity;
  title: string;
  description: string;
  recommendation: string;
  autoFixSnippet?: string;
}

export interface SectionAuditItem {
  section: string;
  status: "complete" | "needs_work" | "missing";
  feedback: string;
}

export interface DiagnoserResult {
  overallScore: number;
  grade: "A+" | "A" | "B" | "C" | "D";
  summary: string;
  metrics: {
    formattingScore: number;
    impactScore: number;
    atsReadabilityScore: number;
    sectionCompletenessScore: number;
    actionVerbDensityScore: number;
  };
  structuralIssues: StructuralIssue[];
  sectionAudit: SectionAuditItem[];
  stats: {
    wordCount: number;
    bulletCount: number;
    actionVerbCount: number;
    weakVerbCount: number;
    readingTimeMinutes: number;
  };
}

export interface RecruiterKeywordItem {
  keyword: string;
  category: "Core Technical" | "Frameworks & Tools" | "Architecture & Cloud" | "Methodologies" | "Soft Skills";
  frequencyInJob: number;
  foundInResume: boolean;
  importance: "critical" | "recommended" | "bonus";
  suggestedContext?: string;
}

export interface RecruiterKeywordResult {
  matchPercentage: number;
  recruiterVerdict: "Top 5% Candidate" | "Strong Consideration" | "Borderline Screening" | "Auto-Filtered by ATS";
  booleanSearchQuery: string;
  keywordDensityScore: number;
  competitivePercentile: number;
  matchedKeywords: RecruiterKeywordItem[];
  missingKeywords: RecruiterKeywordItem[];
  recruiterTakeaways: string[];
  roleSeniorityMatch: string;
}

export interface XYZRewrittenBullet {
  id: string;
  original: string;
  accomplishedX: string;
  measuredByY: string;
  byDoingZ: string;
  fullRewritten: string;
  impactScoreBefore: number;
  impactScoreAfter: number;
  rationale: string;
  variations: {
    executive: string;
    technical: string;
    metricsHeavy: string;
  };
}

export interface RewriterResult {
  overallImpactScoreBefore: number;
  overallImpactScoreAfter: number;
  targetRole: string;
  rewrittenBullets: XYZRewrittenBullet[];
  generalAdvice: string[];
}

export type InterviewPersona = "faang_director" | "startup_founder" | "bar_raiser" | "tech_lead";

export interface MockInterviewQuestion {
  id: string;
  category: "System Design" | "Behavioral (STAR)" | "Technical Deep-Dive" | "Leadership & Impact";
  question: string;
  context: string;
  hints: string[];
}

export interface RubricScoreItem {
  name: string;
  score: number; // 0 - 100
  feedback: string;
}

export interface HiringManagerResult {
  overallScore: number;
  hiringDecision: "Strong Hire" | "Hire" | "Lean Hire" | "Lean No Hire" | "Strong No Hire";
  personaUsed: InterviewPersona;
  interviewerSummary: string;
  starRubric: {
    situation: { score: number; comment: string };
    task: { score: number; comment: string };
    action: { score: number; comment: string };
    result: { score: number; comment: string };
  };
  detailedRubric: RubricScoreItem[];
  strengths: string[];
  improvementAreas: string[];
  modelAnswer: string;
  followUpQuestion: string;
}

