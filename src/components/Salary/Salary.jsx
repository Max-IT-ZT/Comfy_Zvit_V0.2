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
        <input
          type="number"
          inputMode="decimal"
          className={css.salaryInput}
          value={coefficient}
          onChange={handleCoefficientChange}
          placeholder="КОФ"
        />
      </div>
      <div className={css.salaryRow}>
        <span>1 IT</span>
        <span>2 IT</span>
        <span>3 IT</span>
        <span>4 IT</span>
      </div>
      <div className={css.salaryRow}>
        <span>{calculateSalary(itSum, 1)} грн</span>
        <span>{calculateSalary(itSum, 2)} грн</span>
        <span>{calculateSalary(itSum, 3)} грн</span>
        <span>{calculateSalary(itSum, 4)} грн</span>
      </div>
    </div>
  );
}
