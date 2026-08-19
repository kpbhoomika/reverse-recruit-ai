export type UserRole = "candidate" | "admin";
export type CandidateTier = "student" | "professional";

export type ApplicationStatus =
  | "Queued"
  | "Applied"
  | "Screening"
  | "Interview Scheduled"
  | "Offer Received"
  | "Rejected";

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
