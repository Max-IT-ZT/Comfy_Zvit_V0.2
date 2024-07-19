import { useState } from "react";
import css from "./Header.module.css";

export default function Header({
  toggleComponent,
  resetComponent,
  showGalleryComponent,
}) {
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
        <button onClick={() => handleMenuClick(showGalleryComponent)}>
          Галерея
        </button>

        <a
          href="https://elearning.comfy.ua/wallet"
          target="_blank"
          rel="noreferrer"
        >
          <button> Мій Гаманець</button>
        </a>

        <a
          href="https://docs.google.com/spreadsheets/d/1Wxgk7YfdiOrgqhAZ-FJKSfee88IIFO-yeGUFCF_af6U/edit#gid=0&range=A2:AG8"
          target="_blank "
          rel="noreferrer"
        >
          <button>Графік на місяць</button>
        </a>
      </nav>
    </header>
  );
}
