import axios from 'axios'

const api = axios.create({
    baseURL: 'https://something'
});

export const sendMetrics = async () => {
    const resp =  await api.post('/');
    return resp.data;
};
