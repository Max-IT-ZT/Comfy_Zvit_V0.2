import { useState } from "react";
import { FaCircle } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";
import { RiContactsBook3Fill } from "react-icons/ri";
import { GrGallery } from "react-icons/gr";
import { TbReportSearch } from "react-icons/tb";
import { RiLayoutHorizontalFill } from "react-icons/ri";
import css from "./Header.module.css";

export default function Header({
  toggleComponent,
  resetComponent,
  showGalleryComponent,
  showContactsComponent,
  showHallControlComponent,
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
      <div className={css.logo}>
        Comfy <FaCircle color="orange" className={css.icon} />
      </div>
      <div
        className={`${css.burger} ${isOpen ? css.open : ""}`}
        onClick={handleToggle}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav className={`${css.nav} ${isOpen ? css.show : ""}`}>
        <button
          className={css.linkBtnIcon}
          onClick={() => handleMenuClick(toggleComponent)}
        >
          <RiLayoutHorizontalFill color="red" /> Заповнити план
        </button>
        <button
          className={css.linkBtnIcon}
          onClick={() => handleMenuClick(resetComponent)}
        >
          <TbReportSearch color="chartreuse" /> Звіт
        </button>
        <button
          className={css.linkBtnIcon}
          onClick={() => handleMenuClick(showHallControlComponent)}
        >
          <RiLayoutHorizontalFill color="green" /> Контроль залу
        </button>

        <button
          className={css.linkBtnIcon}
          onClick={() => handleMenuClick(showGalleryComponent)}
        >
          <GrGallery color="burlywood" /> Галерея
        </button>
        <button
          className={css.linkBtnIcon}
          onClick={() => handleMenuClick(showContactsComponent)}
        >
          <RiContactsBook3Fill color="violet" /> Контакти
        </button>
        <a
          href="https://elearning.comfy.ua/wallet"
          target="_blank"
          rel="noreferrer"
        >
          <button className={css.linkBtnIcon}>
            <FaWallet color="gold" /> Мій Гаманець
          </button>
        </a>
        <a
          href="https://docs.google.com/spreadsheets/d/1Wxgk7YfdiOrgqhAZ-FJKSfee88IIFO-yeGUFCF_af6U/edit#gid=0&range=A2:AG8"
          target="_blank"
          rel="noreferrer"
        >
          <button className={css.linkBtnIcon}>
            <FaCalendarAlt color="aqua" /> Графік на місяць
          </button>
        </a>
      </nav>
    </header>
  );
}
