<template>
  <div class="fb-input-wrapper">
    <input
      class="fb-input__inner"
      :type="type"
      :maxlength="max"
      :disabled="disabled"
      v-bind="$attrs"
      :value="value"
      :placeholder="placeholder"
      @blur="onBlur"
      @change="onChange"
      @input="onInput"
    />
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  name: "FbInput",
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
    type: {
      type: String,
      default: () => {
        return "text";
      },
    },
    max: {
      type: String || Number,
      default: () => {
        return "";
      },
    },
    placeholder: {
      type: String,
      default: () => {
        return "";
      },
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    clear: {
      type: String,
      default: () => {
        return undefined;
      },
    },
  },
  emits: ["update:value", "input", "change", "blur", "focus", "keydown"],
  setup(props, { emit }) {
    // const val = ref("");

    // input事件
    const onInput = (event) => {
      emit("update:value", event.target.value);
      emit("input", event.target.value);
    };
    // change事件
    const onChange = (event) => {
      emit("change", event.target.value);
    };
    // 失去焦点
    const onBlur = (event) => {
      emit("blur", event);
    };
    // focus事件
    // const onFocus = (event) => {
    //   emit("focus", event);
    // };
    const onClear = () => {
      emit("update:value", "");
      emit("change", "");
      focus();
    };
    return {
      //   val,
      onBlur,
      onChange,
      onInput,
      //   onFocus,
      onClear,
    };
  },
};
</script>
<style scoped>
.fb-input-wrapper {
    font-size: 14px;
    display: inline-flex;
    vertical-align: middle;
    align-items: center;
    flex: 1 1 0%;
    user-select: none;
    margin: 4px;
    height: 32px;
    position: relative;
    width: 100%;
}
.fb-input-wrapper .fb-input__inner:focus {
    border-color: #1863FB;
}
.fb-input-wrapper input.fb-input__inner {
  flex-grow: 1;
  font-family: inherit;
  font-weight: 400;
  border-radius: 2px;
  font-size: inherit;
  padding: 0px 10px;
  background-color: transparent;
  outline: 0;
  height: inherit;
  width: 100%;
  min-width: 0;
  color: #000;
  border: 1px solid #DEDEDE;
  transition: border 0.2s ease 0s, color 0.2s ease 0s;
}
</style>