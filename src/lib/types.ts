import { z } from "zod";

// Job Adding
export const JobAdding = z.object({
  title: z.string().min(1, { message: "Title is required" }),//
  scope: z.string().min(1, { message: "Scope is required" }),//
  prerequisite: z.array(z.string()),
  workplace: z.string().min(1, { message: "Workplace is required" }),//
  work_type: z.string().min(1, { message: "Worktype is required" }),//
  career_stage: z.string().min(1, { message: "Carreer stage is required" }),//
  period: z.string().min(1, { message: "Period is required" }),
  description: z.string().min(1, { message: "Description is required" }),//
  hours_per_day: z.string().min(1, { message: "Hours per day is required" }),
  qualifications: z.string().min(1, { message: "Qualifications is required" }),
  benefits: z.string().min(1, { message: "Benefits is required" }),
  quantity: z.string().min(1, { message: "Quantity is required" }),
  salary: z.string().min(1, { message: "Salary is required" }),
});

export type TJobAdding = z.infer<typeof JobAdding>;

export type Job = {
  id: string;
  title: string;
  scope: string;
  prerequisite: string[];
  workplace: string;
  work_type: "fulltime" | "parttime" | "contract" | "internship";
  career_stage: "entrylevel" | "mid-level" | "senior";
  period: string;
  description: string;
  hours_per_day: string;
  qualifications: string;
  benefits: string;
  quantity: string;
  salary: string;
};
