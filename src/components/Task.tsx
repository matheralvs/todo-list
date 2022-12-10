import styles from "./Task.module.css";
import { TbTrash } from "react-icons/tb";
import { ChangeEvent, useState } from "react";
import { ITask } from "../App";

interface TaskProps {
  tasks: ITask;
  onRemove: (taskId: number) => void;
  onChecked: (taskId: number) => void;
}

export function Task({ tasks, onRemove, onChecked }: TaskProps) {
  function handleTaskDelete() {
    onRemove(tasks.id);
  }

  function handleTaskChecked() {
    onChecked(tasks.id);
  }

  return (
    <div className={styles.taskContainer}>
      <div className={styles.checkContainer}>
        <input
          type="checkbox"
          checked={tasks.isChecked}
          onChange={handleTaskChecked}
        />
      </div>
      <p>{tasks.content}</p>
      <button title="Deletar" onClick={handleTaskDelete}>
        <TbTrash size={20} />
      </button>
    </div>
  );
}
