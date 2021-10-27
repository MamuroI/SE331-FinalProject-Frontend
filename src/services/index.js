import axios from "axios";


const client = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL,
    withCredentials: false,
    headers: {
        "content-type": "application/json",
        "Authorization": localStorage.getItem('token')
    }
})

export default {
    getAllPatients(){
        return client.get('/patients')
    },
    getAllUsers(){
        return client.get(`/users`)
    },
    getUser(id){
        return client.get(`/user/`+id)
    },
    getPatient(id){
        return client.get(`/patients/${id}`)
    },
    giveRolePatient(id){
        return client.put(`/user/roleToPatient/`+id)
    },
    giveRoleAdmin(id){
        return client.put(`/user/roleToAdmin/`+id)
    },
    giveRoleDoctor(id){
        return client.put(`/user/roleToDoctor/`+id)
    },
    updateUser(id,content){
        //content included String firstname;
        // String lastname;
        // String address;
        // Integer age;
        return client.put(`/user/`+id, content)
    },

    
}
