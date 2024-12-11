import { z } from "zod";

// Job Adding
export const JobAdding = z.object({
  ID: z.number().optional(),
  title: z.string().min(1, { message: "Title is required" }),
  scope: z.string().min(1, { message: "Scope is required" }),
  prerequisite: z.array(z.string()).optional(),
  workplace: z.enum(["remote", "onsite", "hybrid"], {
    message: "Invalid workplace type",
  }),
  work_type: z.enum(["fulltime", "parttime", "volunteer", "internship"], {
    message: "Invalid work type",
  }),
  career_stage: z.enum(["entrylevel", "midlevel", "senior"], {
    message: "Invalid career stage",
  }),
  period: z.string().min(1, { message: "Period is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  hours_per_day: z
    .string()
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 1 && Number(val) <= 24,
      {
        message: "Hours per day must be a number between 1 and 24",
      }
    ),
  qualifications: z.string().min(1, { message: "Qualifications is required" }),
  benefits: z.string().min(1, { message: "Benefits is required" }),
  quantity: z.number().min(1, { message: "Quantity is required" }),
  salary: z.number().min(1, { message: "Salary is required" }),
});

export type TJobAdding = z.infer<typeof JobAdding>;

export type Job = {
  id: string;
  UpdatedAt: string;
  title: string;
  scope: string;
  prerequisite: string[];
  workplace: "remote" | "onsite" | "hybrid";
  work_type: "fulltime" | "parttime" | "volunteer" | "internship";
  career_stage: "entrylevel" | "midlevel" | "senior";
  period: string;
  description: string;
  hours_per_day: string;
  qualifications: string;
  benefits: string;
  quantity: number;
  salary: number;
};

export const OrganizationSchema = z.object({
  orgPic: z.object({}),
  bgPic: z.string().min(1, { message: "Background Picture URL is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  goal: z.array(z.string()),
  expertise: z.string().min(1, { message: "Expertise is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  subdistrict: z.string().min(1, { message: "Subdistrict is required" }),
  province: z.string().min(1, { message: "Province is required" }),
  postalCode: z.string().min(1, { message: "Postal Code is required" }),
  latitude: z.string().min(1, { message: "Latitude is required" }),
  longitude: z.string().min(1, { message: "Longitude is required" }),
  email: z.string().min(1, { message: "Email is required" }),
  phone: z.string().min(1, { message: "Phone is required" }),
  // orgContract: z.array(
  //   z.object({
  //     media: z.string().min(1, { message: "Media is required" }),
  //     mediaLink: z.string().min(1, { message: "Media Link is required" }),
  //   })
  // ),
  // industry: z.array(
  //   z.object({
  //     industry: z.string().min(1, { message: "Industry is required" }),
  //   })
  // ),
});

export type TOrganizationSchema = z.infer<typeof OrganizationSchema>;

export type Organization = {
  id: string;
  picUrl: string;
  bgPicUrl: string;
  name: string;
  goal: string[];
  expertise: string;
  location: string;
  subdistrict: string;
  province: string;
  postalCode: string;
  latitude: string;
  longitude: string;
  email: string;
  phone: string;
  orgContract: OrganizationContact[];
  industry: Industry[];
};

export type OrganizationContact = {
  id: string;
  organization: string;
  media: string;
  mediaLink: string;
};

export type Industry = {
  id: string;
  industry: string;
};
