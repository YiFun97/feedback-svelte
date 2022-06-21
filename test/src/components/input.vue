<template>
  <div class="fb-input-wrapper">
    <input
      class="fb-input__inner"
      :type="type"
      :maxlength="max"
      :disabled="disabled"
      v-bind="$attrs"
      :value="modelValue"
      :placeholder="placeholder"
      @blur="onBlur"
      @change="onChange"
      @input="onInput"
      @focus="onFocus"
    />
  </div>
</template>
<script>
import { getCurrentInstance,inject } from "vue";
export default {
  name: "FbInput",
  props: {
    modelValue: {
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
  emits: ["update:modelValue", "input", "change", "blur", "focus", "keydown"],
  setup(props, { emit }) {
    // const val = ref("");
    const { proxy } = getCurrentInstance();
    const fbFormItem = inject("fbFormItem");
    // input事件
    const onInput = (event) => {
      emit("update:modelValue", event.target.value);
      emit("input", event.target.value);
    };
    // change事件
    const onChange = (event) => {
      console.log('123', event)
      emit("change", event.target.value);
      fbFormItem.formItemEmitter.emit('fb.form.change')
      // proxy.$pub("fb.form.change");
    };
    // 失去焦点
    const onBlur = (event) => {
      emit("blur", event);
      fbFormItem.formItemEmitter.emit('fb.form.blur')
      // proxy.$pub("fb.form.blur");
    };
    // focus事件
    const onFocus = (event) => {
      emit("focus", event);
    };
    const onClear = () => {
      emit("update:value", "");
      emit("change", "");
      focus();
    };
    return {
      onBlur,
      onChange,
      onInput,
      onFocus,
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
  /* margin: 4px; */
  height: 32px;
  position: relative;
  width: 100%;
}
.fb-input-wrapper .fb-input__inner:focus {
  border-color: #1863fb;
}
.fb-input-wrapper input.fb-input__inner {
  flex-grow: 1;
  font-family: inherit;
  font-weight: 400;
  border-radius: 2px;
  font-size: inherit;
  padding: 0px 10px;
  background-color: #fff;
  outline: 0;
  height: inherit;
  width: 100%;
  min-width: 0;
  color: #000;
  border: 1px solid #dedede;
  transition: border 0.2s ease 0s, color 0.2s ease 0s;
}
</style>