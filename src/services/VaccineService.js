import axios from "axios";


const vaccineApi = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL,
    withCredentials: false,
    headers: {
        "content-type": "application/json",
        "Authorization": localStorage.getItem('token')
    }
})

export default{
    getVaccine(number){
        return vaccineApi.get(`/vaccine/`+number)
    },
    getVaccines(){
        return vaccineApi.get(`/vaccine`)
    },
    giveVaccine(form){
        // json form by id and vaccine_id
        return vaccineApi.put(`/admin/addVaccineToUser`,form)
    }
}