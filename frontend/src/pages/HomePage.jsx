import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import AddTask from "@/components/AddTask";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import api from "@/lib/axios";
import { visibleTaskLimit } from "@/lib/data";

const HomePage = () => {
  const [tasksBuffer, setTasksBuffer] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [completeCount, setCompleteCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState("today");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTasks();
  }, [dateQuery]);

  useEffect(() => {
    setPage(1);
  }, [filter]);

  const fetchTasks = async () => {
    try {
      const res = await api.get(`/task?filter=${dateQuery}`);
      setTasksBuffer(res.data.tasks);
      setActiveCount(res.data.activeCount);
      setCompleteCount(res.data.completeCount);
      console.log("Fetched tasks:", res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Lỗi khi truy xuất dữ liệu.");
    }
  };

  const filteredTasks = tasksBuffer.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";
      case "completed":
        return task.status === "complete";
      default:
        return true;
    }
  });

  const visibleTasks = filteredTasks.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit,
  );

  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleTaskChanged = () => {
    fetchTasks();
  };

  if (visibleTasks.length === 0 && filteredTasks.length > 0) {
    handlePrev();
  }

  return (
    <div className="min-h-screen w-full relative">
      {/* Radial Gradient Background from Bottom */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)",
        }}
      />
      {/* Your Content/Components */}
      <div className="container pt-8 mx-auto relative z-10">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          <Header />

          <AddTask handleNewTaskAdded={handleTaskChanged} />

          <StatsAndFilters
            filter={filter}
            setFilter={setFilter}
            activeTasksCount={activeCount}
            completedTasksCount={completeCount}
          />

          <TaskList
            filteredTasks={visibleTasks}
            filter={filter}
            handleTaskChanged={handleTaskChanged}
          />

          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination
              page={page}
              totalPages={totalPages}
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePageChange={handlePageChange}
            />
            <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
          </div>

          <Footer
            activeTasksCount={activeCount}
            completedTasksCount={completeCount}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
