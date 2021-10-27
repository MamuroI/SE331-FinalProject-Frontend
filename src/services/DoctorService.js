import axios from "axios";

const doctorApi = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL,
    withCredentials: false,
    headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("token"),
    },
});

export default {
    addComment(form) {
        // json form by id and comment
        return doctorApi.put(`/doctor/addCommentToUser`, form);
    },
    seeChargedPatients(doctorUsername) {
        return doctorApi.get(`/charge?username=` + doctorUsername);
    },
};
