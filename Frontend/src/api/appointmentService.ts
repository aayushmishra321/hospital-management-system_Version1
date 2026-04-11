import { api } from './axios';

export const bookAppointmentAPI = async (appointmentData: any) => {
    const response = await api.post('/appointments/book', appointmentData);
    return response.data;
};

export const fetchAppointmentsAPI = async () => {
    const response = await api.get('/appointments');
    return response.data;
};