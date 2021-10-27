<template>
  <label v-if="label" class="label">{{ label }}</label>
  <select
    class="field"
    :value="modelValue"
    v-bind="{
      ...$attrs,
      onChange: ($event) => {
        $emit('update:modelValue', $event.target.value);
      },
    }"
  >
    <option
      v-for="option in options"
      :value="option.id"
      :key="option.id"
      :selected="option.id === modelValue.id"
      class="option"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number, Object],
      default: "",
    },
    options: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
  .label {
    color: orangered;
    font-size: 18px;
    padding-right: 20px;
    font-weight: 600;
  }
  .field {
    height: 40px;
    border-radius: 5px;
    background-color: orange;
    color: white;
    margin-right: 30px;
  }
  .option {
    font-size: 18px;
  }
</style>