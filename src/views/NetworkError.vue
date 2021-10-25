<template>
  <div class="grid justify-center bg-red-300 h-screen">
      <img
      :src="require('../assets/NetworkError.png')"
      width="300"
      class="mx-auto mt-11"
    />
    <h1 class="Errortext text-red-600 mt-3">Uh-Oh!</h1>

    <h1 class="Errortext text-red-600">
      It looks like you're experiencing some network issues, please take a
      breath and
      <a href="#" @click="$router.go(-1)">click here</a> to try again.
    </h1>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>