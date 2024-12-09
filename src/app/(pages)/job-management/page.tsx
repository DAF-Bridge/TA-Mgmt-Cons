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
import { Job, JobAdding, TJobAdding } from "@/lib/types";
import toast from "react-hot-toast";
import { formatInternalUrl } from "@/lib/utils";

export default function JobBoard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setValue,
    reset,
    watch,
  } = useForm<TJobAdding>({
    resolver: zodResolver(JobAdding),
    defaultValues: {
      title: "ML Engineer",
      scope: "Machine Learning Engineer",
      prerequisite: [],
      workplace: "remote",
      work_type: "fulltime",
      career_stage: "entrylevel",
      description: "help us to build the next big thing",
      hours_per_day: "8",
      qualifications: "at least 2 years of experience",
      benefits: "health insurance, paid time off",
      quantity: 1,
      salary: 15000,
    },
  });

  const handleUpdateJob = async (data: TJobAdding, loadingToastId: string) => {
    // This part will be use when UPDATE the job
    try {
      const apiUrl = formatInternalUrl("/api/org/1/update-job/1"); // Constant URL for now
      // console.log(apiUrl);
      const res = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, id: Date.now().toString() }),
      });

      // On-Recieve Response : Dismiss the loading toast once we have a response
      toast.dismiss(loadingToastId);

      if (res.ok) {
        const responseData = await res.json();

        // setJobs([...jobs, responseData]);
        // setJobs((prev) => [...prev, responseData]); // Add the new job to the state
        setJobs((prev) =>
          prev.map((job) =>
            job.id === responseData.id ? { ...job, ...responseData } : job
          )
        ); //update the state optimistically

        setIsDialogOpen(false); // Close dialog only on success
        const successToastId = toast.success("Job updated successfully");

        // Display toast for 5 minutes
        setTimeout(() => {
          toast.dismiss(successToastId);
        }, 1500);

        return;
      } else {
        //extract data here
        const responseData = await res.json();

        // set the errors to each field
        if (responseData.errors) {
          toast.error("Wrong Inputs");
          Object.entries(responseData.errors).forEach(([key, message]) => {
            setError(key as keyof TJobAdding, {
              type: "server",
              message: message as string,
            });
          });
        }
      }
    } catch (e) {
      toast.dismiss(loadingToastId);
      toast.error("Failed to update job, Try again");
      console.error(e);
    }
  };

  const handleAddJob = async (data: FieldValues, loadingToastId: string) => {
    try {
      const apiUrl = formatInternalUrl("/api/org/1/add-job"); // Constant URL for now
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Add more here
      });

      // On-Recieve Response : Dismiss the loading toast
      toast.dismiss(loadingToastId);

      if (res.ok) {
        const responseData = await res.json();

        // set the errors to each field
        // setJobs(responseData);
        setJobs((prev) =>
          prev.map((job) =>
            job.id === responseData.id ? { ...job, ...responseData } : job
          )
        ); //update the state optimistically

        setIsDialogOpen(false); // Close dialog only on success
        const successToastId = toast.success("Job added successfully");

        // Display toast for 1.5 sec
        setTimeout(() => {
          toast.dismiss(successToastId);
        }, 1500);

        return;
      } else {
        //extract data here
        const responseData = await res.json();

        // set the errors to each field
        if (responseData.errors) {
          toast.error("Wrong Inputs");
          Object.entries(responseData.errors).forEach(([key, message]) => {
            setError(key as keyof TJobAdding, {
              type: "server",
              message: message as string,
            });
          });
        }
      }
    } catch (e) {
      // add toast here
      toast.dismiss();
      toast.error("Failed to add job, Try again");
      console.error(e);
    }
  };

  const onSubmit = async (data: TJobAdding) => {
    console.log("Form submitted", data);

    // Show loading toast immediately when the request is sent
    const loadingToastId = toast.loading("Please wait...");

    if (isEditing) {
      // This part will be use when UPDATE the job
      handleUpdateJob(data, loadingToastId);
    }
    if (!isEditing) {
      // This part will be use when CREATE the job
      handleAddJob(data, loadingToastId);
    }
  };

  // useEffect(() => {
  //   const fetchJobs = async () => {
  //     try {
  //       const apiUrl = formatInternalUrl("/api/org/1/get-jobs");
  //       const res = await fetch(apiUrl, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (!res.ok) {
  //         throw new Error("Failed to fetch jobs");
  //       }

  //       const data = await res.json();
  //       setJobs(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchJobs();
  // }, [jobs.length]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(formatInternalUrl("/api/org/1/get-jobs"));
        if (!res.ok) throw new Error("Failed to fetch jobs");
        setJobs(await res.json());
      } catch (error) {
        console.error(error);
      }
    };
    fetchJobs();
  }, []);

  const openAddDialog = () => {
    reset();
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const openEditDialog = (job: Job) => {
    reset();
    // Loop through job fields and set each field value in React Hook Form
    Object.keys(job).forEach((key) => {
      // Set each form field dynamically using the setValue method
      setValue(key as keyof TJobAdding, job[key as keyof Job]);
    });

    setIsEditing(true);
    setIsDialogOpen(true);
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
                <TableCell>{job.work_type}</TableCell>
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

          <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <div className="col-span-3">
                <Input
                  {...register("title", { required: true })}
                  id="title"
                  className="col-span-3"
                />
                {errors.title && (
                  <span className="error-msg">
                    {errors.title.message as string}
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="scope" className="text-right">
                Scope
              </Label>
              <div className="col-span-3">
                <Input
                  {...register("scope")}
                  id="scope"
                  className="col-span-3"
                />
                {errors.scope && (
                  <span className="error-msg">
                    {errors.scope.message as string}
                  </span>
                )}
                {/* {typeof watch("scope")} */}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="prerequisite" className="text-right">
                Prerequisite
              </Label>
              <div className="col-span-3">
                <Textarea
                  {...register("prerequisite", {
                    setValueAs: (value) =>
                      typeof value === "string"
                        ? value.split(",").map((item: string) => item.trim())
                        : value, // Check if value is a string
                  })}
                  id="prerequisite"
                  className="w-full"
                  placeholder="Enter prerequisites separated by commas"
                />
                {errors.prerequisite && (
                  <span className="error-msg">
                    {errors.prerequisite.message as string}
                  </span>
                )}
                {/* {typeof watch("prerequisite")} */}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="workplace" className="text-right">
                Work Place
              </Label>
              <div className="col-span-3">
                <Select
                  {...register("workplace")}
                  value={watch("workplace")}
                  onValueChange={(value: Job["workplace"]) => {
                    setValue("workplace", value);
                  }}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select workplace type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="onsite">On-site</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
                {errors.workplace && (
                  <span className="error-msg">
                    {errors.workplace.message as string}
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="work_type" className="text-right">
                Work Type
              </Label>
              <div className="col-span-3">
                <Select
                  {...register("work_type")}
                  value={watch("work_type")}
                  onValueChange={(value: Job["work_type"]) => {
                    setValue("work_type", value);
                  }}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select work type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fulltime">Full-time</SelectItem>
                    <SelectItem value="parttime">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
                {errors.work_type && (
                  <span className="error-msg">
                    {errors.work_type.message as string}
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="career stage" className="text-right">
                Career Stage
              </Label>
              <div className="col-span-3">
                <Select
                  {...register("career_stage")}
                  value={watch("career_stage")}
                  onValueChange={(value: Job["career_stage"]) => {
                    setValue("career_stage", value);
                  }}
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
                {errors.career_stage && (
                  <span className="error-msg">
                    {errors.career_stage.message as string}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <div className="col-span-3">
                <Textarea
                  {...register("description")}
                  id="description"
                  className="w-full"
                />
                {errors.description && (
                  <span className="error-msg">
                    {errors.description.message as string}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="hours_per_day" className="text-right">
                Hours per day
              </Label>
              <div className="col-span-3">
                <Input
                  {...register("hours_per_day")}
                  id="hours_per_day"
                  type="text"
                  className="col-span-3"
                />
                {errors.hours_per_day && (
                  <span className="error-msg">
                    {errors.hours_per_day.message as string}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="qualifications" className="text-right">
                Qualifications
              </Label>
              <div className="col-span-3">
                <Input
                  {...register("qualifications")}
                  id="qualifications"
                  className="col-span-3"
                />
                {errors.qualifications && (
                  <span className="error-msg">
                    {errors.qualifications.message as string}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="benefits" className="text-right">
                Benefits
              </Label>
              <div className="col-span-3">
                <Input
                  {...register("benefits")}
                  id="benefits"
                  className="col-span-3"
                />
                {errors.benefits && (
                  <span className="error-msg">
                    {errors.benefits.message as string}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <div className="col-span-3">
                <Input
                  {...register("quantity", {
                    setValueAs: (value) => Number(value) || 0, // Convert input value to a number
                  })}
                  id="quantity"
                  type="number"
                  className="col-span-3"
                />
                {errors.quantity && (
                  <span className="error-msg">
                    {errors.quantity.message as string}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="salary" className="text-right">
                Salary
              </Label>
              <div className="col-span-3">
                <Input
                  {...register("salary", {
                    setValueAs: (value) => Number(value) || 0, // Convert input value to a number
                  })}
                  id="salary"
                  type="number"
                  className="col-span-3"
                />
                {errors.salary && (
                  <span className="error-msg">
                    {errors.salary.message as string}
                  </span>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
              >
                {isEditing ? "Update Job" : "Add Job"}
              </Button>
              <Button
                variant="secondary"
                className="bg-red-500 text-white hover:bg-red-600"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
