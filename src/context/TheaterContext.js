import React, { createContext, useState } from "react";

export const TheaterContext = createContext();

export const TheaterProvider = ({ children }) => {
  const [selectedTheater, setSelectedTheater] = useState(null);

  return (
    <TheaterContext.Provider value={{ selectedTheater, setSelectedTheater }}>
      {children}
    </TheaterContext.Provider>
  );
};
