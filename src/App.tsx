import styles from "./App.module.css";
import { Task } from "./components/Task";
import { TbCirclePlus } from "react-icons/tb";
import { Header } from "./components/Header";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { TaskEmpty } from "./components/TaskEmpty";

export interface ITask {
  id: number;
  content: string;
  isChecked: boolean;
}

export function App() {
  const [taskValue, setTaskValue] = useState("");
  const [taskList, setTaskList] = useState<ITask[]>([]);

  useEffect(() => {
    tasksLoadSaveInLocal();
  }, []);

  function tasksLoadSaveInLocal() {
    const tasksSaved = localStorage.getItem("todo-1.0.0");

    if (tasksSaved) {
      setTaskList(JSON.parse(tasksSaved));
    }
  }

  function tasksSaveInLocal(newTasks: ITask[]) {
    setTaskList(newTasks);

    localStorage.setItem("todo-1.0.0", JSON.stringify(newTasks));
  }

  function handleTaskInputValue(e: ChangeEvent<HTMLInputElement>) {
    const newTaskValue = e.target.value;

    setTaskValue(newTaskValue);
  }

  function handleAddTasksToList(e: FormEvent) {
    e.preventDefault();

    const newTask = {
      id: new Date().getTime(),
      content: taskValue,
      isChecked: false,
    };

    tasksSaveInLocal([...taskList, newTask]);

    setTaskValue("");
  }

  function handleRemoveTasksToList(taskId: number) {
    const taskListWithoutOne = taskList.filter((task) => {
      return task.id !== taskId;
    });

    tasksSaveInLocal(taskListWithoutOne);
  }

  function handleTasksToChecked(taskId: number) {
    const newTasksChecked = taskList.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isChecked: !task.isChecked,
        };
      } else {
        return task;
      }
    });

    tasksSaveInLocal(newTasksChecked);
  }

  const tasksQuantity = taskList.length;
  const tasksCheckedQuantity = taskList.filter((task) => task.isChecked).length;

  return (
    <>
      <Header />

      <form onSubmit={handleAddTasksToList} className={styles.formContainer}>
        <input
          type="text"
          className={styles.inputTask}
          value={taskValue}
          placeholder="Adicione uma nova tarefa"
          onChange={handleTaskInputValue}
          required
        />

        <button className={styles.buttonTask} type="submit">
          Criar <TbCirclePlus size={20} />
        </button>
      </form>

      <main className={styles.tasksListContainer}>
        <div className={styles.tasksInfo}>
          <div className={styles.tasksCreated}>
            Tarefas criadas <span>{tasksQuantity}</span>
          </div>
          <div className={styles.tasksCompleted}>
            Concluídas
            <span>
              {tasksQuantity === 0
                ? 0
                : `${tasksCheckedQuantity} de ${tasksQuantity}`}
            </span>
          </div>
        </div>

        {tasksQuantity === 0 && <TaskEmpty />}

        <div className={styles.tasksList}>
          {taskList.map((task) => {
            return (
              <Task
                tasks={task}
                onRemove={handleRemoveTasksToList}
                onChecked={handleTasksToChecked}
              />
            );
          })}
        </div>
      </main>
    </>
  );
}
