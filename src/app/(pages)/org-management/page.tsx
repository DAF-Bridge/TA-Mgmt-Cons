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

type Member = {
  id: string;
  name: string;
  email: string;
  organization: string;
  role: "Admin" | "User";
};

export default function OrganizationManagement() {
  const [members, setMembers] = useState<Member[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      organization: "Chiang Mai University",
      role: "Admin",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      organization: "SE Thailand",
      role: "User",
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob@example.com",
      organization: "Chiang Mai University",
      role: "User",
    },
  ]);

  const [currentMember, setCurrentMember] = useState<Member>({
    id: "",
    name: "",
    email: "",
    organization: "",
    role: "User",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const openAddDialog = () => {
    setCurrentMember({
      id: "",
      name: "",
      email: "",
      organization: "",
      role: "User",
    });
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const openEditDialog = (member: Member) => {
    setCurrentMember(member);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const addOrUpdateMember = () => {
    // Show loading toast immediately when the request is sent
    // const loadingToastId = toast.loading("รอสักครู่...");

    if (currentMember.name && currentMember.email) {
      if (isEditing) {
        // POST
        // try {
        //   const apiUrl = formatInternalUrl("/api/org/add-member");
        //   const res = await fetch(apiUrl, {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(data), // Add more here
        //   });

        //   if (!res.ok) {
        //     throw new Error("Failed to add member");
        //   }

        //   //extract data here
        //   const responseData = await res.json();
        //   console.log(responseData);
        // } catch (e) {
        //   // add toast here
        //   toast.dismiss();
        //   toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
        //   console.error(e);
        // }
        setMembers(
          members.map((m) => (m.id === currentMember.id ? currentMember : m))
        );
      } else {
        // PUT
        setMembers([
          ...members,
          { ...currentMember, id: Date.now().toString() },
        ]);
      }
      setIsDialogOpen(false);
    }
  };

  const removeMember = (id: string) => {
    setMembers(members.filter((member) => member.id !== id));
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
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.organization}</TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mr-2"
                    onClick={() => openEditDialog(member)}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeMember(member.id)}
                  >
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
        <DialogContent className="sm:max-w-[425px]">
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
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={currentMember.name}
                onChange={(e) =>
                  setCurrentMember({ ...currentMember, name: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={currentMember.email}
                onChange={(e) =>
                  setCurrentMember({ ...currentMember, email: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="organization" className="text-right">
                Organization
              </Label>
              <Input
                id="organization"
                value={currentMember.organization}
                onChange={(e) =>
                  setCurrentMember({
                    ...currentMember,
                    organization: e.target.value,
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select
                onValueChange={(value: Member["role"]) =>
                  setCurrentMember({ ...currentMember, role: value })
                }
                defaultValue={currentMember.role}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Member">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={addOrUpdateMember}>
              {isEditing ? "Update Member" : "Add Member"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
