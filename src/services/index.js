import axios from "axios";

const client = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL,
    withCredentials: false,
    headers: {
        "content-type": "application/json"
    }
})

export default {
    getAllPatients(){
        return client.get('/patients')
    },
    getPatients(page = 1) {
        return client.get(`/patients?_page=${page}&_limit=6`)
    },
    getPatient(id){
        return client.get(`/patients/${id}`)
    }
}
