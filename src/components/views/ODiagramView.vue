<template>
  <o-block-card class="o-diagram" :class="contentClass"
                :view="view"
                :selected="selected"
                :get-pos="getPos"
                :toolbar="view.editable" @toggle-screen="onToggleFullScreen">
    <template slot="toolbar-left">
      <div class="row col items-center full-height q-px-sm providers">
        <q-icon name="mdi-sitemap" /> {{$o.lang.diagram.name}}
      </div>
    </template>

    <template slot="toolbar-right">
      <q-btn-dropdown :label="$o.lang.label.template" menu-anchor="bottom left" menu-self="top left"
                      :menu-offset="[0, 8]" content-class="o-menu" dense flat v-if="view.editable">
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
      <q-btn :label="toggleLabel" @click="toggleMode" class="text-blue" flat v-if="view.editable && !fullScreen" />
      <q-btn-dropdown dropdown-icon="more_vert" class="dropdown-menu" flat dense>
        <q-list style="min-width: 120px;">
          <o-common-item icon="delete" :label="$o.lang.label.remove" @click.native="onDelete" />
          <o-common-item icon="help_outline" :label="$o.lang.label.help" @click.native="onHelp" />
        </q-list>
      </q-btn-dropdown>
    </template>

    <section class="row col-12 diagram">
      <section class="col source" v-if="(mode==='edit' || fullScreen) && view.editable">
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
      <section class="col preview" v-if="mode==='preview' || fullScreen">
        <q-scroll-area class="scroll-area" v-if="fullScreen">
          <div v-html="svg"></div>
        </q-scroll-area>
        <div v-html="svg" v-else></div>
      </section>
    </section>
  </o-block-card>
</template>

<script>
import OBlockCard from 'src/components/common/OBlockCard'
import OCommonItem from 'src/components/common/OCommonItem'

// Code Mirror
import { codemirror } from 'vue-codemirror'
import 'codemirror/addon/edit/continuelist'
import 'codemirror/addon/selection/active-line'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/neat.css'
import 'codemirror/mode/markdown/markdown'

import mermaid from 'mermaid'

import { MermaidTemplates } from 'src/data/diagrams'

export default {
  name: 'o-diagram',
  data () {
    return {
      fullScreen: false,
      mode: 'preview',
      provider: 'mermaid',
      example: '',
      svg: '',
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
    initDiagram () {
      if (this.provider === 'mermaid') {
        if (!this.src) {
          setTimeout(() => {
            this.src = MermaidTemplates.flow
            this.renderMermaid()
          }, 100)
        } else {
          this.renderMermaid()
        }
      }
    },
    renderMermaid () {
      try {
        mermaid.mermaidAPI.initialize({
          securityLevel: 'loose',
          sequence: { showSequenceNumbers: true }
        })

        // check code
        mermaid.parse(this.src)
        this.error = false

        // svgId
        const svgId = `svg-${this.getUuid().substr(0, 6)}`

        // Render
        mermaid.mermaidAPI.render(svgId, this.src, (svgGraph) => {
          // console.log('svgGraph', svgGraph)
          this.svg = svgGraph
        })
      } catch (e) {
        this.error = true
      }
    },
    onToggleFullScreen (value) {
      this.fullScreen = value
    },
    toggleMode () {
      try {
        this.error = false
        // check source
        if (this.mode === 'edit') {
          mermaid.parse(this.src)
        }

        // toggle mode
        this.mode = (this.mode === 'edit') ? 'preview' : 'edit'

        // reset
        if (this.mode === 'preview') {
          this.renderMermaid()
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
          this.renderMermaid()
        }, 300)
      }
    },
    onSelectTemplate (item) {
      // console.log('template', item, MermaidTemplates[item.value])
      if (this.provider === 'mermaid') {
        this.src = MermaidTemplates[item.value]
        this.renderMermaid()
      }
    },
    onDelete () {
      let tr = this.view.state.tr
      let pos = this.getPos()
      tr.delete(pos, pos + this.node.nodeSize)
      this.view.dispatch(tr)
    },
    onHelp () {
      let url = 'https://mermaid-js.github.io/mermaid/#/examples'

      window.open(url, '_blank')
    },
    getUuid () {
      const s = []
      const hexDigits = '0123456789abcdef'
      for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
      }
      s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = '' // -

      return s.join('').substr(0, 6)
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
    height: {
      get () {
        return this.node.attrs.height || 400
      },
      set (height) {
        this.updateAttrs({
          height
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
        { label: this.$o.lang.diagram.flow, value: 'flow' },
        { label: this.$o.lang.diagram.sequence, value: 'sequence' },
        { label: this.$o.lang.diagram.class, value: 'class' },
        { label: this.$o.lang.diagram.state, value: 'state' },
        { label: this.$o.lang.diagram.gantt, value: 'gantt' }
      ]
    }
  },
  mounted () {
    this.initDiagram()
  }
}
</script>

<style lang="stylus">
  .o-diagram {
    position relative
    cursor crosshair

    .diagram {
      width 100%

      .source {
        position relative
        min-height 400px
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
    }

    &.selected .o-card-content {
      outline-style dashed
      outline-width 1px
      -moz-outline-radius 4px
      outline-color rgba(0, 0, 0, 0.1)
    }
  }

  .o-diagram.full-screen {
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background white
    z-index 3000

    .o-toolbar {
      position relative
      top 0
      margin 0
      visibility visible
    }

    .diagram {
      height calc(100vh - 40px)
    }

    .preview {
      position relative
      width 50%
      height 100%

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
