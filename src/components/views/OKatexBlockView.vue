<template>
  <o-block-card class="o-katex" :class="contentClass"
                :view="view"
                :selected="selected"
                :get-pos="getPos"
                :toolbar="view.editable" @toggle-screen="onToggleFullScreen">
    <template slot="toolbar-left">
      <div class="row col items-center full-height q-px-sm providers">
        <q-icon name="mdi-sigma" /> {{$o.lang.editor.blockFormula}}
      </div>
    </template>

    <template slot="toolbar-right">
      <q-btn-dropdown :label="$t('template')" menu-anchor="bottom left" menu-self="top left"
                      :menu-offset="[0, 8]" content-class="o-menu" dense flat v-if="false">
        <q-list>
          <q-item v-for="(item, index) of mermaidDiagrams" :key="index"
                  @click.native="onSelectTemplate(item)" clickable v-close-popup>
            <q-item-section side v-if="false">
              <q-icon name="format_align_left" />
            </q-item-section>
            <q-item-section>{{item.label}}</q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <q-btn :label="toggleLabel" @click="toggleMode" class="text-blue" flat v-if="view.editable" />
      <q-btn-dropdown dropdown-icon="more_vert" class="dropdown-menu" flat dense>
        <q-list style="min-width: 120px;">
          <o-common-item icon="delete" :label="$o.lang.label.remove" @click.native="onDelete" />
          <o-common-item icon="help_outline" :label="$o.lang.label.help" @click.native="onHelp" />
        </q-list>
      </q-btn-dropdown>
    </template>

    <section class="row col-12 diagram">
      <section class="col source" v-if="mode==='edit' || fullScreen">
        <codemirror class="diagram-editor"
                    id="codemirror"
                    v-model="src"
                    ref="codemirror"
                    :options="editorOption"
                    :hint="true"
                    @input="onEditorChanged"
        >
        </codemirror>

        <div class="text-red error" v-if="error"><q-icon name="info"/> 语法错误</div>
      </section>
      <section class="col preview" :class="error?'error':''" v-if="mode==='preview' || fullScreen">
        <div v-html="html"></div>
      </section>
    </section>
  </o-block-card>
</template>

<script>
import OBlockCard from 'src/components/common/OBlockCard'
import OCommonItem from 'src/components/common/OCommonItem'
import { openUrl } from 'src/utils/shared'

// Code Mirror
import { codemirror } from 'vue-codemirror'
import 'codemirror/addon/edit/continuelist'
import 'codemirror/addon/selection/active-line'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/neat.css'
import 'codemirror/mode/markdown/markdown'
import 'src/css/katex/katex.min.css'

import { MermaidTemplates } from 'src/data/diagrams'
const katex = require('katex')

export default {
  name: 'o-katex',
  data () {
    return {
      fullScreen: false,
      mode: 'preview',
      provider: 'mermaid',
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
  props: ['node', 'updateAttrs', 'view', 'selected', 'getPos'],
  components: {
    codemirror,
    OBlockCard,
    OCommonItem
  },
  methods: {
    init () {
      if (this.provider === 'mermaid') {
        if (!this.src) {
          setTimeout(() => {
            this.src = 'E=mc^2'
            this.renderKatex()
          }, 100)
        } else {
          this.renderKatex()
        }
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
    onToggleFullScreen (value) {
      this.fullScreen = value
    },
    toggleMode () {
      try {
        // toggle mode
        this.mode = (this.mode === 'edit') ? 'preview' : 'edit'

        // reset
        if (this.mode === 'preview') {
          this.renderKatex()
        } else {
          setTimeout(() => {
            this.$refs.codemirror.codemirror.focus()
          }, 100)
        }
      } catch (e) {
        console.error(e)
        this.error = true
      }
    },
    onEditorChanged () {
      if (this.fullScreen) {
        if (this.timeout) clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.renderKatex()
        }, 300)
      }
    },
    onSelectTemplate (item) {
      console.log('template', item, MermaidTemplates[item.value])
      if (this.provider === 'mermaid') {
        this.src = MermaidTemplates[item.value]
        this.renderKatex()
      }
    },
    onDelete () {
      let tr = this.view.state.tr
      let pos = this.getPos()
      tr.delete(pos, pos + this.node.nodeSize)
      this.view.dispatch(tr)
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
    },
    toggleLabel () {
      return this.mode === 'edit' ? this.$o.lang.label.preview : this.$o.lang.label.edit
    },
    contentClass () {
      return this.fullScreen ? 'full-screen' : ''
    },
    mermaidDiagrams () {
      return [
        { label: '流程图 (Flow)', value: 'flow' },
        { label: '时序图 (Sequence)', value: 'sequence' },
        { label: '类图 (Class)', value: 'class' },
        { label: '状态图 (State)', value: 'state' },
        { label: '甘特图 (Gantt)', value: 'gantt' }
      ]
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="stylus">
  .o-katex {
    position relative
    cursor crosshair

    .diagram {
      width 100%

      .source {
        position relative
        min-height 200px
        border solid 1px rgba(0,0,0,0.05)

        .diagram-editor {
          position absolute
          top 0
          left 0
          right 0
          bottom 0
          z-index 1

          .CodeMirror {
            width 100%
            height 100%

            pre {
              background unset
              color unset
              padding unset
              border-radius unset
              font-size 1rem
              font-family "Source Code Pro", 'Ubuntu Mono', Consolas, monospace !important;
            }

            pre.CodeMirror-line {
              padding 0 4px
            }
          }
        }

        .error {
          position absolute
          right 10px
          bottom 10px
          z-index 10
        }
      }

      .preview {
        text-align center
      }

      .preview.error {
        background $red-1
        border-radius 2px
      }
    }

    .o-card-inner-toolbar {
      visibility hidden !important
    }
  }

  .o-katex.full-screen {
    .diagram {
      height calc(100vh - 40px)
    }

    .preview {
      position relative
      width 50%
      height 100%
      padding 50px 0

      .scroll-area {
        position absolute
        top 0
        bottom 0
        left 0
        right 0
      }
    }
  }
</style>
