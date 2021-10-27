<template>
  <div class="comment-container grid my-3">
    <h3 class="grid justify-start header">Comment Lists:</h3>
    <ul class="grid justify-start bg-white rounded">
      <li class="comments pl-4 py-2" v-for="item in comments" :key="item">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    comments: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
.header {
  font-size: 20px;
  font-weight: 600;
}
.comments {
  text-align: left;
}
</style>