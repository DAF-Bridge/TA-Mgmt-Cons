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
  role: "Moderator" | "Employee";
};

export default function OrgManagement() {
  const [members, setMembers] = useState<Member[]>([
    { id: "1", name: "John Doe", email: "john@example.com", role: "Moderator" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "Employee" },
    { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "Employee" },
  ]);

  const [currentMember, setCurrentMember] = useState<Member>({
    id: "",
    name: "",
    email: "",
    role: "Employee",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const openAddDialog = () => {
    setCurrentMember({ id: "", name: "", email: "", role: "Employee" });
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const openEditDialog = (member: Member) => {
    setCurrentMember(member);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const addOrUpdateMember = () => {
    if (currentMember.name && currentMember.email) {
      if (isEditing) {
        setMembers(
          members.map((m) => (m.id === currentMember.id ? currentMember : m))
        );
      } else {
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
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
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
                  <SelectItem value="Moderator">Moderator</SelectItem>
                  <SelectItem value="Member">Employee</SelectItem>
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
