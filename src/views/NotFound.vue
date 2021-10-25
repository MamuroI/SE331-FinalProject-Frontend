<template>
  <div class="grid justify-center bg-red-300 h-screen">
    <img
      :src="require('../assets/Notfound.png')"
      width="300"
      class="mx-auto mt-11"
    />
    <h1 class="Errortext text-red-600 mt-3">Oops!</h1>
    <h1 class="Errortext text-red-600">
      The {{ resource }} you're looking for is not here.
    </h1>
    <div class="grid justify-center">
      <button
        @click="goBack"
        class="
          button
          px-5
          py-2
          my-2
          rounded
          transition-all
          bg-white
          hover:bg-red-400
          hover:text-white
          hover:shadow-md
        "
      >
        <p class="text-lg">Back to Home page</p>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    resource: {
      type: String,
      required: true,
      default: "page",
    },
  },
  methods: {
    goBack() {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>
<style scoped>
.Errortext {
  font-size: 40px;
  font-weight: 600;
}
.button {
  width: 300px;
  height: 60px;
}
</style>
