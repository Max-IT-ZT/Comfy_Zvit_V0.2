import { useState, useEffect } from "react";
import css from "./Salary.module.css";

export default function Salary({ itSum }) {
  const [coefficient, setCoefficient] = useState(() => {
    const savedCoefficient = localStorage.getItem("coefficient");
    return savedCoefficient ? parseFloat(savedCoefficient) : 0;
  });

  useEffect(() => {
    localStorage.setItem("coefficient", coefficient);
  }, [coefficient]);

  const handleCoefficientChange = (e) => {
    const value = e.target.value;
    // Заміняємо кому на крапку, якщо необхідно
    const normalizedValue = value.replace(",", ".");
    setCoefficient(normalizedValue);
  };

  const calculateSalary = (sum, divisor) => {
    const coefficientValue = parseFloat(coefficient) || 0;
    return ((sum * coefficientValue) / 100 / divisor).toFixed(0);
  };

  return (
    <div className={css.salaryContainer}>
      <h2 className={css.salaryHeader}>Заробітна плата</h2>
      <div className={css.editContainer}>
        <label htmlFor="kof" className={css.label}>
          Коефіцієнт
        </label>
        <input
          type="number"
          inputMode="decimal"
          className={css.salaryInput}
          name="kof"
          value={coefficient}
          onChange={handleCoefficientChange}
          placeholder="КОФ"
        />
      </div>
      <ul className={css.salaryRow}>
        <li className={css.item}>
          <span>1 IT</span>
          <span>{calculateSalary(itSum, 1)} грн</span>
        </li>
        <li className={css.item}>
          <span>2 IT</span>
          <span>{calculateSalary(itSum, 2)} грн</span>
        </li>
        <li className={css.item}>
          <span>3 IT</span>
          <span>{calculateSalary(itSum, 3)} грн</span>
        </li>
        <li className={css.item}>
          <span>4 IT</span>
          <span>{calculateSalary(itSum, 4)} грн</span>
        </li>
      </ul>
    </div>
  );
}
