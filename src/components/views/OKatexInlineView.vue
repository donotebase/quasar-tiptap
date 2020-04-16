<template>
  <span class="o-katex-inline">
    <span v-html="html"></span>
    <q-menu content-class="o-katex-editor" :offset="[0, 8]">
      <section>
        <codemirror v-model="src"
                    ref="codemirror"
                    :options="editorOption"
                    @input="onEditorChanged" />
        <div class="row col-12 justify-between o-toolbar">
          <div class="row col items-center q-px-md">{{$o.lang.editor.inlineFormula}}</div>
          <div class="col-auto actions">
            <q-btn icon="help_outline" @click="onHelp" flat />
          </div>
        </div>
      </section>
    </q-menu>
  </span>
</template>

<script>
import { openUrl } from 'src/utils/shared'
// Code Mirror
import { codemirror } from 'vue-codemirror'
import 'codemirror/addon/edit/continuelist'
import 'codemirror/addon/selection/active-line'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/neat.css'
import 'codemirror/mode/markdown/markdown'
import 'src/css/katex/katex.min.css'

const katex = require('katex')

export default {
  name: 'o-katex-inline',
  data () {
    return {
      example: '',
      html: '',
      error: false,
      timeout: 0,
      // editor
      editorOption: {
        tabSize: 4,
        // mode: 'text/x-gfm',
        mode: {
          name: 'markdown',
          json: true
        },
        theme: 'neat',
        line: true,
        lineWrapping: true,
        lineNumbers: true,
        // sublime、emacs、vim三种键位模式，支持你的不同操作习惯
        // keyMap: 'sublime',
        // 按键映射
        extraKeys: {
          Enter: 'newlineAndIndentContinueMarkdownList'
        },
        // 代码折叠
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],

        // Styles
        // 选中文本自动高亮，及高亮方式
        styleActiveLine: true,
        styleSelectedText: true,
        scrollbarStyle: 'native',
        tabindex: 1,
        autofocus: false
        // TOC
      }
    }
  },
  props: ['node', 'updateAttrs', 'view'],
  components: {
    codemirror
  },
  methods: {
    init () {
      if (!this.src) {
        setTimeout(() => {
          this.src = 'E=mc^2'
          this.renderKatex()
        }, 100)
      } else {
        this.renderKatex()
      }
    },
    renderKatex () {
      try {
        this.error = false

        this.html = katex.renderToString(this.src)
      } catch (e) {
        this.error = true
        this.html = e.message
      }
    },
    onEditorChanged () {
      if (this.timeout) clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.renderKatex()
      }, 300)
    },
    onSelectTemplate (item) {
    },
    onHelp () {
      openUrl('https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference')
    }
  },
  computed: {
    src: {
      get () {
        return this.node.attrs.src
      },
      set (src) {
        this.updateAttrs({
          src
        })
      }
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="stylus">
  .o-katex-inline {
    position relative
    display inline
    white-space unset
    cursor pointer
  }

  .o-katex-inline:hover {
    background rgba(0,0,0,0.05)
  }

  .o-katex-editor {
    min-width 600px

    .o-toolbar {
      background rgba(0,0,0,0.05)
    }

    .CodeMirror {
      height 200px
    }
  }
</style>
