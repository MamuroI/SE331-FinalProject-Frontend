<template>
  <div class="w-full shadow-lg bg-red-100 px-5 py-5 m-1 rounded root">
    <div class="grid grid-cols-1 md:grid-cols-3">
      <div class="grid md:col-span-2 md:pl-4 mt-2 md:mt-0">
        <div class="grid">
          <h2 class="grid justify-start patientdetails">
            Username: {{ user.username }}
          </h2>
          <h2 v-if="user.authorities != null" class="grid justify-start patientdetails">
            Role: {{ user.authorities[0].name }}
          </h2>
        </div>
        <div class="grid items-end">
          <router-link :to="{name: 'Info',params: {id: user.id}}">
          <button
            id="Moredetails"
            class="
          py-2
          rounded
          w-50
          mx-2
          mt-3
          md:mt-0
          transition-all
          bg-red-200
          hover:bg-red-400
          hover:shadow-md  text-gray-600 hover:text-white"
          
          >
            More Details
          </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["GStore"],
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    vaccinateStatus() {
      if (this.patient.status == 0) {
        return "Non-Vaccinated";
      } else if (this.patient.status == 1) {
        return this.patient.status + " dose";
      } else {
        return this.patient.status + " doses";
      }
    },
  },
  methods: {
    goToInfo() {
      this.GStore.selectedPatient = this.patient.id;
      this.$router.push({ name: "Info" });
    },
    goToVaccine() {
      this.GStore.selectedPatient = this.patient.id;
      this.$router.push({ name: "Vaccine" });
    },
    goToComment() {
      this.GStore.selectedPatient = this.patient.id;
      this.$router.push({ name: "Comment" });
    },
    chooseToShow(){
      if(this.GStore.currentUser.authorities[0].name == "ROLE_DOCTOR"){
        return this.user.user.username
      }else {
        return this.user.username
      }
    }
  },
};
</script>

<style scoped>
.root {
  height: auto;
}
.patientdetails {
  font-size: 16px;
}
#Moredetails {
  cursor: pointer;
}
</style>
