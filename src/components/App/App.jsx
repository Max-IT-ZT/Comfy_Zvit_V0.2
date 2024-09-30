import { useState, useEffect, lazy, Suspense } from "react";
import { db, ref, set, get, child } from "../../firebase";
import Header from "../Header/Header";
import Salary from "../Salary/Salary";
const PlanForm = lazy(() => import("../Plan/PlanForm"));
const UserForm = lazy(() => import("../UserForm/UserForm"));
const Gallery = lazy(() => import("../Gallery/Gallery"));
const Contacts = lazy(() => import("../Contacts/Contacts"));
const HallControl = lazy(() => import("../HallControl/HallControl.jsx"));
export default function App() {
  const [day, setDay] = useState(1);
  const [plan, setPlan] = useState([]);
  const [showPlanForm, setShowPlanForm] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showHallControl, setShowHallControl] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [itSum, setItSum] = useState(0);

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
    saveData(updatedPlans);
  };

  const toggleComponent = () => {
    setShowPlanForm(true);
    setShowGallery(false);
    setShowContacts(false);
    setShowHallControl(false);
  };

  const resetComponent = () => {
    setShowPlanForm(false);
    setShowGallery(false);
    setShowContacts(false);
    setShowHallControl(false);
  };

  const showGalleryComponent = () => {
    setShowGallery(true);
    setShowPlanForm(false);
    setShowContacts(false);
    setShowHallControl(false);
  };

  const showContactsComponent = () => {
    setShowContacts(true);
    setShowPlanForm(false);
    setShowGallery(false);
    setShowHallControl(false);
  };
  const showHallControlComponent = () => {
    setShowHallControl(true);
    setShowPlanForm(false);
    setShowGallery(false);
    setShowContacts(false);
  };

  return (
    <>
      <Header
        toggleComponent={toggleComponent}
        resetComponent={resetComponent}
        showGalleryComponent={showGalleryComponent}
        showContactsComponent={showContactsComponent}
        showHallControlComponent={showHallControlComponent}
      />
      <Suspense fallback={<div>Loading...</div>}>
        {showGallery ? (
          <Gallery />
        ) : showPlanForm ? (
          <PlanForm
            newPlan={updatePlan}
            setDay={setDay}
            day={day}
            plan={plan}
          />
        ) : showContacts ? (
          <Contacts />
        ) : showHallControl ? (
          <HallControl />
        ) : (
          <>
            <Salary itSum={itSum} />
            <UserForm plan={plan} onSumItChange={setItSum} />
          </>
        )}
      </Suspense>
    </>
  );
}
