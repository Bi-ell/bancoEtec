import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
    baseURL: "http://localhost:3333"
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
    (error) => Promise.reject(Error)
);

api.interceptors.response.use(
    (response) => {
        toast.success(response.data.response, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

        return response;
    },
    (error) => {
        if (error.response.status >= 400 && error.response.status < 500) {
            toast.warn(`${error.response.data.response}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

        if (error.response.status >= 500) {
            toast.error(`${error.response.data.response}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        return Promise.reject(error);
    }
)

export default api;