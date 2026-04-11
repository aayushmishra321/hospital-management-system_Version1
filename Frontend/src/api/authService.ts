import { api } from './axios';

export const loginUser = async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};

export const registerPatientAPI = async (patientData: any) => {
    const response = await api.post('/patients/register', patientData);
    return response.data;
};