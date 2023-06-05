import { apiUrl } from "../config";
import { Alarm } from "../models/alarm";

const DEFAULT_OPTIONS = {
  headers: { "Content-Type": "application/json" },
};

function fetchData<T>(url: string, options?: RequestInit): Promise<T> {
  return fetch(url, { ...DEFAULT_OPTIONS, ...options }).then(
    (res: Response) => {
      if (res.ok) return res.json();
      return res.json().then((json) => Promise.reject(json));
    }
  );
}

export const getAlarmsRequest = async (): Promise<Alarm[]> =>
  fetchData<Alarm[]>(`${apiUrl}/alarms`);

export const addAlarmRequest = async (alarm: Partial<Alarm>): Promise<Alarm> =>
  fetchData<Alarm>(`${apiUrl}/alarms`, {
    method: "POST",
    body: JSON.stringify(alarm),
  });

export const deleteAlarmRequest = async (
  id: number
): Promise<{ deleted: number }> =>
  fetchData<{ deleted: number }>(`${apiUrl}/alarms/${id}`, {
    method: "DELETE",
  });

export const updateAlarmRequest = async (alarm: Alarm): Promise<Alarm> =>
  fetchData<Alarm>(`${apiUrl}/alarms/${alarm.id}`, {
    method: "PUT",
    body: JSON.stringify({
      ...alarm,
      isActive: !alarm.isActive,
    }),
  });
