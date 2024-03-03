import { useState } from "react";

export const useAktualnieGraja = (initialValue = false) => {
  const [state, setState] = useState(initialValue);

  const setGraja = (graja: boolean) => {
    setState(graja);
  };

  return [state, setGraja] as const;
};