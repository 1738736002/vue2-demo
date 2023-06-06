<!--
  创建人：wenwen.xu
  创建时间：2023-06-06
  页面描述：文档page
-->
<template>
  <div class="main">
    <vue-document-editor
      class="editor"
      ref="editor"
      :content.sync="pageContent"
      :editable="true"
      :overlay="overlay"
      :zoom="zoom"
      :page_format_mm="page_format_mm"
      :page_margins="page_margins"
      :display="display"/>
  </div>
</template>

<script>
// vuex等插件

// 组件
import VueDocumentEditor from 'vue-document-editor'
// 枚举

// 方法

// 接口

// 常量

export default {
  // 组件
  components: {VueDocumentEditor},
  props: {
    content: {
      type: [Array, Object],
      required: true,
      default: () => []
    }
  },
  // 数据对象，本页面用到的所有数据
  data () {
    return {
      page_format_mm: [210, 297],
      page_margins: '15mm 15mm',
      display: 'grid', // ["grid", "vertical", "horizontal"]
      mounted: false, // will be true after this component is mounted
      undo_count: -1,
      zoom: 1
    }
  },

  // 计算属性
  computed: {
    pageContent () {
      if (this.content && this.content.length) {
        return this.content
      } else {
        return []
      }
    }
  },

  // 监控
  watch: {
    content (val) {
    }
  },

  // 方法与事件处理
  methods: {
    overlay (page, total) {
      // Add page numbers on each page
      let html = '<div style="position: absolute; bottom: 5mm; ' + 'right' + ': 10mm">Page ' + page + ' of ' + total + '</div>'
      // Add custom headers and footers from page 3
      if (page >= 20) {
        html += '<div style="position: absolute; left: 0; top: 0; right: 0; padding: 3mm 5mm; background: rgba(200, 220, 240, 0.5)"><strong>MYCOMPANY</strong> example.com /// This is a custom header overlay</div>'
        html += '<div style="position: absolute; left: 10mm; right: 10mm; bottom: 5mm; text-align:center; font-size:10pt">MY COMPANY - example.com /// This is a custom footer overlay</div>'
      }
      return html
    }
  },

  // 组件生命周期钩子，一般常用的是 mounted
  mounted () {
    this.mounted = true
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
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
