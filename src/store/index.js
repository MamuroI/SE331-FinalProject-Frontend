import { reactive } from "vue"

export default reactive({ flashMessage: '', patients: null, selectedPatient: null, currentUser: JSON.parse(localStorage.getItem('user')) })
