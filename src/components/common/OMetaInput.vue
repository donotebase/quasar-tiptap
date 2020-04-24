<template>
  <section class="o-meta-input">
    <div class="title">{{title}}</div>
    <div class="fields">
      <q-input v-model="value" ref="input" standout="bg-blue" clearable flat
               :autofocus="true"
               @keyup.enter.native="onConfirm" :placeholder="$o.lang.label.linkAddress">
        <template v-slot:prepend>
          <q-icon :name="icon" />
        </template>
      </q-input>
    </div>
    <div class="actions row justify-between">
      <q-btn class="bg-grey-3" @click="$emit('secondAction')" flat v-close-popup>
        {{$o.lang.label.cancel}}
      </q-btn>
      <q-btn class="bg-blue text-white" @click="onConfirm" flat v-close-popup>
        {{$o.lang.label.ok}}
      </q-btn>
    </div>
  </section>
</template>

<script>
export default {
  name: 'o-meta-input',
  data () {
    return {
      value: ''
    }
  },
  props: {
    val: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '超链接'
    },
    type: {
      type: String,
      default: 'link'
    },
    icon: {
      type: String,
      default: 'link'
    },
    secondIcon: {
      type: String,
      default: ''
    },
    secondLabel: {
      type: String,
      default: ''
    }
  },
  methods: {
    onConfirm () {
      this.$emit('primaryAction', this.value)
      this.value = ''
    }
  },
  watch: {
    val (to, from) {
      this.value = to
    }
  },
  mounted () {
    this.value = this.val
  }
}
</script>

<style lang="stylus">
  .o-meta-input {
    min-width 500px
    padding 15px
    .title {
      font-size 1.2rem
      margin-bottom 10px
    }
    .fields {
      padding 10px 0

      .q-field--focused, .q-field--float {
        .q-field__control {
          box-shadow unset !important
        }
      }

      .hint {
        font-size 0.8rem
      }
    }
    .actions {
      /*border-top solid 1px #ccc*/
      padding-top 10px

      .q-btn {
        min-width 100px
      }
    }
  }
</style>
