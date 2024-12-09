"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useForm } from "react-hook-form";
import {
  Organization,
  OrganizationSchema,
  TOrganizationSchema,
} from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";

export default function OrganizationManagement() {
  const [orgs, setOrgs] = useState<Organization[]>([]);
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
  } = useForm<TOrganizationSchema>({
    resolver: zodResolver(OrganizationSchema),
  });

  const openAddDialog = () => {
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const openEditDialog = () => {
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const onSubmit = () => {
    setIsDialogOpen(false);
  };

  const removeMember = (id: string) => {
    setOrgs(orgs.filter((org) => org.id !== id));
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Organization Management</h1>
      <div className="mb-8">
        <div className="flex flex-row justify-between">
          <h2 className="text-2xl font-semibold mb-4">Members</h2>
          {/* // This is the button to add a new member */}
          <Button onClick={openAddDialog}>
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Member
          </Button>
        </div>
        {/* // This is the table of members */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orgs.map((org) => (
              <TableRow key={org.id}>
                <TableCell>{org.name}</TableCell>
                <TableCell>{org.email}</TableCell>
                <TableCell>{org.phone}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mr-2"
                    onClick={() => openEditDialog()}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* // This is the dialog to add or edit a member */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Member" : "Add New Member"}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Edit the details of the organization member here."
                : "Enter the details of the new organization member here."}
            </DialogDescription>
          </DialogHeader>
          <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="orgPic" className="text-right">
                Add Picture
              </Label>
              <div className="col-span-3">
                <Input
                  {...register("orgPic")}
                  id="orgPic"
                  type="file"
                  // value={currentMember.name}
                  // onChange={(e) =>
                  //   setCurrentMember({ ...currentMember, name: e.target.value })
                  // }
                  className="col-span-3"
                />
                {
                  <span className="error-msg">
                    {watch("orgPic") as string}
                  </span>
                }
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bgPic" className="text-right">
                Add Background Image
              </Label>
              <div className="col-span-3">
                <Input
                  {...register("bgPic")}
                  id="bgPic"
                  type="file"
                  // value={currentMember.name}
                  // onChange={(e) =>
                  //   setCurrentMember({ ...currentMember, name: e.target.value })
                  // }
                  className="col-span-3"
                />
                {errors.bgPic && (
                  <span className="error-msg">
                    {errors.bgPic.message as string}
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Organization Name
              </Label>
              <div className="col-span-3">
                <Input
                  {...register("name")}
                  id="name"
                  // value={currentMember.name}
                  // onChange={(e) =>
                  //   setCurrentMember({ ...currentMember, name: e.target.value })
                  // }
                  className="col-span-3"
                />
                {errors.name && (
                  <span className="error-msg">
                    {errors.name.message as string}
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <div className="col-span-3">
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  // value={currentMember.email}
                  // onChange={(e) =>
                  //   setCurrentMember({ ...currentMember, email: e.target.value })
                  // }
                  className="col-span-3"
                />
                {errors.email && (
                  <span className="error-msg">
                    {errors.email.message as string}
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone No.
              </Label>
              <div className="col-span-3">
                <Input
                  {...register("phone")}
                  id="phone"
                  // value={currentMember.organization}
                  // onChange={(e) =>
                  //   setCurrentMember({
                  //     ...currentMember,
                  //     organization: e.target.value,
                  //   })
                  // }
                  className="col-span-3"
                />
                {errors.phone && (
                  <span className="error-msg">
                    {errors.phone.message as string}
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="expertise" className="text-right">
                Business Expertise
              </Label>
              <div className="col-span-3">
                <Input
                  {...register("expertise")}
                  id="expertise"
                  // value={currentMember.organization}
                  // onChange={(e) =>
                  //   setCurrentMember({
                  //     ...currentMember,
                  //     organization: e.target.value,
                  //   })
                  // }
                  className="col-span-3"
                />
                {errors.expertise && (
                  <span className="error-msg">
                    {errors.expertise.message as string}
                  </span>
                )}
              </div>
            </div>{" "}
            <DialogFooter>
              <Button type="submit">
                {isEditing ? "Update Member" : "Add Member"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
