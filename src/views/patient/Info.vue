<template>
  <div class="container mx-auto mt-3">
    <div class="patientInfo mx-auto bg-red-200">
      <h1 id="header">User Info</h1>
      <div class="infolist mt-2 grid grid-cols-5">
        <div class="col-span-2">
          <h3 v-if="GStore.user.username" class="header">Username:</h3>
        </div>
        <div class="col-span-3">
          <h3 class="subtext capitalize">{{ GStore.user.username }}</h3>
        </div>
        <div class="col-span-2">
          <h3 v-if="GStore.user.firstname" class="header">Firstname:</h3>
        </div>
        <div class="col-span-3">
          <h3 class="subtext capitalize">{{ GStore.user.firstname }}</h3>
        </div>
        <div class="col-span-2">
          <h3 v-if="GStore.user.lastname" class="header">Lastname:</h3>
        </div>
        <div class="col-span-3">
          <h3 class="subtext capitalize">{{ GStore.user.lastname }}</h3>
        </div>
        <div class="col-span-2">
          <h3 v-if="GStore.user.age" class="header">Age:</h3>
        </div>
        <div class="col-span-3">
          <h3 class="subtext capitalize">{{ GStore.user.age }} years old</h3>
        </div>
        <div class="col-span-2">
          <h3 v-if="GStore.user.address" class="header">Address:</h3>
        </div>
        <div class="col-span-3">
          <h3 class="subtext capitalize">
            {{ GStore.user.address }}
          </h3>
        </div>

        <div class="col-span-2">
          <h3 v-if="GStore.user.authorities.length > 0" class="header">
            Role:
          </h3>
        </div>
        <div class="col-span-3">
          <h3 class="subtext capitalize">
            {{ GStore.user.authorities[0].name }}
          </h3>
        </div>

        <div class="col-span-2">
          <h3 class="header">Vaccine Status:</h3>
        </div>
        <div class="col-span-3">
          <h3 class="subtext capitalize">{{ vaccinateStatus }}</h3>
        </div>
      </div>
      <button
        @click="seen = !seen"
        v-if="GStore.user.vaccines.length > 0"
        class="
          px-5
          py-2
          my-2
          rounded
          w-64
          transition-all
          bg-yellow-200
          hover:bg-yellow-400 hover:shadow-md
        "
      >
        <p class="text-md text-yellow-500 hover:text-white">Vaccine Details</p>
      </button>
      <div v-if="GStore.user.vaccines.length > 0" v-show="seen">
        <table class="justify-center">
          <tr class="">
            <th class="col-span-2">No:</th>
            <th class="col-span-8 justify-center">Vaccine Brand</th>
          </tr>
          <tr
            :key="item.name"
            v-for="(item, index) in GStore.user.vaccines"
            class=""
          >
            <td class="col-span-2">{{ index + 1 }}</td>
            <td class="col-span-8">{{ item.name }}</td>
          </tr>
        </table>
      </div>
      {{ GStore.currentUser }}
      <div v-if="GStore.currentUser.authorities[0].name === 'ROLE_ADMIN'" class="addVaccineBg" >

      
      <h4 class="vaccineHeader">Add vaccine</h4>
      <form @submit.prevent="onSubmitVaccine">
        <BaseSelect
          :options="this.vaccinesList"
          v-model="vaccines_id"
          label="Select an vaccine"
        />
        <button type="submit" class="submitbtn">Submit</button>
      </form>
      </div>

      <CommentList
        v-if="comments.length > 0"
        :comments="comments"
      ></CommentList>

      <form v-if="GStore.currentUser.authorities[0].name === 'ROLE_DOCTOR'" class="comment-form grid" @submit.prevent="onSubmit">
        <div class="text-lg mt-8">
          <h1 class="commentHeader mb-2">Add Comment</h1>
        </div>

        <textarea id="comment-details" v-model="commentDetails"></textarea>
        <div class="grid justify-end">
          <input
            class="
              button
              px-5
              py-2
              mt-2
              rounded
              w-40
              transition-all
              bg-green-200
              text-green-600
              hover:bg-green-400 hover:text-white hover:shadow-md
            "
            type="submit"
            value="Submit"
          />
        </div>
      </form>

      <div v-if="GStore.currentUser.authorities[0].name === 'ROLE_ADMIN'" class="grid grid-cols-3 pt-4" :v-if="GStore.user.authorities[0].name == 'ROLE_ADMIN'">
        <div>
          <button
            v-on:click="giveAdminRole"
            class="
              px-5
              py-2
              my-2
              rounded
              w-30
              transition-all
              bg-gray-400
              hover:bg-black hover:shadow-md hover:text-white
            "
          >
            Give Admin Role
          </button>
        </div>
        <div>
          <button
            v-on:click="giveDoctorRole"
            class="
              px-5
              py-2
              my-2
              rounded
              w-30
              transition-all
              bg-blue-200
              hover:bg-blue-400 hover:shadow-md
            "
          >
            Give Doctor Role
          </button>
        </div>
        <div>
          <button
            v-on:click="givePatientRole"
            class="
              px-5
              py-2
              my-2
              rounded
              w-30
              transition-all
              bg-green-200
              hover:bg-green-400 hover:shadow-md
            "
          >
            Give Patient Role
          </button>
        </div>
      </div>
      <div class="grid justify-start">
        <button
          @click="goBack"
          class="
            px-5
            py-2
            mt-5
            rounded
            w-32
            transition-all
            bg-white
            hover:bg-gray-200 hover:shadow-md
          "
        >
          Back
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CommentList from "./CommentList.vue";
import doctorApi from "@/services/DoctorService.js";
import vaccineApi from "@/services/VaccineService.js";
import AuthService from "@/services/AuthService.js";
import api from "@/services";
export default {
  inject: ["GStore"],

  methods: {
    goBack() {
      this.$router.push({ name: "Home" });
    },
    addComment(comment) {
      this.comments.push(comment);
    },
    onSubmit() {
      this.commentForm.id = this.GStore.user.id;
      this.commentForm.comment = this.commentDetails;
      doctorApi
        .addComment(this.commentForm)
        .then(() => {
          this.GStore.flashMessage = "You are successfully add a comment ";
          setTimeout(() => {
            this.GStore.flashMessage = "";
          }, 3000);
        })
        .catch(() => {
          this.$router.push("NetworkError");
        });
    },
    onSubmitVaccine() {
      this.vaccineForm.id = this.GStore.user.id;
      this.vaccineForm.vaccine_id = this.vaccines_id;
      vaccineApi
        .giveVaccine(this.vaccineForm)
        .then(() => {
          this.GStore.flashMessage = "You are successfully submit a vaccine ";
          setTimeout(() => {
            this.GStore.flashMessage = "";
          }, 3000);
        })
        .catch(() => {
          this.$router.push("NetworkError");
        });
    },
    giveAdminRole() {
      api
        .giveRoleAdmin(this.GStore.user.id)
        .then(() => {
          this.GStore.flashMessage = "You are successfully give an admin role ";
          setTimeout(() => {
            this.GStore.flashMessage = "";
          }, 3000);
        })
        .catch(() => {
          this.$router.push("NetworkError");
        });
    },
    giveDoctorRole() {
      api
        .giveRoleDoctor(this.GStore.user.id)
        .then(() => {
          this.GStore.flashMessage =
            "You are successfully give an doctor role ";
          setTimeout(() => {
            this.GStore.flashMessage = "";
          }, 3000);
        })
        .catch(() => {
          this.$router.push("NetworkError");
        });
    },
    givePatientRole() {
      api
        .giveRolePatient(this.GStore.user.id)
        .then(() => {
          this.GStore.flashMessage =
            "You are successfully give an patient role ";
          setTimeout(() => {
            this.GStore.flashMessage = "";
          }, 3000);
        })
        .catch(() => {
          this.$router.push("NetworkError");
        });
    },
  },
  computed: {
    vaccinateStatus() {
      if (this.GStore.user.vaccines.length == 0) {
        return "Non-Vaccinated";
      } else if (this.GStore.user.vaccines.length == 1) {
        return this.GStore.user.vaccines.length + " dose";
      } else {
        return this.GStore.user.vaccines.length + " doses";
      }
    },
    isAdmin() {
      return AuthService.hasRoles("ROLE_ADMIN");
    },
  },
  data() {
    return {
      seen: false,
      comments: [],
      commentDetails: "",
      commentForm: {
        id: 0,
        comment: "",
      },
      vaccinesList: [],
      vaccineForm: {
        id: 0,
        vaccine_id: 0,
      },
    };
  },
  components: {
    CommentList,
  },
  created() {
    // if (this.GStore.user.comment != "") {
    //   this.addComment(this.GStore.user.comment);
    // },

    vaccineApi
      .getVaccines()
      .then((response) => {
        this.vaccinesList = response.data;
      })
      .catch(() => {
        this.$router.push("NetworkError");
      });
  },
};
</script>

<style scoped>
.root {
  justify-content: center;
  justify-items: center;
}
#header {
  font-weight: bold;
  font-size: 32px;
  color: white;
  text-align: left;
  margin-bottom: 15px;
}
.header {
  font-weight: 600;
  color: #555;
}
.subtext {
  font-weight: normal;
  color: #888;
}
h3 {
  font-size: 24px;
}
.patientInfo {
  width: 500px;
  height: auto;
  border-radius: 20px;
  padding: 15px;
}
.infolist {
  text-align: left;
}

.commentHeader {
  text-align: center;
  font-size: 20px;
  font-weight: 600;
}
#comment-details{
  background-color: lightcyan;
  color: lightseagreen;
  border-radius: 15px;
  padding: 20px;
  height: 150px;
}

.button {
  text-align: right;
  cursor: pointer;
}
.submitbtn{
  cursor: pointer;
  background-color: orangered;
  color: white;
width: 150px;
height: 35px;
border-radius: 10px;
}
.submitbtn:hover{
  background-color: red;
}
.vaccineHeader{
  font-size: 20px;
  font-weight: 600;
  
}
.addVaccineBg{
  background-color: white;
  opacity: 0.5;
  height: 120px;
  border-radius: 15px;
  align-content: center;
  justify-content: center;
  padding-top: 20px;
  margin-top: 15px;
}
</style>