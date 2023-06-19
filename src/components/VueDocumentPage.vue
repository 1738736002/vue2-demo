<!--
  创建人：wenwen.xu
  创建时间：2023-06-06
  页面描述：文档page
-->
<template>
  <div class="main">
    <vue-file-toolbar-menu :content="menuList" class="bar" />
    <vue-document-editor
      v-if="pageContent.length"
      class="editor"
      ref="editor"
      :content.sync="pageContent"
      :editable="false"
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
import VueFileToolbarMenu from 'vue-file-toolbar-menu'
import VueDocumentEditor from 'vue-document-editor'
// 枚举

// 方法

// 接口

// 常量

export default {
  // 组件
  components: { VueDocumentEditor, VueFileToolbarMenu },
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
      display: 'vertical', // ["grid", "vertical", "horizontal"]
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
    },
    menuList () {
      return [
        { // Format menu
          text: this.current_format_name,
          title: 'Format',
          icon: 'crop_free',
          chevron: true,
          menu: this.formats.map(([text, w, h]) => {
            return {
              text,
              active: (this.page_format_mm[0] === w && this.page_format_mm[1] === h),
              click: () => { this.page_format_mm = [w, h] }
            }
          }),
          menu_width: 80,
          menu_height: 280
        },
        { // Margins menu
          text: this.current_margins_name,
          title: 'Margins',
          icon: 'select_all',
          chevron: true,
          menu: this.margins.map(([text, value]) => {
            return {
              text: text + ' (' + value + ')',
              active: (this.page_margins === value),
              click: () => { this.page_margins = value }
            }
          }),
          menu_width: 200,
          menu_class: 'align-center'
        },
        { // Zoom menu
          text: Math.floor(this.zoom * 100) + '%',
          title: 'Zoom',
          icon: 'zoom_in',
          chevron: true,
          menu: [
            ['200%', 2.0],
            ['150%', 1.5],
            ['125%', 1.25],
            ['100%', 1.0],
            ['75%', 0.75],
            ['50%', 0.5],
            ['25%', 0.25]
          ].map(([text, zoom]) => {
            return {
              text,
              active: this.zoom === zoom,
              click: () => { this.zoom = zoom }
            }
          }),
          menu_width: 80,
          menu_height: 280,
          menu_class: 'align-center'
        },
        { // Display mode menu
          title: 'Display',
          icon: this.display === 'horizontal' ? 'view_column' : (this.display === 'vertical' ? 'view_stream' : 'view_module'),
          chevron: true,
          menu: [{
            icon: 'view_module',
            active: this.display === 'grid',
            click: () => { this.display = 'grid' }
          }, {
            icon: 'view_column',
            active: this.display === 'horizontal',
            click: () => { this.display = 'horizontal' }
          }, {
            icon: 'view_stream',
            active: this.display === 'vertical',
            click: () => { this.display = 'vertical' }
          }],
          menu_width: 55,
          menu_class: 'align-right'
        }
      ]
    },
    current_format_name () {
      // eslint-disable-next-line camelcase
      const format = this.formats.find(([, width_mm, height_mm]) => (this.page_format_mm[0] === width_mm && this.page_format_mm[1] === height_mm))
      return format ? format[0] : (this.page_format_mm[0] + 'mm x ' + this.page_format_mm[1] + 'mm')
    },
    formats: () => [
      ['A0', 841, 1189],
      ['A0L', 1189, 841],
      ['A1', 594, 841],
      ['A1L', 841, 594],
      ['A2', 420, 594],
      ['A2L', 594, 420],
      ['A3', 297, 420],
      ['A3L', 420, 297],
      ['A4', 210, 297],
      ['A4L', 297, 210],
      ['A5', 148, 210],
      ['A5L', 210, 148],
      ['A6', 105, 148],
      ['A6L', 148, 105]
    ],

    // Margins management
    current_margins_name () {
      const margins = this.margins.find(([, margins]) => (this.page_margins === margins))
      return margins ? margins[0] : this.page_margins
    },
    margins: () => [
      ['Medium', '20mm'],
      ['Small', '15mm'],
      ['Slim', '10mm 15mm'],
      ['Tiny', '5mm']
    ],
    current_text_style () { return this.mounted ? this.$refs.editor.current_text_style : false }
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
.menu-box {
  position fixed;
  top 0;
  background #aaaaaa;
  height 40px;
  width 100%;
  display flex;
  align-items center;
}
</style>
