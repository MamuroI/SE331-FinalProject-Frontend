<template>
  <div v-if="GStore.patientInfo">
      <h2>Vaccine brand: {{GStore.patientInfo.vaccines[0]}}</h2>
  </div>
</template>

<script>
export default {
    inject: ['GStore']
}
</script>

<style>

</style>