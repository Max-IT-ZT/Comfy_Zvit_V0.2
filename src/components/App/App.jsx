import { useState, useEffect } from "react";
import PlanForm from "../Plan/PlanForm";
import css from "./App.module.css";
import { db, ref, set, get, child } from "../../firebase";

export default function App() {
  const [day, setDay] = useState(1);
  const [plan, setPlan] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(db);
      try {
        const snapshot = await get(child(dbRef, `plans`));
        if (snapshot.exists()) {
          const storedPlans = snapshot.val();
          setPlan(storedPlans);
          console.log("Data fetched from Firebase: ", storedPlans);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const saveData = async (updatedPlan) => {
    try {
      await set(ref(db, "plans"), updatedPlan);
      console.log("Data saved to Firebase: ", updatedPlan);
    } catch (error) {
      console.error("Error saving data: ", error);
    }
  };

  const updatePlan = (newPlan) => {
    const updatedPlans = [...plan];
    updatedPlans[newPlan.day - 1] = newPlan;
    setPlan(updatedPlans);
    saveData(updatedPlans); // Save the updated plan to Firebase
  };

  return (
    <div className={css.container}>
      <p>Hello world</p>
      <PlanForm newPlan={updatePlan} setDay={setDay} day={day} />
      <ul className={css.planList}>
        <li className={css.header}>
          <span>День</span>
          <span>План ІТ</span>
          <span>План ХС</span>
        </li>
        {plan.map((p, index) => (
          <li key={index} className={css.planItem}>
            <span>{p.day}</span>
            <span>{p.it}</span>
            <span>{p.hs}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
