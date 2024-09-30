import { useState } from "react";
import { db, ref, set } from "../../firebase";
import StatisticsModal from "../StatisticsModal/StatisticsModal.jsx";
import styles from "./HallControl.module.css";

export default function HallControl() {
  const [selectedUser, setSelectedUser] = useState(
    localStorage.getItem("selectedUser") || "Нікіта"
  );
  const [deviceCounts, setDeviceCounts] = useState({
    smartphones: 0,
    services: 0,
    laptops: 0,
    laptopServices: 0,
    tablets: 0,
    tabletServices: 0,
    tvs: 0,
    tvServices: 0,
  });
  const [showStatistics, setShowStatistics] = useState(false);

  const updateDeviceCount = (device, isAdding, service) => {
    const updatedCounts = {
      ...deviceCounts,
      [device]: isAdding
        ? deviceCounts[device] + 1
        : Math.max(deviceCounts[device] - 1, 0),
    };

    if (service) {
      updatedCounts[service] = isAdding
        ? deviceCounts[service] + 1
        : Math.max(deviceCounts[service] - 1, 0);
    }

    setDeviceCounts(updatedCounts);
    saveData(updatedCounts, selectedUser);
  };

  const saveData = async (data, user) => {
    try {
      await set(ref(db, `hallControl/${user}`), data);
      console.log(`Data saved to Firebase for ${user}: `, data);
    } catch (error) {
      console.error("Error saving data: ", error);
    }
  };

  const handleShowStatistics = () => {
    setShowStatistics(true);
  };

  const handleCloseStatistics = () => {
    setShowStatistics(false);
  };

  return (
    <div className={styles.hallControl}>
      <h1 className={styles.title}>Контроль залу</h1>
      <label className={styles.label}>Оберіть користувача:</label>
      <select
        className={styles.select}
        value={selectedUser}
        onChange={(e) => {
          setSelectedUser(e.target.value);
          localStorage.setItem("selectedUser", e.target.value);
        }}
      >
        <option value="Нікіта">Нікіта</option>
        <option value="Нікіта2">Нікіта2</option>
        <option value="Вова">Вова</option>
        <option value="Макс">Макс</option>
      </select>

      {/* Група Смартфони */}
      <div className={styles.deviceAllGroup}>
        <div className={styles.deviceGroup}>
          <h2 className={styles.groupTitle}>Смартфони</h2>
          <div className={styles.buttonGrid}>
            <button
              className={styles.deviceButtonPositive}
              onClick={() => {
                updateDeviceCount("smartphones", true, "services");
              }}
            >
              З послугою
            </button>
            <button
              className={styles.deviceButtonNegative}
              onClick={() => updateDeviceCount("smartphones", true)}
            >
              Голий
            </button>

            <button
              className={styles.deviceButtonNegative}
              onClick={() => updateDeviceCount("smartphones", false)}
            >
              - Смартфон
            </button>
            <button
              className={styles.deviceButtonNegative}
              onClick={() => updateDeviceCount("services", false)}
            >
              - Послуга
            </button>
          </div>
          <button
            className={styles.deviceButtonPositivePlus}
            onClick={() => updateDeviceCount("services", true)}
          >
            + Послуга
          </button>
        </div>

        {/* Група Ноутбуки */}
        <div className={styles.deviceGroup}>
          <h2 className={styles.groupTitle}>Ноутбуки</h2>
          <div className={styles.buttonGrid}>
            <button
              className={styles.deviceButtonPositive}
              onClick={() => {
                updateDeviceCount("laptops", true, "laptopServices");
              }}
            >
              З послугою
            </button>
            <button
              className={styles.deviceButtonNegative}
              onClick={() => updateDeviceCount("laptops", true)}
            >
              Голий
            </button>

            <button
              className={styles.deviceButtonNegative}
              onClick={() => updateDeviceCount("laptops", false)}
            >
              - Ноутбук
            </button>
            <button
              className={styles.deviceButtonNegative}
              onClick={() => updateDeviceCount("laptopServices", false)}
            >
              - Послуга
            </button>
          </div>
          <button
            className={styles.deviceButtonPositivePlus}
            onClick={() => updateDeviceCount("laptopServices", true)}
          >
            + Послуга
          </button>
        </div>

        {/* Група Планшети */}
        <div className={styles.deviceGroup}>
          <h2 className={styles.groupTitle}>Планшети</h2>
          <div className={styles.buttonGrid}>
            <button
              className={styles.deviceButtonPositive}
              onClick={() => {
                updateDeviceCount("tablets", true, "tabletServices");
              }}
            >
              З послугою
            </button>
            <button
              className={styles.deviceButtonNegative}
              onClick={() => updateDeviceCount("tablets", true)}
            >
              Голий
            </button>

            <button
              className={styles.deviceButtonNegative}
              onClick={() => updateDeviceCount("tablets", false)}
            >
              - Планшет
            </button>
            <button
              className={styles.deviceButtonNegative}
              onClick={() => updateDeviceCount("tabletServices", false)}
            >
              - Послуга
            </button>
          </div>
          <button
            className={styles.deviceButtonPositivePlus}
            onClick={() => updateDeviceCount("tabletServices", true)}
          >
            + Послуга
          </button>
        </div>

        {/* Група Телевізори */}
        <div className={styles.deviceGroup}>
          <h2 className={styles.groupTitle}>Телевізори</h2>
          <div className={styles.buttonGrid}>
            <button
              className={styles.deviceButtonPositive}
              onClick={() => {
                updateDeviceCount("tvs", true, "tvServices");
              }}
            >
              З послугою
            </button>
            <button
              className={styles.deviceButtonNegative}
              onClick={() => updateDeviceCount("tvs", true)}
            >
              Голий
            </button>

            <button
              className={styles.deviceButtonNegative}
              onClick={() => updateDeviceCount("tvs", false)}
            >
              - Телевізор
            </button>
            <button
              className={styles.deviceButtonNegative}
              onClick={() => updateDeviceCount("tvServices", false)}
            >
              - Послуга
            </button>
          </div>
          <button
            className={styles.deviceButtonPositivePlus}
            onClick={() => updateDeviceCount("tvServices", true)}
          >
            + Послуга
          </button>
        </div>
      </div>

      <button
        className={styles.statisticsButton}
        onClick={handleShowStatistics}
      >
        Показати статистику
      </button>

      {showStatistics && (
        <StatisticsModal
          deviceCounts={deviceCounts}
          onClose={handleCloseStatistics}
        />
      )}
    </div>
  );
}
