"use client";

import { Job, JobAdding, TJobAdding } from "@/lib/types";
import { columns } from "./columns";
import { JobDataTable } from "./data-table";
import { useEffect, useState } from "react";
import { formatInternalUrl } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import JobDialog from "./job-dialog";

export default function JobBoard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<TJobAdding>({
    resolver: zodResolver(JobAdding),
  });

  const fetchJobs = async () => {
    try {
      setIsLoading(true); // Ensure loading is set to true at the start
      const apiUrl = formatInternalUrl("/api/org/1/get-jobs");
      const res = await fetch(apiUrl, {
        cache: "no-cache",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Failed to fetch jobs");
      const resData = await res.json();
      // console.log(resData);
      setJobs(resData);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch jobs"); // Optional: show error toast
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchJobs();
  }, []);

  const onSubmit = async (data: TJobAdding) => {
    try {
      const apiUrl = isEditing
        ? formatInternalUrl(`/api/org/1/update-job/${data.ID}`)
        : formatInternalUrl("/api/org/1/add-job");

      const method = isEditing ? "PUT" : "POST";
      const loadingMessage = isEditing ? "Updating job..." : "Adding job...";
      const successMessage = isEditing
        ? "Job updated successfully"
        : "Job added successfully";

      const loadingToastId = toast.loading(loadingMessage);

      const res = await fetch(apiUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      toast.dismiss(loadingToastId);

      if (res.ok) {
        setIsDialogOpen(false);
        toast.success(successMessage, { duration: 1500 });
        await fetchJobs();
      } else {
        const responseData = await res.json();
        // set the errors to each field
        if (responseData.errors) {
          toast.error("Wrong Inputs");
          Object.entries(responseData.errors).forEach(([key, message]) => {
            form.setError(key as keyof TJobAdding, {
              type: "server",
              message: message as string,
            });
          });
        }
      }
    } catch (e) {
      toast.error(`Failed to ${isEditing ? "update" : "add"} job, Try again`);
      console.error(e);
    }
  };

  const openAddDialog = () => {
    form.reset();
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const openEditDialog = (job: Job) => {
    form.reset();
    // Loop through job fields and set each field value in React Hook Form
    Object.keys(job).forEach((key) => {
      form.setValue(key as keyof TJobAdding, job[key as keyof Job]);
    });

    setIsEditing(true);
    setIsDialogOpen(true);
  };

  // const removeJob = (id: string) => {
  //   setJobs(jobs.filter((job) => job.id !== id));
  // };

  return (
    <div className="container mx-auto px-2 py-10">
      <h1 className="text-3xl font-bold mb-2">Job Board</h1>
      <div className="mb-8">
        <div className="flex flex-row justify-between mb-4">
          <p className="text-base text-muted-foreground">
            Manage available job positions in you organization
          </p>
        </div>
        <JobDataTable
          columns={columns(openEditDialog)}
          data={jobs}
          openAddDialog={openAddDialog}
          isLoading={isLoading}
          // onDelete={removeJob}
        />
      </div>
      {/* // This is the dialog to add or edit a job */}
      <JobDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        form={form}
        onSubmit={onSubmit}
        isEditing={isEditing}
        setIsDialogOpen={setIsDialogOpen}
      />
    </div>
  );
}
