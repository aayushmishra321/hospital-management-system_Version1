import { api } from './axios';

export const createBillAPI = async (billData: any) => {
    const response = await api.post('/billing/create', billData);
    return response.data;
};

export const processPaymentAPI = async (paymentData: any) => {
    const response = await api.post('/payments/process', paymentData);
    return response.data;
};