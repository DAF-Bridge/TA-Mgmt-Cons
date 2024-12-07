"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusIcon, TrashIcon, PencilIcon } from "lucide-react";
import { useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { JobAdding, TJobAdding } from "@/lib/types";
import toast from "react-hot-toast";
import { formatInternalUrl } from "@/lib/utils";

type Job = {
  id: string;
  title: string;
  scope: string;
  prerequisite: string[];
  workplace: string;
  worktype: "fulltime" | "parttime" | "contract" | "internship";
  career_stage: "entrylevel" | "mid-level" | "senior";
  period: string;
  description: string;
  hours_per_day: string;
  qualifications: string;
  benefits: string;
  quantity: string;
  salary: string;
};

export default function JobBoard() {
  // const [jobs, setJobs] = useState<Job[]>([
  //   {
  //     id: "1",
  //     title: "Software Engineer",
  //     scope: "Develop and maintain software applications.",
  //     prerequisite: [
  //       "Experience with JavaScript",
  //       "Knowledge of cloud platforms",
  //     ],
  //     workplace: "Remote",
  //     worktype: "fulltime",
  //     career_stage: "entrylevel",
  //     period: "Indefinite",
  //     description:
  //       "We are looking for a skilled software engineer to join our team.",
  //     hours_per_day: "8",
  //     qualifications:
  //       "Bachelor's degree in Computer Science or equivalent experience.",
  //     benefits: "Health insurance, Remote work options, Paid leave",
  //     quantity: "3",
  //     salary: "$80,000 - $100,000 per year",
  //   },
  //   {
  //     id: "2",
  //     title: "Product Manager",
  //     scope: "Lead product development and coordinate across teams.",
  //     prerequisite: [
  //       "3+ years of product management experience",
  //       "Strong communication skills",
  //     ],
  //     workplace: "New York",
  //     worktype: "fulltime",
  //     career_stage: "entrylevel",
  //     period: "Indefinite",
  //     description:
  //       "Seeking an experienced product manager to lead our product development efforts.",
  //     hours_per_day: "8",
  //     qualifications:
  //       "Bachelor's degree in Business, Marketing, or related field.",
  //     benefits: "Health insurance, 401(k) match, Relocation assistance",
  //     quantity: "1",
  //     salary: "$100,000 - $120,000 per year",
  //   },
  //   {
  //     id: "3",
  //     title: "UX Designer",
  //     scope: "Design intuitive and engaging user experiences.",
  //     prerequisite: [
  //       "Portfolio of UX design work",
  //       "Proficiency in design tools",
  //     ],
  //     workplace: "San Francisco",
  //     worktype: "contract",
  //     career_stage: "entrylevel",
  //     period: "6 months",
  //     description:
  //       "Join our design team to create beautiful and intuitive user experiences.",
  //     hours_per_day: "6",
  //     qualifications:
  //       "Degree in Design or related field, or equivalent experience.",
  //     benefits: "Flexible work hours",
  //     quantity: "2",
  //     salary: "$50 - $70 per hour",
  //   },
  // ]);

  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const apiUrl = formatInternalUrl("/api/org/1/get-jobs");
        const res = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jobs),
        });

        if (!res.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const data = await res.json();
        setJobs(data);
        console.log("Jobs stored successfully:", data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch jobs");
      }
    };
    if (jobs.length > 0) {
      fetchJobs();
    }

    // fetchJobs();
  }, [jobs]);

  const [currentJob, setCurrentJob] = useState<Job>({
    id: "",
    title: "",
    scope: "",
    prerequisite: [""],
    workplace: "",
    worktype: "fulltime",
    career_stage: "entrylevel",
    period: "",
    description: "",
    hours_per_day: "",
    qualifications: "",
    benefits: "",
    quantity: "",
    salary: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const openAddDialog = () => {
    setCurrentJob({
      id: "",
      title: "",
      scope: "",
      prerequisite: [""],
      workplace: "",
      worktype: "fulltime",
      career_stage: "entrylevel",
      period: "",
      description: "",
      hours_per_day: "",
      qualifications: "",
      benefits: "",
      quantity: "",
      salary: "",
    });
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const openEditDialog = (job: Job) => {
    setCurrentJob(job);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const { register } = useForm<TJobAdding>({
    resolver: zodResolver(JobAdding),
  });

  const addOrUpdateJob = async (data: FieldValues) => {
    // Show loading toast immediately when the request is sent
    const loadingToastId = toast.loading("รอสักครู่...");
    if (
      currentJob.title &&
      currentJob.scope &&
      currentJob.prerequisite &&
      currentJob.workplace &&
      currentJob.worktype &&
      currentJob.career_stage &&
      currentJob.period &&
      currentJob.description &&
      currentJob.hours_per_day &&
      currentJob.qualifications &&
      currentJob.benefits &&
      currentJob.quantity &&
      currentJob.salary
    ) {
      if (isEditing) {
        // POST
        try {
          const apiUrl = formatInternalUrl("/api/org/add-member");
          const res = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data), // Add more here
          });

          if (!res.ok) {
            throw new Error("Failed to add member");
          }

          //extract data here
          const responseData = await res.json();
          console.log(responseData);
        } catch (e) {
          // add toast here
          toast.dismiss();
          toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
          console.error(e);
        }
        setJobs(
          jobs.map((job) => (job.id === currentJob.id ? currentJob : job))
        );
      } else {
        // PUT
        try {
          const apiUrl = formatInternalUrl("/api/org/update-member");
          const res = await fetch(apiUrl, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...data, id: Date.now().toString() }),
          });

          // On-Recieve Response : Dismiss the loading toast once we have a response
          toast.dismiss(loadingToastId);

          if (!res.ok) {
            throw new Error("Failed to update member");
          }

          const responseData = await res.json();
          console.log(responseData); // Handle the response data

          setJobs([...jobs, { ...currentJob, id: Date.now().toString() }]);
        } catch (e) {
          toast.dismiss(loadingToastId);
          toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
          console.error(e);
        }
        // setJobs([...jobs, { ...currentJob, id: Date.now().toString() }]);
      }
      setIsDialogOpen(false);
    }
  };

  const removeJob = (id: string) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Job Board</h1>
      <div className="mb-8">
        <div className="flex flex-row justify-between">
          <h2 className="text-2xl font-semibold mb-4">Open Positions</h2>
          {/* // This is the button to add a new job */}
          <Button onClick={openAddDialog}>
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Job
          </Button>
        </div>
        {/* // This is the table to display the list of jobs */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Workplace</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Career Stage</TableHead>
              <TableHead>period</TableHead>
              <TableHead>Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.workplace}</TableCell>
                <TableCell>{job.worktype}</TableCell>
                <TableCell>{job.career_stage}</TableCell>
                <TableCell>{job.period}</TableCell>
                <TableCell>{job.quantity}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mr-2"
                    onClick={() => openEditDialog(job)}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeJob(job.id)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* // This is the dialog to add or edit a job */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Job" : "Add New Job"}</DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Edit the details of the job listing here."
                : "Enter the details of the new job listing here."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                {...register("title")}
                id="title"
                value={currentJob.title}
                onChange={(e) =>
                  setCurrentJob({ ...currentJob, title: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Scope
              </Label>
              <Input
                {...register("scope")}
                id="scope"
                value={currentJob.scope}
                onChange={(e) =>
                  setCurrentJob({ ...currentJob, scope: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                {...register("workplace")}
                id="location"
                value={currentJob.workplace}
                onChange={(e) =>
                  setCurrentJob({ ...currentJob, workplace: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="worktype" className="text-right">
                WorkType
              </Label>
              <Select
                {...register("worktype")}
                onValueChange={(value: Job["worktype"]) =>
                  setCurrentJob({ ...currentJob, worktype: value })
                }
                defaultValue={currentJob.worktype}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fulltime">Full-time</SelectItem>
                  <SelectItem value="parttime">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="career stage" className="text-right">
                Career Stage
              </Label>
              <Select
                {...register("carreer_stage")}
                onValueChange={(value: Job["career_stage"]) =>
                  setCurrentJob({ ...currentJob, career_stage: value })
                }
                defaultValue={currentJob.career_stage}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select career stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entrylevel">Entry-level</SelectItem>
                  <SelectItem value="midlevel">Mid-level</SelectItem>
                  <SelectItem value="senior">Senior</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                {...register("description")}
                id="description"
                value={currentJob.description}
                onChange={(e) =>
                  setCurrentJob({ ...currentJob, description: e.target.value })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={addOrUpdateJob}>
              {isEditing ? "Update Job" : "Add Job"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
