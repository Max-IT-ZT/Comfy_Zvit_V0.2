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
      <input
        type="number"
        className={css.salaryInput}
        value={coefficient}
        onChange={handleCoefficientChange}
        placeholder="Коефіцієнт"
      />
      <table className={css.salaryTable}>
        <thead>
          <tr>
            <th>Кількість співробітників</th>
            <th>Заробітна плата</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>4</td>
            <td>{calculateSalary(itSum, 4)} грн.</td>
          </tr>
          <tr>
            <td>3</td>
            <td>{calculateSalary(itSum, 3)} грн.</td>
          </tr>
          <tr>
            <td>2</td>
            <td>{calculateSalary(itSum, 2)} грн.</td>
          </tr>
          <tr>
            <td>1</td>
            <td>{calculateSalary(itSum, 1)} грн.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
