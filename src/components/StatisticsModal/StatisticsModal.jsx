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
              <th>%</th>
            </tr>
          </thead>
          <tbody>
            {/* Смартфони */}
            <tr>
              <td>Сервіс до Смартфонів</td>
              <td>{allUsersData["Нікіта"]?.services || 0}</td>
              <td>{allUsersData["Нікіта2"]?.services || 0}</td>
              <td>{allUsersData["Вова"]?.services || 0}</td>
              <td>{allUsersData["Макс"]?.services || 0}</td>
              <td>
                {totalStatistics.smartphones.total
                  ? Math.round(
                      (totalStatistics.smartphones.service /
                        totalStatistics.smartphones.total) *
                        100
                    )
                  : 0}
                %
              </td>
            </tr>
            <tr>
              <td>Смартфони</td>
              <td>{allUsersData["Нікіта"]?.smartphones || 0}</td>
              <td>{allUsersData["Нікіта2"]?.smartphones || 0}</td>
              <td>{allUsersData["Вова"]?.smartphones || 0}</td>
              <td>{allUsersData["Макс"]?.smartphones || 0}</td>
              <td></td>
            </tr>

            {/* Ноутбуки */}
            <tr>
              <td>Сервіс до Ноутбуків</td>
              <td>{allUsersData["Нікіта"]?.laptopServices || 0}</td>
              <td>{allUsersData["Нікіта2"]?.laptopServices || 0}</td>
              <td>{allUsersData["Вова"]?.laptopServices || 0}</td>
              <td>{allUsersData["Макс"]?.laptopServices || 0}</td>
              <td>
                {totalStatistics.laptops.total
                  ? Math.round(
                      (totalStatistics.laptops.service /
                        totalStatistics.laptops.total) *
                        100
                    )
                  : 0}
                %
              </td>
            </tr>
            <tr>
              <td>Ноутбуки</td>
              <td>{allUsersData["Нікіта"]?.laptops || 0}</td>
              <td>{allUsersData["Нікіта2"]?.laptops || 0}</td>
              <td>{allUsersData["Вова"]?.laptops || 0}</td>
              <td>{allUsersData["Макс"]?.laptops || 0}</td>
              <td></td>
            </tr>

            {/* Планшети */}
            <tr>
              <td>Сервіс до Планшетів</td>
              <td>{allUsersData["Нікіта"]?.tabletServices || 0}</td>
              <td>{allUsersData["Нікіта2"]?.tabletServices || 0}</td>
              <td>{allUsersData["Вова"]?.tabletServices || 0}</td>
              <td>{allUsersData["Макс"]?.tabletServices || 0}</td>
              <td>
                {totalStatistics.tablets.total
                  ? Math.round(
                      (totalStatistics.tablets.service /
                        totalStatistics.tablets.total) *
                        100
                    )
                  : 0}
                %
              </td>
            </tr>
            <tr>
              <td>Планшети</td>
              <td>{allUsersData["Нікіта"]?.tablets || 0}</td>
              <td>{allUsersData["Нікіта2"]?.tablets || 0}</td>
              <td>{allUsersData["Вова"]?.tablets || 0}</td>
              <td>{allUsersData["Макс"]?.tablets || 0}</td>
              <td></td>
            </tr>

            {/* Телевізори */}
            <tr>
              <td>Сервіс до Тв</td>
              <td>{allUsersData["Нікіта"]?.tvServices || 0}</td>
              <td>{allUsersData["Нікіта2"]?.tvServices || 0}</td>
              <td>{allUsersData["Вова"]?.tvServices || 0}</td>
              <td>{allUsersData["Макс"]?.tvServices || 0}</td>
              <td>
                {totalStatistics.tvs.total
                  ? Math.round(
                      (totalStatistics.tvs.service /
                        totalStatistics.tvs.total) *
                        100
                    )
                  : 0}
                %
              </td>
            </tr>
            <tr>
              <td>Телевізори</td>
              <td>{allUsersData["Нікіта"]?.tvs || 0}</td>
              <td>{allUsersData["Нікіта2"]?.tvs || 0}</td>
              <td>{allUsersData["Вова"]?.tvs || 0}</td>
              <td>{allUsersData["Макс"]?.tvs || 0}</td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <h3 className={styles.totalStatsTitle}>Загальна статистика:</h3>
        <p className={styles.totalStat}>
          Смартфони: {totalStatistics.smartphones.total} шт (з сервісом:{" "}
          {totalStatistics.smartphones.service} шт, %:{" "}
          {totalStatistics.smartphones.total
            ? Math.round(
                (totalStatistics.smartphones.service /
                  totalStatistics.smartphones.total) *
                  100
              )
            : 0}
          %)
        </p>
        <p className={styles.totalStat}>
          Ноутбуки: {totalStatistics.laptops.total} шт (з сервісом:{" "}
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
          Планшети: {totalStatistics.tablets.total} шт (з сервісом:{" "}
          {totalStatistics.tablets.service} шт, %:{" "}
          {totalStatistics.tablets.total
            ? Math.round(
                (totalStatistics.tablets.service /
                  totalStatistics.tablets.total) *
                  100
              )
            : 0}
          %)
        </p>
        <p className={styles.totalStat}>
          Телевізори: {totalStatistics.tvs.total} шт (з сервісом:{" "}
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
