<template>
  <div class="container mx-auto mt-3">
    <div class="patientInfo mx-auto bg-red-200" v-if="GStore.patientInfo">
      <h1 id="header">Patient Info</h1>
      <div>
        <img
          v-if="GStore.patientInfo.sex === 'male'"
          :src="require('../../assets/male.png')"
          width="200"
          class="mx-auto"
        />
        <img
          v-if="GStore.patientInfo.sex === 'female'"
          :src="require('../../assets/female.png')"
          width="200"
          class="mx-auto"
        />
      </div>
      <div class="infolist mt-2 grid grid-cols-5">
        <div class="col-span-2">
          <h3 v-if="GStore.patientInfo.name" class="header">Name:</h3>
        </div>
        <div class="col-span-3">
          <h3 class="subtext capitalize">{{ GStore.patientInfo.name }}</h3>
        </div>
        <div class="col-span-2">
          <h3 v-if="GStore.patientInfo.surname" class="header">Surname:</h3>
        </div>
        <div class="col-span-3">
          <h3 class="subtext capitalize">{{ GStore.patientInfo.surname }}</h3>
        </div>
        <div class="col-span-2">
          <h3 v-if="GStore.patientInfo.age" class="header">Age:</h3>
        </div>
        <div class="col-span-3">
          <h3 class="subtext capitalize">
            {{ GStore.patientInfo.age }} years old
          </h3>
        </div>

        <div class="col-span-2">
          <h3 v-if="GStore.patientInfo.sex" class="header">Sex:</h3>
        </div>
        <div class="col-span-3">
          <h3 class="subtext capitalize">{{ GStore.patientInfo.sex }}</h3>
        </div>

        <div class="col-span-2">
          <h3 v-if="GStore.patientInfo.address.district" class="header">
            District:
          </h3>
        </div>
        <div class="col-span-3">
          <h3 class="subtext capitalize">
            {{ GStore.patientInfo.address.district }}
          </h3>
        </div>

        <div class="col-span-2">
          <h3 v-if="GStore.patientInfo.address.city" class="header">City:</h3>
        </div>
        <div class="col-span-3">
          <h3 class="subtext capitalize">
            {{ GStore.patientInfo.address.city }}
          </h3>
        </div>

        <div class="col-span-2">
          <h3 v-if="GStore.patientInfo.address.state" class="header">State:</h3>
        </div>
        <div class="col-span-3">
          <h3 class="subtext capitalize">
            {{ GStore.patientInfo.address.state }}
          </h3>
        </div>

        <div class="col-span-2">
          <h3 v-if="GStore.patientInfo.address.country" class="header">
            Country:
          </h3>
        </div>
        <div class="col-span-3">
          <h3 class="subtext capitalize">
            {{ GStore.patientInfo.address.country }}
          </h3>
        </div>

        <div class="col-span-2">
          <h3 v-if="GStore.patientInfo.address.more" class="header">More:</h3>
        </div>
        <div class="col-span-3">
          <h3 class="subtext capitalize">
            {{ GStore.patientInfo.address.more }}
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
        v-if="GStore.patientInfo.vaccines.length"
        class="
          px-5
          py-2
          my-2
          rounded
          w-64
          transition-all
          bg-yellow-200
          hover:bg-yellow-400
          hover:shadow-md
        "
      >
        <p class="text-md text-yellow-500 hover:text-white">Vaccine Details</p>
      </button>
      <div v-if="GStore.patientInfo.vaccines.length" v-show="seen">
        <table>
          <tr class="grid grid-cols-5 justify-between">
            <th class="col-span-1">No:</th>
            <th class="col-span-2">Vaccine Brand</th>
            <th class="col-span-1">Date</th>
            <th class="col-span-1">Time(24hrs)</th>
          </tr>
          <tr
            :key="item.vaccine"
            v-for="(item, index) in GStore.patientInfo.vaccines"
            class="grid grid-cols-5 justify-between"
          >
            <td class="col-span-1">{{ index + 1 }}</td>
            <td class="col-span-2">{{ item.vaccine }}</td>
            <td class="col-span-1">{{ item.date }}</td>
            <td class="col-span-1">{{ item.time }}</td>
          </tr>
        </table>
      </div>

      <CommentList v-if="comments.length" :comments="comments"></CommentList>

      <form class="comment-form grid" @submit.prevent="onSubmit">
        <div class="text-lg mt-8">
          <h1 class="commentHeader mb-2">Add Comment:</h1>
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
              w-24
              transition-all
              bg-green-200
              text-green-600
              hover:bg-green-400
              hover:text-white
              hover:shadow-md
            "
            type="submit"
            value="Submit"
          />
        </div>
      </form>
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
            hover:bg-gray-200
            hover:shadow-md
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
      if (this.commentDetails === "") {
        alert("Please comment before submit!");
        return;
      }
      this.addComment(this.commentDetails);
      this.commentDetails = "";
    },
  },
  computed: {
    vaccinateStatus() {
      if (this.GStore.patientInfo.status == 0) {
        return "Non-Vaccinated";
      } else if (this.GStore.patientInfo.status == 1) {
        return this.GStore.patientInfo.status + " dose";
      } else {
        return this.GStore.patientInfo.status + " doses";
      }
    },
  },
  data() {
    return {
      seen: false,
      comments: [],
      commentDetails: "",
    };
  },
  components: {
    CommentList
  },
  created() {
    if(this.GStore.patientInfo.comment != ""){
      this.addComment(this.GStore.patientInfo.comment)
    }
  }
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
#comment-details {
  height: 100px;
}
.commentHeader {
  font-size: 20px;
  font-weight: 400;
  text-align: left;
}
.button {
  text-align: right;
  cursor: pointer;
}
</style>