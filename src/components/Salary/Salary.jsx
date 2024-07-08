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
    setCoefficient(parseFloat(e.target.value));
  };

  const calculateSalary = (sum, divisor) => {
    return ((sum * coefficient) / 100 / divisor).toFixed(0);
  };

  return (
    <div className={css.salaryContainer}>
      <h2 className={css.salaryHeader}>Заробітна плата</h2>
      <div className={css.editContainer}>
        <input
          type="number"
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
