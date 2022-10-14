<template>
  <div class="big-button">
    <button
      class="button"
      @click="OnClick()"
      :disabled="_disabled"
      v-bind:class="[type,disable]"
    >{{text}}</button>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "button"
    },
    _disabled: {
      type: Boolean,
      default() {
        return false
      }
    },
    type: {
      type: String,
      default: "danger"
    }
  },
  methods: {
    OnClick() {
      this.$emit('click', "");
    }
  },
  computed: {
    disable() {
      return this._disabled ? 'disabled' : 'enabled'
    }
  }
}
</script>

<style lang="scss" scoped>
.big-button {
  .button {
    font-size: 50px;
    padding: 10px;
    border-radius: 20px;
    margin: 3px;
    color: white;
    border-color: white;
  }

  .info {
    background-color: rgb(64, 158, 255);
  }
  .danger {
    background-color: rgb(245, 108, 108);
  }
  .disabled {
    opacity: 0.5;
  }
}
</style>