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
  });

  const handleUpdateJob = async (data: FieldValues, loadingToastId: string) => {
    // This part will be use when UPDATE the job
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

      if (res.ok) {
        const responseData = await res.json();

        setJobs([...jobs, responseData]);
        setIsDialogOpen(false); // Close dialog only on success
        const successToastId = toast.success("Member updated successfully");

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
      toast.error("Failed to add member, Try again");
      console.error(e);
    }
  };

  const handleAddJob = async (data: FieldValues, loadingToastId: string) => {
    try {
      const apiUrl = formatInternalUrl("/api/org/add-member");
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
        setJobs(responseData);
        setIsDialogOpen(false); // Close dialog only on success
        const successToastId = toast.success("Member added successfully");

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
      toast.error("Failed to add member, Try again");
      console.error(e);
    }
  };

  const onSubmit = async (data: FieldValues) => {
    // Show loading toast immediately when the request is sent
    const loadingToastId = toast.loading("Please wait...");

    if (isEditing) {
      // This part will be use when UPDATE the job
      handleUpdateJob(data, loadingToastId);
    } else {
      // This part will be use when CREATE the job
      handleAddJob(data, loadingToastId);
    }
    
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const apiUrl = formatInternalUrl("/api/org/1/get-jobs");
        const res = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();

    // end performance.now();
  }, [jobs.length]);

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
                  {...register("title")}
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
              <Label htmlFor="department" className="text-right">
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
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <div className="col-span-3">
                <Input
                  {...register("workplace")}
                  id="location"
                  className="col-span-3"
                />
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
                    <SelectValue placeholder="Select job type" />
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
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isEditing ? "Update Job" : "Add Job"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
