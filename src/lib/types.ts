import { z } from "zod";

// Job Adding
export const JobAdding = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  scope: z.string().min(1, { message: "Scope is required" }),
  prerequisite: z.array(z.string()).optional(),
  workplace: z.enum(["remote", "onsite", "hybrid"], { message: "Invalid workplace type" }),
  work_type: z.enum(["fulltime", "parttime", "contract", "internship"], { message: "Invalid work type" }),
  career_stage: z.enum(["entrylevel", "midlevel", "senior"], { message: "Invalid career stage" }),
  period: z.string().min(1, { message: "Period is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  hours_per_day: z.string()
                 .refine((val) => !isNaN(Number(val)) && Number(val) >= 1 && Number(val) <= 24, {
                  message: "Hours per day must be a number between 1 and 24" }),
  qualifications: z.string().min(1, { message: "Qualifications is required" }),
  benefits: z.string().min(1, { message: "Benefits is required" }),
  quantity: z.number().min(1, { message: "Quantity is required" }),
  salary: z.number()
          .min(1, { message: "Salary is required" }),
});

export type TJobAdding = z.infer<typeof JobAdding>;

export type Job = {
  id: string;
  title: string;
  scope: string;
  prerequisite: string[];
  workplace: "remote" | "onsite" | "hybrid";
  work_type: "fulltime" | "parttime" | "contract" | "internship";
  career_stage: "entrylevel" | "midlevel" | "senior";
  period: string;
  description: string;
  hours_per_day: string;
  qualifications: string;
  benefits: string;
  quantity: number;
  salary: number;
};
