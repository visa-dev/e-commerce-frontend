import axios from 'axios';

export const API_URL = "e-commerce-server-production-6c47.up.railway.app/"

export const api = axios.create({

    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
}); 