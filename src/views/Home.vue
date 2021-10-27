<template>
  <div class="grid">
    <div class="md:col-span-4 mx-4">
      <div id="jumbotron"></div>
      <h1
        id="header"
        class="grid justify-center md:justify-start text-gray-400 mt-3 mb-3"
      >
        List of Users
      </h1>
      <div
        class="
          grid grid-cols-1
          sm:grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-4
        "
      >
        <Card v-for="user in GStore.users" :key="user.id" :user="user" />
      </div>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import api from "@/services";
// import doctorApi from '@/services/DoctorService.js'
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
      AllModels: [],
    };
  },
  created(){
      api
      .getAllUsers()
      .then((response) => {
          this.AllModels = response.data;
        })
      .catch(() => {
        this.$router.push({ name: "Login" });
      });
  },

  // eslint-disable-next-line no-unused-vars
  beforeRouteEnter(routeTo, routeFrom, next) {
    api
      .getAllUsers()
      .then((response) => {
        next((comp) => {
          comp.GStore.users = response.data;
        });
      })
      .catch(() => {
        next({ name: "NetworkError" });
      });
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteUpdate(routeTo, routeFrom, next) {
    api
      .getAllUsers()
      .then((response) => {
        this.GStore.users = response.data;
        next();
      })
      .catch(() => {
        next({ name: "NetworkError" });
      });
  },
  methods: {},
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
  #jumbotron {
    margin-top: 30px;
    height: 300px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
}
@media only screen and (max-width: 450px) {
  #jumbotron {
    margin-top: 30px;
    height: 200px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
}
#header {
  font-size: 30px;
  font-weight: 600;
}
</style>
