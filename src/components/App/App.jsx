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

  useEffect(() => {
    const saveData = async () => {
      try {
        await set(ref(db, "plans"), plan);
        console.log("Data saved to Firebase: ", plan);
      } catch (error) {
        console.error("Error saving data: ", error);
      }
    };
    saveData();
  }, [plan]);

  const updatePlan = (newPlan) => {
    const updatedPlans = [...plan];
    updatedPlans[newPlan.day - 1] = newPlan;
    setPlan(updatedPlans);
  };

  return (
    <div className={css.container}>
      <p>Hello world</p>
      <PlanForm newPlan={updatePlan} setDay={setDay} day={day} />
    </div>
  );
}
