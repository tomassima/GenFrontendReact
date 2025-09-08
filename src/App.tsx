
import "./App.css";
import { TaskForm } from "./components/TaskForm";
import { TaskTable } from "./components/TaskTable";
import { TaskControls } from "./components/TaskControls";
import { useTaskManager } from "./hooks/useTaskManager";

function App() {
  const {
    tasks,
    loading,
    error,
    filter,
    sortBy,
    sortDir,
    editing,
    form,
    handleDelete,
    handleEdit,
    handleFormChange,
    handleFormSubmit,
    handleCancel,
    handleSortToggle,
    setFilter,
    setSortBy,
  } = useTaskManager();

  return (
    <div className="container">
      <h1>Task Manager</h1>
      
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {loading && <div>Loading...</div>}
      
      <TaskControls
        filter={filter}
        sortBy={sortBy}
        sortDir={sortDir}
        onFilterChange={setFilter}
        onSortToggle={handleSortToggle}
        onSortByChange={setSortBy}
      />

      <TaskForm
        form={form}
        editing={editing}
        onFormChange={handleFormChange}
        onFormSubmit={handleFormSubmit}
        onCancel={handleCancel}
      />

      <TaskTable
        tasks={tasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
