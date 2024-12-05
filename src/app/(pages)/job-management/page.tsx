"use client";

import { useState } from "react";
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
  DialogTrigger,
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

type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
  description: string;
};

export default function JobBoard() {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "1",
      title: "Software Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description:
        "We are looking for a skilled software engineer to join our team.",
    },
    {
      id: "2",
      title: "Product Manager",
      department: "Product",
      location: "New York",
      type: "Full-time",
      description:
        "Seeking an experienced product manager to lead our product development efforts.",
    },
    {
      id: "3",
      title: "UX Designer",
      department: "Design",
      location: "San Francisco",
      type: "Contract",
      description:
        "Join our design team to create beautiful and intuitive user experiences.",
    },
  ]);

  const [newJob, setNewJob] = useState<Job>({
    id: "",
    title: "",
    department: "",
    location: "",
    type: "Full-time",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const addOrUpdateJob = () => {
    if (
      newJob.title &&
      newJob.department &&
      newJob.location &&
      newJob.description
    ) {
      if (isEditing) {
        setJobs(jobs.map((job) => (job.id === newJob.id ? newJob : job)));
      } else {
        setJobs([...jobs, { ...newJob, id: Date.now().toString() }]);
      }
      setNewJob({
        id: "",
        title: "",
        department: "",
        location: "",
        type: "Full-time",
        description: "",
      });
      setIsEditing(false);
    }
  };

  const editJob = (job: Job) => {
    setNewJob(job);
    setIsEditing(true);
  };

  const removeJob = (id: string) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Job Board</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Open Positions</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.department}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.type}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mr-2"
                    onClick={() => editJob(job)}
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

      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Job
          </Button>
        </DialogTrigger>
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
                id="title"
                value={newJob.title}
                onChange={(e) =>
                  setNewJob({ ...newJob, title: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Department
              </Label>
              <Input
                id="department"
                value={newJob.department}
                onChange={(e) =>
                  setNewJob({ ...newJob, department: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                value={newJob.location}
                onChange={(e) =>
                  setNewJob({ ...newJob, location: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select
                onValueChange={(value: Job["type"]) =>
                  setNewJob({ ...newJob, type: value })
                }
                defaultValue={newJob.type}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={newJob.description}
                onChange={(e) =>
                  setNewJob({ ...newJob, description: e.target.value })
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
