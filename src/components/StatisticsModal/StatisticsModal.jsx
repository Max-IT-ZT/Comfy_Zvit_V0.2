import { useState, useEffect } from "react";
import { db, ref, onValue } from "../../firebase.js";
import styles from "./StatisticsModal.module.css"; // Імпорт стилів

const StatisticsModal = ({ onClose }) => {
  const [allUsersData, setAllUsersData] = useState({});
  const [totalStatistics, setTotalStatistics] = useState({
    smartphones: { total: 0, service: 0 },
    laptops: { total: 0, service: 0 },
    tablets: { total: 0, service: 0 },
    tvs: { total: 0, service: 0 },
  });

  useEffect(() => {
    const usersRef = ref(db, "hallControl");
    const unsubscribe = onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setAllUsersData(data);
        calculateTotalStatistics(data);
      }
    });

    return () => unsubscribe();
  }, []);

  const calculatePenetration = (category, user) => {
    const total = user[category] || 0; // Загальна кількість пристроїв

    let service;
    switch (category) {
      case "smartphones":
        service = user.services || 0; // Сервіси для смартфонів
        break;
      case "laptops":
        service = user.laptopServices || 0; // Сервіси для ноутбуків
        break;
      case "tablets":
        service = user.tabletServices || 0; // Сервіси для планшетів
        break;
      case "tvs":
        service = user.tvServices || 0; // Сервіси для телевізорів
        break;
      default:
        service = 0; // Якщо категорія не вказана, сервісів немає
    }

    return total > 0 ? `${Math.round((service / total) * 100)}%` : "0%";
  };
  const calculateTotalStatistics = (data) => {
    const newStatistics = {
      smartphones: { total: 0, service: 0 },
      laptops: { total: 0, service: 0 },
      tablets: { total: 0, service: 0 },
      tvs: { total: 0, service: 0 },
    };

    Object.values(data).forEach((user) => {
      newStatistics.smartphones.total += user.smartphones || 0;
      newStatistics.smartphones.service += user.services || 0;

      newStatistics.laptops.total += user.laptops || 0;
      newStatistics.laptops.service += user.laptopServices || 0;

      newStatistics.tablets.total += user.tablets || 0;
      newStatistics.tablets.service += user.tabletServices || 0;

      newStatistics.tvs.total += user.tvs || 0;
      newStatistics.tvs.service += user.tvServices || 0;
    });

    setTotalStatistics(newStatistics);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2 className={styles.title}>Статистика</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Категорія</th>
              <th>Нікіта</th>
              <th>Нікіта2</th>
              <th>Вова</th>
              <th>Макс</th>
            </tr>
          </thead>
          <tbody>
            {/* Смартфони */}
            <tr>
              <td>Сервіс Смарт</td>
              <td>{allUsersData["Нікіта"]?.services || 0}</td>
              <td>{allUsersData["Нікіта2"]?.services || 0}</td>
              <td>{allUsersData["Вова"]?.services || 0}</td>
              <td>{allUsersData["Макс"]?.services || 0}</td>
            </tr>
            <tr>
              <td>Смартфони</td>
              <td>{allUsersData["Нікіта"]?.smartphones || 0}</td>
              <td>{allUsersData["Нікіта2"]?.smartphones || 0}</td>
              <td>{allUsersData["Вова"]?.smartphones || 0}</td>
              <td>{allUsersData["Макс"]?.smartphones || 0}</td>
            </tr>
            <tr>
              <td>Проникнення Смар</td>
              <td>
                {calculatePenetration(
                  "smartphones",
                  allUsersData["Нікіта"] || {}
                )}
              </td>
              <td>
                {calculatePenetration(
                  "smartphones",
                  allUsersData["Нікіта2"] || {}
                )}
              </td>
              <td>
                {calculatePenetration(
                  "smartphones",
                  allUsersData["Вова"] || {}
                )}
              </td>
              <td>
                {calculatePenetration(
                  "smartphones",
                  allUsersData["Макс"] || {}
                )}
              </td>
            </tr>

            {/* Ноутбуки */}
            <tr>
              <td>Сервіс Ноут</td>
              <td>{allUsersData["Нікіта"]?.laptopServices || 0}</td>
              <td>{allUsersData["Нікіта2"]?.laptopServices || 0}</td>
              <td>{allUsersData["Вова"]?.laptopServices || 0}</td>
              <td>{allUsersData["Макс"]?.laptopServices || 0}</td>
            </tr>
            <tr>
              <td>Ноутбуки</td>
              <td>{allUsersData["Нікіта"]?.laptops || 0}</td>
              <td>{allUsersData["Нікіта2"]?.laptops || 0}</td>
              <td>{allUsersData["Вова"]?.laptops || 0}</td>
              <td>{allUsersData["Макс"]?.laptops || 0}</td>
            </tr>
            <tr>
              <td>Проникнення Ноут</td>
              <td>
                {calculatePenetration("laptops", allUsersData["Нікіта"] || {})}
              </td>
              <td>
                {calculatePenetration("laptops", allUsersData["Нікіта2"] || {})}
              </td>
              <td>
                {calculatePenetration("laptops", allUsersData["Вова"] || {})}
              </td>
              <td>
                {calculatePenetration("laptops", allUsersData["Макс"] || {})}
              </td>
            </tr>

            {/* Планшети */}
            <tr>
              <td>Сервіс Планш</td>
              <td>{allUsersData["Нікіта"]?.tabletServices || 0}</td>
              <td>{allUsersData["Нікіта2"]?.tabletServices || 0}</td>
              <td>{allUsersData["Вова"]?.tabletServices || 0}</td>
              <td>{allUsersData["Макс"]?.tabletServices || 0}</td>
            </tr>
            <tr>
              <td>Планшети</td>
              <td>{allUsersData["Нікіта"]?.tablets || 0}</td>
              <td>{allUsersData["Нікіта2"]?.tablets || 0}</td>
              <td>{allUsersData["Вова"]?.tablets || 0}</td>
              <td>{allUsersData["Макс"]?.tablets || 0}</td>
            </tr>
            <tr>
              <td>Проникнення Планш</td>
              <td>
                {calculatePenetration("tablets", allUsersData["Нікіта"] || {})}
              </td>
              <td>
                {calculatePenetration("tablets", allUsersData["Нікіта2"] || {})}
              </td>
              <td>
                {calculatePenetration("tablets", allUsersData["Вова"] || {})}
              </td>
              <td>
                {calculatePenetration("tablets", allUsersData["Макс"] || {})}
              </td>
            </tr>

            {/* Телевізори */}
            <tr>
              <td>Сервіс Тв</td>
              <td>{allUsersData["Нікіта"]?.tvServices || 0}</td>
              <td>{allUsersData["Нікіта2"]?.tvServices || 0}</td>
              <td>{allUsersData["Вова"]?.tvServices || 0}</td>
              <td>{allUsersData["Макс"]?.tvServices || 0}</td>
            </tr>
            <tr>
              <td>Телевізори</td>
              <td>{allUsersData["Нікіта"]?.tvs || 0}</td>
              <td>{allUsersData["Нікіта2"]?.tvs || 0}</td>
              <td>{allUsersData["Вова"]?.tvs || 0}</td>
              <td>{allUsersData["Макс"]?.tvs || 0}</td>
            </tr>
            <tr>
              <td>Проникнення Тв</td>
              <td>
                {calculatePenetration("tvs", allUsersData["Нікіта"] || {})}
              </td>
              <td>
                {calculatePenetration("tvs", allUsersData["Нікіта2"] || {})}
              </td>
              <td>{calculatePenetration("tvs", allUsersData["Вова"] || {})}</td>
              <td>{calculatePenetration("tvs", allUsersData["Макс"] || {})}</td>
            </tr>
          </tbody>
        </table>

        <h3 className={styles.totalStatsTitle}>Загальна статистика:</h3>
        <p className={styles.totalStat}>
          Смарт + Планш:{" "}
          {totalStatistics.smartphones.total + totalStatistics.tablets.total} шт
          (сервіс:{" "}
          {totalStatistics.smartphones.service +
            totalStatistics.tablets.service}{" "}
          шт, %:{" "}
          {totalStatistics.smartphones.total + totalStatistics.tablets.total
            ? Math.round(
                ((totalStatistics.smartphones.service +
                  totalStatistics.tablets.service) /
                  (totalStatistics.smartphones.total +
                    totalStatistics.tablets.total)) *
                  100
              )
            : 0}
          %)
        </p>
        <p className={styles.totalStat}>
          Ноутбуки: {totalStatistics.laptops.total} шт (сервіс:{" "}
          {totalStatistics.laptops.service} шт, %:{" "}
          {totalStatistics.laptops.total
            ? Math.round(
                (totalStatistics.laptops.service /
                  totalStatistics.laptops.total) *
                  100
              )
            : 0}
          %)
        </p>
        <p className={styles.totalStat}>
          Телевізори: {totalStatistics.tvs.total} шт (сервіс:{" "}
          {totalStatistics.tvs.service} шт, %:{" "}
          {totalStatistics.tvs.total
            ? Math.round(
                (totalStatistics.tvs.service / totalStatistics.tvs.total) * 100
              )
            : 0}
          %)
        </p>

        <button className={styles.closeButton} onClick={onClose}>
          Закрити звіт
        </button>
      </div>
    </div>
  );
};

export default StatisticsModal;
