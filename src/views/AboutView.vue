<template>
  <div class="main">
    <vue-document-page
      :content.sync="content"/>
  </div>
</template>
<script setup>
import { ref, onMounted, onActivated, nextTick } from 'vue'
import VueDocumentPage from '@/components/VueDocumentPage'
import { contentData } from './pageData.js'
import HelloWorld from '@/components/HelloWorld'
// 响应式状态
const count = ref(0)
const content = [...contentData(), {template: HelloWorld}]
// 生命周期钩子
onMounted(async () => {
  console.log(`计数器初始值为 ${count.value}。${new Date().getTime()}`)
  await nextTick()
  console.log('nextTick之后', new Date().getTime())
})
onActivated(() => {
  console.log('update')
  if (count.value !== 0) {
    count.value = 10
  }
})
</script>
<style scoped>
.main {
  width: fit-content;
  min-width: 100%;
}
.bar {
  position: sticky;
  left: 0;
  top: 0;
  width: calc(100vw - 16px);
  z-index: 1000;
  background: rgba(248, 249, 250, 0.8);
  border-bottom: solid 1px rgb(248, 249, 250);
  backdrop-filter: blur(10px);
  --bar-button-active-color: #188038;
  --bar-button-open-color: #188038;
  --bar-button-active-bkg: #e6f4ea;
  --bar-button-open-bkg: #e6f4ea;
}
</style>
