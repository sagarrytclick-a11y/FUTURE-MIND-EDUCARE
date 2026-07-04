export interface PlanConfig {
  id: string;
  name: string;
  price: number;
  description: string;
}

export const PLANS: Record<string, PlanConfig> = {
  NEET_UG_PLAN_1: {
    id: "NEET_UG_PLAN_1",
    name: "Plan 1 - Information Based Package",
    price: 10000,
    description: "Information based package for NEET UG counseling updates",
  },
  NEET_UG_PLAN_2: {
    id: "NEET_UG_PLAN_2",
    name: "Plan 2 - Personalized Counseling Service",
    price: 25000,
    description: "Personalized counseling service with dedicated 1-on-1 support",
  },
  NEET_UG_PLAN_3: {
    id: "NEET_UG_PLAN_3",
    name: "Plan 3 - ONE TO ONE Counseling Service",
    price: 50000,
    description: "End to end one-to-one counseling service",
  },
  NEET_UG_PLAN_4: {
    id: "NEET_UG_PLAN_4",
    name: "Plan 4 - NRI/MNGT Quota Admission Service",
    price: 100000,
    description: "NRI/Management quota admission assistance",
  },
  MBBS_ABROAD: {
    id: "MBBS_ABROAD",
    name: "MBBS Abroad Package",
    price: 100000,
    description: "Premium guidance for MBBS admission abroad",
  },
  STUDY_ABROAD: {
    id: "STUDY_ABROAD",
    name: "Study Abroad Package",
    price: 100000,
    description: "Expert consultancy for studying abroad",
  },
};

export function getPlanById(planId: string): PlanConfig | undefined {
  return PLANS[planId];
}
