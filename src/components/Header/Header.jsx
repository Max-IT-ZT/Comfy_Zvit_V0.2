import { useState } from "react";
import css from "./Header.module.css";

export default function Header({ toggleComponent, resetComponent }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (callback) => {
    callback();
    setIsOpen(false);
  };

  return (
    <header className={css.header}>
      <div className={css.logo}>Comfy</div>
      <div
        className={`${css.burger} ${isOpen ? css.open : ""}`}
        onClick={handleToggle}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav className={`${css.nav} ${isOpen ? css.show : ""}`}>
        <button onClick={() => handleMenuClick(toggleComponent)}>
          Заповнити план
        </button>
        <button onClick={() => handleMenuClick(resetComponent)}>Звіт</button>
      </nav>
    </header>
  );
}
