import styles from "./TaskEmpty.module.css";
import clipboardImg from "../assets/clipboard.svg";

export function TaskEmpty() {
  return (
    <div className={styles.tasksEmpty}>
      <img src={clipboardImg} alt="" />
      <div className={styles.tasksEmptyInfo}>
        <strong>Você ainda não tem tarefas cadastradas</strong>
        <span>Crie tarefas e organize seus itens a fazer</span>
      </div>
    </div>
  );
}
