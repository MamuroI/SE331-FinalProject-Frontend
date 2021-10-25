<template>
  <div class="grid md:grid-cols-5">
    <div class="md:col-span-1 md:ml-10">
      <h3
        class="
          grid
          text-gray-500
          md:justify-start
          items-center
          mt-10
          hover:text-gray-700
          hover:bg-gray-100
        "
        @click="setFilterStatus(-1)"
      >
        All patients
      </h3>
      <h3
        class="
          grid
          text-gray-500
          md:justify-start
          mt-10
          hover:text-gray-700
          hover:bg-gray-100
        "
        @click="setFilterStatus(1)"
      >
        First Dose
      </h3>
      <h3
        class="
          grid
          text-gray-500
          md:justify-start
          mt-10
          hover:text-gray-700
          hover:bg-gray-100
        "
        @click="setFilterStatus(2)"
      >
        Second Dose
      </h3>
      <h3
        class="
          grid
          text-gray-500
          md:justify-start
          mt-10
          hover:text-gray-700
          hover:bg-gray-100
        "
        @click="setFilterStatus(0)"
      >
        Non-vaccinated
        <!-- {{ filterStatus == 0 }} -->
      </h3>
    </div>
    <div class="md:col-span-4 mx-4">
      <div id="jumbotron"></div>
      <h1
        id="header"
        class="grid justify-center md:justify-start text-gray-400 mt-3 mb-3"
      >
        List of Patients
      </h1>
      <div
        v-if="filterStatus == -1"
        class="
          grid grid-cols-1
          sm:grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-4
        "
      >
        <Card
          v-for="patient in GStore.patients"
          :key="patient.id"
          :patient="patient"
        />
      </div>
      <div
        v-if="filterStatus != -1"
        class="
          grid grid-cols-1
          sm:grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-4
        "
      >
        <Card
          v-for="patient in getDose"
          :key="patient.id"
          :patient="patient"
        />
      </div>
      <div
        class="
          w-full
          flex flex-row
          justify-around
          items-center
          my-12
          text-lg
          font-medium
        "
      >
        <router-link
          v-if="canPrev"
          rel="prev"
          :to="{ name: 'Home', query: { page: page - 1 } }"
          >prev</router-link
        >
        <router-link
          v-if="canNext"
          rel="prev"
          :to="{ name: 'Home', query: { page: page + 1 } }"
          >next</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import api from "@/services";
// @ is an alias to /src

export default {
  name: "Home",
  inject: ["GStore"],
  props: {
    page: {
      type: Number,
      required: true,
    },
  },
  components: {
    Card,
  },
  data() {
    return {
      patients: [],
      filterStatus: -1,
      totalPatient: null,
      AllPatientsModel: []
    };
  },
  computed: {
    canNext() {
      let totalPages = Math.ceil(this.totalPatient / 6);
      return this.page < totalPages;
    },
    canPrev() {
      return this.page > 1;
    },
    getDose: function () {
      let filterModel = this.AllPatientsModel.filter((patient) => {
        return patient.status === this.filterStatus;
      });
      this.setTotalPatients(filterModel.length)
      return filterModel
    },
  },
  created(){
      api
      .getAllPatients()
      .then((response) => {
          this.AllPatientsModel = response.data;
        })
      .catch(() => {
        this.$router.push({ name: "Home" });
      });
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteEnter(routeTo, routeFrom, next) {
    api
      .getPatients(parseInt(routeTo.query.page))
      .then((response) => {
        next((comp) => {
          comp.GStore.patients = response.data;
          console.log(comp.GStore.patients);
          comp.totalPatient = response.headers["x-total-count"];
        });
      })
      .catch(() => {
        next({ name: "NetworkError" });
      });
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteUpdate(routeTo, routeFrom, next) {
    api
      .getPatients(parseInt(routeTo.query.page))
      .then((response) => {
        this.GStore.patients = response.data;
        this.totalPatient = response.headers["x-total-count"];
        next();
      })
      .catch(() => {
        next({ name: "NetworkError" });
      });
  },
  methods: {
    setFilterStatus(status){
      if(status){
        this.totalPatient = this.AllPatientsModel.length
      }
      this.filterStatus = status
    },
    setTotalPatients(number){
      this.totalPatient = number;
    }
  }
};
</script>

<style scoped>
h3 {
  font-size: 20px;
  cursor: pointer;
}
#jumbotron {
  background-image: url("../assets/covid19jumbotron2.jpg");
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 400px;
}
@media only screen and (max-width: 768px) {
  #jumbotron{
    margin-top: 30px;
    height: 300px;
    background-size: cover;
    background-position: center ;
    background-repeat: no-repeat;
  }
}
@media only screen and (max-width: 450px) {
  #jumbotron{
    margin-top: 30px;
    height: 200px;
    background-size: cover;
    background-position: center ;
    background-repeat: no-repeat;
  }
}
#header {
  font-size: 30px;
  font-weight: 600;
}
</style>
