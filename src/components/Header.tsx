import styles from "./Header.module.css";
import todoLogo from "../assets/todoLogo.svg";
import bgBlue from "../assets/bgBlur.svg";

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <img src={todoLogo} alt="Logo ToDo" />
    </header>
  );
}
