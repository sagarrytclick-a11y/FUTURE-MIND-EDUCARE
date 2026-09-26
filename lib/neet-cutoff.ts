/**
 * NEET UG 2026 (Re-NEET) official qualifying cut-off as declared by NTA with
 * the result on 16 July 2026, plus indicative government-MBBS benchmarks
 * derived from the published NTA ranges and MCC AIQ 2026 Round 1 allotment
 * trends. Admission benchmarks are estimates — actual allotment depends on
 * counselling round, state quota, reservation and seat availability.
 */

export type CategoryKey =
  | "UR"
  | "EWS"
  | "OBC"
  | "SC"
  | "ST"
  | "UR_PwBD"
  | "OBC_PwBD"
  | "SC_PwBD"
  | "ST_PwBD";

export type CutoffRow = {
  key: CategoryKey;
  label: string;
  group: "General" | "Reserved" | "PwBD";
  percentile: string;
  /** NTA published qualifying range for NEET UG 2026 */
  min: number;
  max: number;
  /** candidates qualified (2026) */
  qualified: number;
  /** same category's 2025 qualifying range, for comparison */
  previous: string;
  /** indicative marks for a realistic government MBBS seat chance */
  govtChance: number;
  /** indicative marks for a strong chance at top government colleges */
  topGovt: number;
};

export const NEET_YEAR = 2026;
export const NEET_RESULT_DATE = "16 July 2026";
export const NEET_MAX_MARKS = 720;

export const NEET_CUTOFF_2026: CutoffRow[] = [
  {
    key: "UR",
    label: "General / UR",
    group: "General",
    percentile: "50th",
    min: 213,
    max: 715,
    qualified: 996935,
    previous: "686 – 144",
    govtChance: 620,
    topGovt: 660,
  },
  {
    key: "EWS",
    label: "EWS",
    group: "General",
    percentile: "50th",
    min: 213,
    max: 715,
    qualified: 996935,
    previous: "686 – 144",
    govtChance: 615,
    topGovt: 655,
  },
  {
    key: "OBC",
    label: "OBC-NCL",
    group: "Reserved",
    percentile: "40th",
    min: 177,
    max: 212,
    qualified: 81111,
    previous: "143 – 113",
    govtChance: 590,
    topGovt: 630,
  },
  {
    key: "SC",
    label: "SC",
    group: "Reserved",
    percentile: "40th",
    min: 177,
    max: 212,
    qualified: 29947,
    previous: "143 – 113",
    govtChance: 520,
    topGovt: 560,
  },
  {
    key: "ST",
    label: "ST",
    group: "Reserved",
    percentile: "40th",
    min: 177,
    max: 212,
    qualified: 12452,
    previous: "143 – 113",
    govtChance: 490,
    topGovt: 530,
  },
  {
    key: "UR_PwBD",
    label: "UR / EWS – PwBD",
    group: "PwBD",
    percentile: "45th",
    min: 194,
    max: 212,
    qualified: 480,
    previous: "143 – 127",
    govtChance: 560,
    topGovt: 600,
  },
  {
    key: "OBC_PwBD",
    label: "OBC – PwBD",
    group: "PwBD",
    percentile: "40th",
    min: 177,
    max: 193,
    qualified: 185,
    previous: "126 – 113",
    govtChance: 540,
    topGovt: 580,
  },
  {
    key: "SC_PwBD",
    label: "SC – PwBD",
    group: "PwBD",
    percentile: "40th",
    min: 177,
    max: 193,
    qualified: 64,
    previous: "126 – 113",
    govtChance: 480,
    topGovt: 520,
  },
  {
    key: "ST_PwBD",
    label: "ST – PwBD",
    group: "PwBD",
    percentile: "40th",
    min: 178,
    max: 191,
    qualified: 11,
    previous: "126 – 113",
    govtChance: 460,
    topGovt: 500,
  },
];

export const findCutoff = (key: CategoryKey): CutoffRow =>
  NEET_CUTOFF_2026.find((row) => row.key === key) ?? NEET_CUTOFF_2026[0];

export type PredictionTier =
  | "not-qualified"
  | "qualified"
  | "government"
  | "top-government";

export type Prediction = {
  tier: PredictionTier;
  row: CutoffRow;
  /** marks to clear the official qualifying cut-off for this category */
  marksNeeded: number;
  /** marks over/under the government MBBS benchmark */
  delta: number;
  headline: string;
  summary: string;
  advice: string[];
};

export function predictNeet(marks: number, key: CategoryKey): Prediction {
  const row = findCutoff(key);

  if (marks < row.min) {
    return {
      tier: "not-qualified",
      row,
      marksNeeded: row.min,
      delta: marks - row.govtChance,
      headline: "Below the 2026 qualifying cut-off",
      summary: `Your score is under the ${row.percentile} percentile qualifying cut-off of ${row.min} marks for ${row.label}. NEET UG counselling is not available with this score for ${NEET_YEAR}.`,
      advice: [
        "Check your category — reserved categories qualify at 40th percentile, which is a lower mark range.",
        "Compare with 2025 for a sense of how much the bar moved: " + row.previous + " marks.",
        "Talk to a counsellor about AYUSH, BDS and allied health options, or about preparing for the next attempt.",
      ],
    };
  }

  if (marks < row.govtChance) {
    return {
      tier: "qualified",
      row,
      marksNeeded: row.govtChance - marks,
      delta: marks - row.govtChance,
      headline: "Qualified — private and deemed colleges are in range",
      summary: `You clear the ${row.percentile} percentile cut-off of ${row.min} marks for ${row.label}. A government MBBS seat is unlikely at this score, but private, deemed and most BDS/AYUSH options remain open.`,
      advice: [
        `About ${row.govtChance - marks} more marks would move you into the indicative government MBBS range.`,
        "Apply across state and private counselling rounds — closing ranks can drop in later rounds.",
        "Keep MBBS abroad (NMC-approved universities) as a parallel option while counselling runs.",
      ],
    };
  }

  if (marks < row.topGovt) {
    return {
      tier: "government",
      row,
      marksNeeded: row.topGovt - marks,
      delta: marks - row.govtChance,
      headline: "Government MBBS seat — good chance",
      summary: `At ${marks} marks you are above the indicative government MBBS benchmark of ${row.govtChance} for ${row.label}, and clear the ${row.percentile} percentile cut-off comfortably.`,
      advice: [
        "Apply to a wide list of state and All India Quota colleges — later rounds often throw up surprises.",
        `Another ${row.topGovt - marks} marks would put top-tier colleges within reach.`,
        "Complete state domicile and reservation documents early so no seat is lost to paperwork.",
      ],
    };
  }

  return {
    tier: "top-government",
    row,
    marksNeeded: 0,
    delta: marks - row.topGovt,
    headline: "Strong chance at top government colleges",
    summary: `At ${marks} marks you sit above the ${row.topGovt}-mark top-government benchmark for ${row.label} — AIIMS, central and state premier institutes are realistic targets.`,
    advice: [
      "Focus your college list on AIIMS, central institutes and state premier medical colleges.",
      "Fill the maximum number of choices in order of preference during counselling.",
      "Keep a safety list of strong state government colleges in lower-competition states.",
    ],
  };
}

/**
 * MCC All India Quota 2026 Round 1 opening / closing ranks for leading
 * government medical colleges (General category) — reference only.
 */
export const AIQ_2026_TOP_GOVT = [
  { college: "VMMC & Safdarjung Hospital, New Delhi", opening: 56, closing: 124 },
  { college: "Maulana Azad Medical College, New Delhi", opening: 60, closing: 129 },
  { college: "JIPMER Puducherry", opening: 12, closing: 300 },
  { college: "Government Medical College, Chandigarh", opening: 139, closing: 704 },
  { college: "Lady Hardinge Medical College, New Delhi", opening: 251, closing: 830 },
  { college: "Institute of Medical Sciences, BHU, Varanasi", opening: 203, closing: 1043 },
  { college: "Madras Medical College, Chennai", opening: 325, closing: 672 },
  { college: "King George Medical University, Lucknow", opening: 308, closing: 1349 },
  { college: "IPGME & SSKM Hospital, Kolkata", opening: 1012, closing: 3368 },
  { college: "JN Medical College, AMU, Aligarh", opening: 1261, closing: 4310 },
];
