<template>
  <div class="w-full shadow-lg bg-red-100 px-5 py-5 m-1 rounded root">
    <div class="grid grid-cols-1 md:grid-cols-3">
      <div class="grid md:col-span-1 justify-center items-center">
        <img
          v-if="patient.sex === 'male'"
          :src="require('../assets/male.png')"
          width="150"
        />
        <img
          v-if="patient.sex === 'female'"
          :src="require('../assets/female.png')"
          width="150"
        />
      </div>
      <div class="grid md:col-span-2 md:pl-4 mt-2 md:mt-0">
        <div class="grid">
          <h2 class="grid justify-start patientdetails">
            Name: {{ patient.name }} {{ patient.surname }}
          </h2>
          <h2 class="grid justify-start patientdetails">
            Status: {{ vaccinateStatus }}
          </h2>
        </div>
        <div class="grid items-end">
          <button
            id="Moredetails"
            @click="goToInfo"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["GStore"],
  props: {
    patient: {
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
