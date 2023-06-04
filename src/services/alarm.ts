import useFetch from "../custom-hooks/useFetch";
import { Alarm } from "../models/alarm";

export const getAlarms = () => {
  const { loading, error, value } = useFetch<Alarm[]>("localhost:3001/alarms");

  return value;
};
