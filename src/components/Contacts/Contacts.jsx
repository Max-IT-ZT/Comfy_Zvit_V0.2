import css from "./Contacts.module.css"; // Ensure to create this CSS file
import { RiAlarmWarningFill } from "react-icons/ri";
const Contacts = () => {
  return (
    <div className={css.contacts}>
      <h2>Корисні контакти</h2>
      <ul>
        <li>
          <a href="tel:0800503405">
            Гаряча лінія Microsoft <span></span> 0 800 503 405
          </a>
        </li>
        <li>
          <a href="tel:0800509382">
            Гаряча лінія Apple <span></span> 0 800 509 382
          </a>
        </li>
        <li>
          <a href="tel:0800305122">
            Гаряча лінія ЕКТА-Сервіс <span>0 800 305 122</span>
          </a>
        </li>
        <li>
          <a href="tel:0800305024">
            Гаряча лінія Support-UA <span> 0 800 305 024</span>
          </a>
        </li>
        <li>
          <a href="tel:0800503773">
            Гаряча лінія Vuso <span>0 800 503 773</span>
          </a>
        </li>
        <li>
          <a href="tel:0800601234">
            Гаряча лінія Megogo <span>0 800 601 234</span>
          </a>
        </li>
        <li>
          <a
            href="https://t.me/sweet_tv_techsupport_bot"
            target="_blank"
            rel="noopener noreferrer"
          >
            Чат-Бот SwetTv - @sweet_tv_techsupport_bot
          </a>
        </li>
        <li className={css.hiddenPhone}>
          <a href="tel:+380934245778">
            <span className={css.hiddenPhone}>
              <RiAlarmWarningFill color="red" className={css.icon} /> Коли вже
              зателефонував на всі гарячі лінії
              <RiAlarmWarningFill color="red" className={css.icon} />
            </span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Contacts;
