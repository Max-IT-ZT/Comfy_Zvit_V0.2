import { useState, useEffect } from "react";
import { db, ref, set, onValue } from "../../firebase";
import StatisticsModal from "../StatisticsModal/StatisticsModal.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./HallControl.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Іконки ока

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
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [showPassword, setShowPassword] = useState(false); // Новий стан для видимості пароля

  useEffect(() => {
    const fetchData = () => {
      const userRef = ref(db, `hallControl/${selectedUser}`);
      onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          setDeviceCounts(snapshot.val());
        } else {
          setDeviceCounts({
            smartphones: 0,
            services: 0,
            laptops: 0,
            laptopServices: 0,
            tablets: 0,
            tabletServices: 0,
            tvs: 0,
            tvServices: 0,
          });
        }
      });
    };

    fetchData();
  }, [selectedUser]);

  useEffect(() => {
    // Відновлення вибраного користувача та автентифікації при завантаженні
    const storedUser = localStorage.getItem("selectedUser");
    const storedAuth = localStorage.getItem("isAuthenticated") === "true";
    if (storedUser) {
      setSelectedUser(storedUser);
      setIsAuthenticated(storedAuth);
    }
  }, []);

  const authenticateUser = async () => {
    const passwordRef = ref(db, `passwords/${selectedUser}`);

    onValue(passwordRef, (snapshot) => {
      if (snapshot.exists()) {
        const savedPassword = snapshot.val();
        if (savedPassword === password) {
          setIsAuthenticated(true);
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("selectedUser", selectedUser); // Зберігаємо вибраного користувача
          toast.success("Вітаємо! Ви увійшли в систему.");
        } else {
          toast.error("Неправильний пароль!");
        }
      } else {
        toast.error("Пароль не знайдено для цього користувача!");
      }
    });
  };

  const registerPassword = async () => {
    const passwordRef = ref(db, `passwords/${selectedUser}`);

    // Перевірка на існування пароля для користувача
    onValue(passwordRef, (snapshot) => {
      if (snapshot.exists()) {
        toast.error("Пароль вже створений для цього користувача!");
      } else {
        set(passwordRef, password)
          .then(() => {
            toast.success("Пароль створено!");
          })
          .catch((error) => {
            console.error("Error saving password: ", error);
            toast.error("Помилка при збереженні пароля!");
          });
      }
    });
  };

  const updateDeviceCount = (device, isAdding, service) => {
    if (!isAuthenticated) {
      toast.error("Спочатку увійдіть у систему!");
      return;
    }

    const updatedCounts = {
      ...deviceCounts,
      [device]: isAdding
        ? (deviceCounts[device] || 0) + 1
        : Math.max((deviceCounts[device] || 0) - 1, 0),
    };

    if (service) {
      updatedCounts[service] = isAdding
        ? (deviceCounts[service] || 0) + 1
        : Math.max((deviceCounts[service] || 0) - 1, 0);
    }

    setDeviceCounts(updatedCounts);
    saveData(updatedCounts, selectedUser);

    const deviceName =
      device === "smartphones"
        ? "Смартфон"
        : device === "laptops"
        ? "Ноутбук"
        : device === "tablets"
        ? "Планшет"
        : device === "tvs"
        ? "Телевізор"
        : "";

    const serviceName =
      service === "services"
        ? "Послуга"
        : service === "laptopServices"
        ? "Послуга для ноутбука"
        : service === "tabletServices"
        ? "Послуга для планшета"
        : service === "tvServices"
        ? "Послуга для телевізора"
        : "";

    const message = `${isAdding ? "Додано" : "Видалено"} ${deviceName} ${
      service ? "і " + serviceName : ""
    }`;

    toast.success(message);
  };

  const resetStatistics = () => {
    const resetCounts = {
      smartphones: 0,
      services: 0,
      laptops: 0,
      laptopServices: 0,
      tablets: 0,
      tabletServices: 0,
      tvs: 0,
      tvServices: 0,
    };

    setDeviceCounts(resetCounts);
    saveData(resetCounts, selectedUser);
    toast.info("Статистику скинуто");
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
      <ToastContainer />
      <h1 className={styles.title}>Контроль залу</h1>

      <label className={styles.label}>Оберіть користувача:</label>
      <select
        className={styles.select}
        value={selectedUser}
        onChange={(e) => {
          setSelectedUser(e.target.value);
          setPassword(""); // Скидаємо пароль при зміні користувача
          setIsAuthenticated(false); // Скидаємо автентифікацію
          localStorage.removeItem("isAuthenticated"); // Очищаємо автентифікацію з localStorage
        }}
      >
        <option value="Нікіта">Нікіта</option>
        <option value="Нікіта2">Нікіта2</option>
        <option value="Вова">Вова</option>
        <option value="Макс">Макс</option>
      </select>

      {!isAuthenticated && (
        <div className={styles.authContainer}>
          <div className={styles.passwordInputContainer}>
            <input
              type={showPassword ? "text" : "password"} // Тип поля залежить від стану showPassword
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введіть пароль"
              className={styles.passwordInput}
            />
            <button
              type="button"
              className={styles.showPasswordButton}
              onClick={() => setShowPassword((prev) => !prev)} // Перемикання видимості пароля
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
              {/* Іконка для показу/приховання пароля */}
            </button>
          </div>

          <button onClick={authenticateUser} className={styles.authButton}>
            Увійти
          </button>
          <button onClick={registerPassword} className={styles.authButton}>
            Створити пароль
          </button>
        </div>
      )}

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
              - Смарт
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
              - Ноут
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
        onClick={handleShowStatistics}
        className={styles.statisticsButton}
      >
        Показати статистику
      </button>
      <button onClick={resetStatistics} className={styles.resetButton}>
        Скинути статистику
      </button>

      {showStatistics && (
        <StatisticsModal
          onClose={handleCloseStatistics}
          deviceCounts={deviceCounts}
        />
      )}
    </div>
  );
}
