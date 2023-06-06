<!--
  创建人：wenwen.xu
  创建时间：2023-02-23
  页面描述：
-->
<template>
  <div>
    <ul>
      <li v-for='a in arr' :key="a">{{a}}</li>
    </ul>
  </div>
</template>

<script setup>

import { nextTick, onMounted, ref } from 'vue'

const arr = ref([1, 2, 3])

onMounted(() => {
  nextTick()
})

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
</style>
