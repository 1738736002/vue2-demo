<template>
  <div class="home">
    <vue-document-page
      :content.sync="content"/>
  </div>
</template>

<script>
// @ is an alias to /src
import VueDocumentPage from '@/components/VueDocumentPage'
import HelloWorld from '@/components/HelloWorld'
import { contentData } from './pageData.js'
export default {
  name: 'HomeView',
  components: {VueDocumentPage},
  data () {
    return {
      content: [{template: HelloWorld}, ...contentData()]
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style lang="stylus"></style>
