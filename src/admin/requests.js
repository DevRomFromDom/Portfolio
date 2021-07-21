import axios from "axios";

axios.defaults.baseURL = "https://webdev-api.loftschool.com/";

const token = localStorage.getItem("token") || "";

if (token) {
  axios.defaults.headers["Authorization"] = `Bearer ${token}`;
}
axios.interceptors.response.use(
    async (response) => {
        return response;
    },
    async (error) => {
        const {
            config,
            response: { status, data },
        } = error;
        const curtoken = await localStorage.getItem("token")
        if (status === 401 && curtoken) {
            console.log(curtoken)
            const {newToken} = await axios.post("/refreshToken");
            await localStorage.setItem("token", newToken.token);
            axios.defaults.headers["Authorization"] = `Bearer ${newToken.token}`;
        }else 

        return Promise.reject(error);
    }
);



export default axios;
