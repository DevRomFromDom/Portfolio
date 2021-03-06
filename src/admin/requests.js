import axios from "axios";

axios.defaults.baseURL = "https://webdev-api.loftschool.com/";

const token = localStorage.getItem("token") || "";

if (token) {
  axios.defaults.headers["Authorization"] = `Bearer ${token}`;
}
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const {
            config,
            response: { status, data },
        } = error;
        if (status === 401 && token) {
            const response = await axios.post("/refreshToken");
            const token = response.data.token;
            await localStorage.setItem("token", token);
            axios.defaults.headers["Authorization"] = `Bearer ${token}`;
            config.headers["Authorization"] = `Bearer ${token}`;
            return axios(config)
        }

        return Promise.reject(error);
    }
);



export default axios;
