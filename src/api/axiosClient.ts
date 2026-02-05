import axios from "axios";

// ---------- Token helpers ----------
const getAccessToken = () => localStorage.getItem("accessToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");
const removeTokens = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
};

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
});

axiosClient.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;

    if (config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
},
    (error) => {
        return Promise.reject(error);
    }
);



axiosClient.interceptors.response.use(
    res => res,
    async (error) => {
        const originalRequest = error.config;

        // Token Expired
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = getRefreshToken();

            if (!refreshToken) {
                removeTokens();
                window.location.href = "/login";
                return Promise.reject(error);
            }

            try {
                const res = await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/admin/auth/refresh`,
                    { refreshToken }
                );

                const newToken = res.data.data.accessToken;

                localStorage.setItem('accessToken', newToken);

                axiosClient.defaults.headers.Authorization = `Bearer ${newToken}`;
                originalRequest.headers.Authorization = `Bearer ${newToken}`;

                return axiosClient(originalRequest);

            } catch (err) {
                removeTokens();
                window.location.href = "/login";
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);




export default axiosClient;