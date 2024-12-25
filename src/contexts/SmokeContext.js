import React, { createContext, useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebaseConfig";

// Tạo Context
export const SmokeContext = createContext();

export const SmokeProvider = ({ children }) => {
  const [isSmokeDetected, setIsSmokeDetected] = useState(false);

  useEffect(() => {
    const weatherRef = ref(database, "system");

    // Lắng nghe thay đổi của `smoke` trong Firebase
    const unsubscribe = onValue(weatherRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setIsSmokeDetected(data.smoke || false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <SmokeContext.Provider value={{ isSmokeDetected }}>
      {children}
    </SmokeContext.Provider>
  );
};
