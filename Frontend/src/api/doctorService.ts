import { api } from './axios';

export const fetchDoctorQueueAPI = async () => {
    const response = await api.get('/doctors/queue');
    return response.data;
};

export const updateScheduleAPI = async (scheduleData: any) => {
    const response = await api.post('/schedules/update', scheduleData);
    return response.data;
};