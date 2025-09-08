import { useState, useMemo, useEffect } from "react";
import type { TaskEntity } from "../types/task-entity";
import { TaskStatus } from "../enums/task-status";
import { filterTasks, sortTasks } from "../utils/task-utils";
import { taskApi } from "../services/task-api";

export const useTaskManager = () => {
  const [tasks, setTasks] = useState<TaskEntity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<keyof TaskEntity>("priority");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [editing, setEditing] = useState<TaskEntity | null>(null);
  const [form, setForm] = useState<TaskEntity>({
    key: "",
    name: "",
    priority: 1,
    status: TaskStatus.NotStarted,
  });

  // Load tasks on mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTasks = await taskApi.getAllTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedTasks = useMemo(() => {
    const filtered = filterTasks(tasks, filter);
    return sortTasks(filtered, sortBy, sortDir);
  }, [tasks, filter, sortBy, sortDir]);

  const handleDelete = async (key: string) => {
    try {
      setLoading(true);
      setError(null);
      await taskApi.deleteTask(key);
      setTasks((prev) => prev.filter((t) => t.key !== key));
      if (editing && editing.key === key) setEditing(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete task");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (task: TaskEntity) => {
    setEditing(task);
    setForm(task);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "priority" ? Number(value) : value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const taskToSave = editing 
        ? { ...form } 
        : { ...form, key: crypto.randomUUID() };
      
      await taskApi.createOrUpdateTask(taskToSave);
      
      if (editing) {
        setTasks((prev) => prev.map((t) => (t.key === editing.key ? taskToSave : t)));
        setEditing(null);
      } else {
        setTasks((prev) => [...prev, taskToSave]);
      }
      
      setForm({ key: "", name: "", priority: 1, status: TaskStatus.NotStarted });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save task");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditing(null);
    setForm({ key: "", name: "", priority: 1, status: TaskStatus.NotStarted });
  };

  const handleSortToggle = () => {
    setSortDir(sortDir === "asc" ? "desc" : "asc");
  };

  return {
    // State
    tasks: filteredAndSortedTasks,
    loading,
    error,
    filter,
    sortBy,
    sortDir,
    editing,
    form,
    
    // Handlers
    handleDelete,
    handleEdit,
    handleFormChange,
    handleFormSubmit,
    handleCancel,
    handleSortToggle,
    loadTasks,
    setFilter,
    setSortBy,
  };
};
