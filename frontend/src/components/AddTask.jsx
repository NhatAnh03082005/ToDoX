import { React, useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import api from "@/lib/axios";

export default function AddTask({ handleNewTaskAdded }) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const addTask = async () => {
    if (newTaskTitle.trim()) {
      try {
        await api.post("/task", {
          title: newTaskTitle,
        });
        toast.success(`Nhiệm vụ "${newTaskTitle}" đã được thêm thành công!`);
        handleNewTaskAdded();
      } catch (error) {
        console.error("Error adding task:", error);
        toast.error("Lỗi khi thêm nhiệm vụ.");
      }
    } else {
      toast.error("Tiêu đề nhiệm vụ không được để trống.");
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="text"
          placeholder="Add a new task..."
          className="h-12 text-base bg-gradient-50 sm:flex-1 border-border/50 focus:border-gradient focus:ring-2 focus:ring-gradient/50"
          value={newTaskTitle}
          onChange={(even) => setNewTaskTitle(even.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button
          variant="gradient"
          size="xl"
          className="px-6"
          onClick={addTask}
          disabled={!newTaskTitle.trim()}
        >
          <Plus className="size-5" />
          Thêm
        </Button>
      </div>
    </Card>
  );
}
