import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const VehicleContext = createContext(null);

/**
 * Обране користувачем авто (марка/модель/покоління) — окремо від кошика.
 * Персистимо в localStorage, тож вибір зберігається між візитами.
 *
 * vehicle: { brandId, brandLabel, modelId, modelLabel, genId, genLabel, years } | null
 */
export function VehicleProvider({ children }) {
  const [vehicle, setVehicle, clear] = useLocalStorage("vehicle", null);

  const value = useMemo(() => ({ vehicle, setVehicle, clear }), [vehicle, setVehicle, clear]);

  return <VehicleContext.Provider value={value}>{children}</VehicleContext.Provider>;
}

export function useVehicle() {
  const ctx = useContext(VehicleContext);
  if (!ctx) throw new Error("useVehicle має використовуватись усередині <VehicleProvider>");
  return ctx;
}
