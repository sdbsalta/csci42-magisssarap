import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Order-related API calls
export const orderApi = {
    getActiveOrders: () => api.get('/orders/active-orders/'),
    getPastOrders: () => api.get('/orders/past-orders/'),
    getOrderDetails: (orderId) => api.get(`/orders/order-detail/${orderId}/`),
};

// Voucher-related API calls
export const voucherApi = {
    applyVoucher: (voucherCode) => {
      return fetch("http://127.0.0.1:8000/orders/apply-voucher/", {  // ✅ Fixed URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ voucher_code: voucherCode }),
      }).then(response => response.json());
    }
  };

export default api; 