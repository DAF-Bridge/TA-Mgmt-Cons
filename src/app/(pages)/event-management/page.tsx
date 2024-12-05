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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, PlusIcon, TrashIcon, PencilIcon } from "lucide-react";

type Event = {
  id: string;
  title: string;
  date: Date;
  location: string;
  description: string;
};

export const runtime = "edge";

export default function EventManagement() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Annual Company Picnic",
      date: new Date(2024, 6, 15),
      location: "Central Park",
      description: "Join us for food, games, and team building!",
    },
    {
      id: "2",
      title: "Q4 Planning Meeting",
      date: new Date(2024, 8, 1),
      location: "Conference Room A",
      description: "Quarterly planning session for all department heads.",
    },
    {
      id: "3",
      title: "Tech Talk: AI in Business",
      date: new Date(2024, 7, 10),
      location: "Auditorium",
      description:
        "Guest speaker on the impact of AI in modern business practices.",
    },
  ]);

  const [newEvent, setNewEvent] = useState<Event>({
    id: "",
    title: "",
    date: new Date(),
    location: "",
    description: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const addOrUpdateEvent = () => {
    if (newEvent.title && newEvent.location && newEvent.description) {
      if (isEditing) {
        setEvents(
          events.map((event) => (event.id === newEvent.id ? newEvent : event))
        );
      } else {
        setEvents([...events, { ...newEvent, id: Date.now().toString() }]);
      }
      setNewEvent({
        id: "",
        title: "",
        date: new Date(),
        location: "",
        description: "",
      });
      setIsEditing(false);
      setIsDialogOpen(false);
    }
  };

  const editEvent = (event: Event) => {
    setNewEvent(event);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const removeEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Event Management</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.title}</TableCell>
                <TableCell>{format(event.date, "PPP")}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mr-2"
                    onClick={() => editEvent(event)}
                  >
                    <PencilIcon className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeEvent(event.id)}
                  >
                    <TrashIcon className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => {
              setIsEditing(false);
              setNewEvent({
                id: "",
                title: "",
                date: new Date(),
                location: "",
                description: "",
              });
            }}
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Event" : "Add New Event"}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Edit the details of the event here."
                : "Enter the details of the new event here."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !newEvent.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newEvent.date ? (
                      format(newEvent.date, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={newEvent.date}
                    onSelect={(date) =>
                      date && setNewEvent({ ...newEvent, date })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                value={newEvent.location}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, location: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={addOrUpdateEvent}>
              {isEditing ? "Update Event" : "Add Event"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
