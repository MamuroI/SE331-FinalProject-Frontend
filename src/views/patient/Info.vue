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
          <h3 class="subtext capitalize">
            {{ GStore.user.age }} years old
          </h3>
        </div>
        <div class="col-span-2">
          <h3 v-if="GStore.user.address" class="header">
            Address:
          </h3>
        </div>
        <div class="col-span-3">
          <h3 class="subtext capitalize">
            {{ GStore.user.address }}
          </h3>
        </div>

        <div class="col-span-2">
          <h3 v-if="GStore.user.authorities.length>0" class="header">
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
        v-if="GStore.user.vaccines.length>0"
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
      <div v-if="GStore.user.vaccines.length>0" v-show="seen">
        <table class="justify-center">
          <tr class="">
            <th class="col-span-2 ">No:</th>
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

      <CommentList v-if="comments.length>0" :comments="comments"></CommentList>

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
  inject:['GStore'],
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
      if (this.GStore.user.vaccines.length == 0) {
        return "Non-Vaccinated";
      } else if (this.GStore.user.vaccines.length == 1) {
        return this.GStore.user.vaccines.length + " dose";
      } else {
        return this.GStore.user.vaccines.length + " doses";
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
    if(this.GStore.user.comment != ""){
      this.addComment(this.GStore.user.comment)
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