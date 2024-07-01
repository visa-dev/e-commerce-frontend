import axios from 'axios';

export const API_URL = "https://e-commerce-server-production-30e0.up.railway.app"

export const api = axios.create({

    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
}); 