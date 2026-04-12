import { api } from './axios';

export const fetchPatientRecordsAPI = async (patientId: string) => {
  const response = await api.get(`/records/${patientId}`);
  return response.data;
};
