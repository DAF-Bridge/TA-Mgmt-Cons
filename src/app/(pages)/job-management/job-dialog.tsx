import { UseFormReturn } from "react-hook-form";
import { Job, TJobAdding } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface JobDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<TJobAdding>;
  onSubmit: (data: TJobAdding) => Promise<void>;
  isEditing: boolean;
  setIsDialogOpen: (open: boolean) => void;
}

export default function JobDialog({
  open,
  onOpenChange,
  form: {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  },
  onSubmit,
  isEditing,
  setIsDialogOpen,
}: Readonly<JobDialogProps>) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Job" : "Add New Job"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Edit the details of the job listing here."
              : "Enter the details of the new job listing here."}
          </DialogDescription>
        </DialogHeader>

        <form
          className="grid gap-4 py-4"
          onSubmit={handleSubmit(onSubmit, (errors) =>
            console.log("errors", errors)
          )}
        >
          <input
            type="hidden"
            id="orgId"
            {...register("ID", {
              required: false,
              setValueAs: (value) => (value === "" ? undefined : Number(value)),
            })}
          />
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Job Title
            </Label>
            <div className="col-span-3">
              <Input {...register("title")} id="title" className="col-span-3" />
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
              <Textarea
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
                  <SelectItem value={WorkPlaceEnum.REMOTE.value}>
                    {WorkPlaceEnum.REMOTE.label}
                  </SelectItem>
                  <SelectItem value={WorkPlaceEnum.ON_SITE.value}>
                    {WorkPlaceEnum.ON_SITE.label}
                  </SelectItem>
                  <SelectItem value={WorkPlaceEnum.HYBRID.value}>
                    {WorkPlaceEnum.HYBRID.label}
                  </SelectItem>
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
                  <SelectItem value={WorkTypeEnum.FULL_TIME.value}>
                    {WorkTypeEnum.FULL_TIME.label}
                  </SelectItem>
                  <SelectItem value={WorkTypeEnum.PART_TIME.value}>
                    {WorkTypeEnum.PART_TIME.label}
                  </SelectItem>
                  <SelectItem value={WorkTypeEnum.INTERN.value}>
                    {WorkTypeEnum.INTERN.label}
                  </SelectItem>
                  <SelectItem value={WorkTypeEnum.VOLUNTEER.value}>
                    {WorkTypeEnum.VOLUNTEER.label}
                  </SelectItem>
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
                  <SelectItem value={CareerStageEnum.ENTRY_LEVEL.value}>
                    {CareerStageEnum.ENTRY_LEVEL.label}
                  </SelectItem>
                  <SelectItem value={CareerStageEnum.MID_LEVEL.value}>
                    {CareerStageEnum.MID_LEVEL.label}
                  </SelectItem>
                  <SelectItem value={CareerStageEnum.SENIOR_LEVEL.value}>
                    {CareerStageEnum.SENIOR_LEVEL.label}
                  </SelectItem>
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
            <Label htmlFor="period" className="text-right">
              Work Period
            </Label>
            <div className="col-span-3">
              <Input
                {...register("period")}
                id="period"
                type="text"
                className="col-span-3"
              />
              {errors.period && (
                <span className="error-msg">
                  {errors.period.message as string}
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
              <Textarea
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
              <Textarea
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
              variant="secondary"
              disabled={isSubmitting}
              type="button"
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
            >
              {isEditing ? "Update Job" : "Add Job"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const WorkPlaceEnum = {
  REMOTE: {
    value: "remote",
    label: "Remote",
  },
  ON_SITE: {
    value: "onsite",
    label: "On-site",
  },
  HYBRID: {
    value: "hybrid",
    label: "Hybrid",
  },
};

const WorkTypeEnum = {
  FULL_TIME: {
    value: "fulltime",
    label: "Full-time",
  },
  PART_TIME: {
    value: "parttime",
    label: "Part-time",
  },
  VOLUNTEER: {
    value: "volunteer",
    label: "Volunteer",
  },
  INTERN: {
    value: "internship",
    label: "Internship",
  },
};

const CareerStageEnum = {
  ENTRY_LEVEL: {
    value: "entrylevel",
    label: "Entry-level",
  },
  MID_LEVEL: {
    value: "midlevel",
    label: "Mid-level",
  },
  SENIOR_LEVEL: {
    value: "senior",
    label: "Senior",
  },
};
