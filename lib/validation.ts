import { z } from 'zod';

export const NEET_MAX_MARKS = 720;

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const INDIAN_MOBILE_PATTERN = /^[6-9]\d{9}$/;

export function normalizeMobile(value: string): string {
  const digits = (value || '').replace(/\D/g, '');

  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith('0')) return digits.slice(1);

  return digits;
}

export function normalizeNeetScore(value: string): string {
  return (value || '').trim();
}

const nameSchema = z
  .string()
  .trim()
  .min(2, 'Please enter your full name')
  .max(80, 'Name must be 80 characters or less');

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, 'Email address is required')
  .max(120, 'Email address must be 120 characters or less')
  .refine((value) => EMAIL_PATTERN.test(value), 'Enter a valid email address');

const mobileSchema = z
  .string()
  .trim()
  .min(1, 'Mobile number is required')
  .transform(normalizeMobile)
  .refine(
    (value) => INDIAN_MOBILE_PATTERN.test(value),
    'Enter a valid 10-digit Indian mobile number'
  );

const courseSchema = z
  .string()
  .trim()
  .min(1, 'Please select a course interest')
  .max(60, 'Course interest must be 60 characters or less');

const neetScoreSchema = z
  .string()
  .trim()
  .transform(normalizeNeetScore)
  .refine(
    (value) => value === '' || (/^\d{1,3}$/.test(value) && Number(value) <= NEET_MAX_MARKS),
    `NEET score must be a whole number between 0 and ${NEET_MAX_MARKS}`
  );

const messageSchema = z
  .string()
  .trim()
  .max(2000, 'Message must be 2000 characters or less');

export const enquirySchema = z.object({
  name: nameSchema,
  email: emailSchema,
  mobile: mobileSchema,
  courseInterest: courseSchema,
  neetScore: neetScoreSchema,
  message: messageSchema.optional().default(''),
});

export const enquirySchemaWithNeet = enquirySchema.refine(
  (data) => data.neetScore !== '',
  { message: 'NEET score is required', path: ['neetScore'] }
);

export const neetMarksSchema = z
  .string()
  .trim()
  .min(1, 'Please enter your NEET UG marks')
  .refine(
    (value) => /^\d+$/.test(value),
    'Marks must be a whole number without decimals'
  )
  .refine(
    (value) => Number(value) <= NEET_MAX_MARKS,
    `Marks cannot be more than ${NEET_MAX_MARKS}`
  );

export const neetAirSchema = z
  .string()
  .trim()
  .refine(
    (value) => value === '' || /^\d{1,7}$/.test(value),
    'AIR rank must be a whole number'
  );

export type EnquiryField =
  | 'name'
  | 'email'
  | 'mobile'
  | 'courseInterest'
  | 'neetScore'
  | 'message';

export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

export type EnquiryValues = z.infer<typeof enquirySchema>;

export type ValidationResult<T> =
  | { ok: true; data: T; errors: Record<string, never> }
  | { ok: false; data: null; errors: EnquiryErrors & Record<string, string> };

function toFieldErrors(error: z.ZodError): EnquiryErrors & Record<string, string> {
  const errors: EnquiryErrors & Record<string, string> = {};

  for (const issue of error.issues) {
    const field = String(issue.path[0] ?? 'form') as EnquiryField;
    if (!errors[field]) errors[field] = issue.message;
  }

  return errors;
}

export function validateEnquiry(
  input: Partial<Record<EnquiryField, unknown>>,
  options: { neetRequired?: boolean } = {}
): ValidationResult<EnquiryValues> {
  const schema = options.neetRequired ? enquirySchemaWithNeet : enquirySchema;
  const result = schema.safeParse({
    name: input.name ?? '',
    email: input.email ?? '',
    mobile: input.mobile ?? '',
    courseInterest: input.courseInterest ?? '',
    neetScore: input.neetScore ?? '',
    message: input.message ?? '',
  });

  if (result.success) {
    return { ok: true, data: result.data, errors: {} };
  }

  return { ok: false, data: null, errors: toFieldErrors(result.error) };
}

export function getFirstError(errors: EnquiryErrors & Record<string, string>): string {
  const values = Object.values(errors);
  return values.length > 0 ? values[0] : 'Please check the highlighted fields';
}
