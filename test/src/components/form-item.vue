<template>
  <div class="fb-form-item" :class="{ isRequired: required, isError: isError }">
    <label :for="labelFor" class="fb-form-item__label">
      {{ label }}
    </label>
    <div class="fb-form-item__content">
      <slot></slot>
      <div class="fb-form-item__error">{{ error }}</div>
    </div>
  </div>
</template>
<script>
import Schema from "async-validator";
import mitt from "mitt";
import {
  reactive,
  onMounted,
  ref,
  toRefs,
  provide,
  inject,
  getCurrentInstance,
  computed,
} from "vue";
export default {
  props: {
    label: {
      type: String,
    },
    prop: {
      type: String,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { proxy } = getCurrentInstance();
    const emitter = mitt();
    let error = ref("");
    const isError = computed(() => !!error.value);
    // 接受父组件传递的`formItemEmitter`、`prop`、`model`、`rules`属性和方法
    const fbForm = inject("fbForm");
    // 获取rules
    const getRules = () => {
      return fbForm.rules[props.prop] || [];
    };
    // 根据trigger类型，获得对应的rules
    const getFilteredRule = (trigger) => {
      const rules = getRules();
      return (
        rules
          .filter((rule) => {
            // 如果rule没有设置trigger或者trigger设置为''
            if (!rule.trigger || trigger === "") return true;
            if (Array.isArray(rule.trigger)) {
              // rule中的trigger是数组时，判断过滤的trigger在数组中
              return rule.trigger.indexOf(trigger) > -1;
            } else {
              // 否则 rule.trigger与过滤的trigger相同
              return rule.trigger === trigger;
            }
          })
          // 展开，重新组装，是为了浅拷贝吗？
          .map((rule) => ({ ...rule }))
      );
    };
    const validate = (trigger, callback = () => {}) => {
      // 当前表单项校验
      // 获取校验规则和当前数据
      if (!props.prop) return;
      const rules = getFilteredRule(trigger);
      if (!rules || rules.length === 0) {
        callback();
        return;
      }
      if (rules && rules.length > 0) {
        rules.forEach((rule) => {
          delete rule.trigger;
        });
      }
      const value = fbForm.model[props.prop];
      const validator = new Schema({ [props.prop]: rules });
      // 返回promise，全局可以统一处理
      return validator.validate({ [props.prop]: value }, (errors) => {
        // errors存在则校验失败
        console.log("err", errors);
        if (errors) {
          error.value = errors[0].message;
        } else {
          // 校验通过
          error.value = "";
        }
      });
    };
    const onFieldBlur = () => {
      validate("blur");
    };
    const onFieldChange = () => {
      validate("change");
    };
    // 添加validate事件监听
    const addValidateEvents = () => {
      const rules = getRules();
      // 如果form-item存在rules
      if (rules.length) {
        // 使用Mitt事件总线，监听el.form.blur el.form.change事件
        emitter.on("fb.form.blur", onFieldBlur);
        emitter.on("fb.form.change", onFieldChange);
      }
    };
    // 定义响应式的表单项对象，将props、校验方法、事件总线通过`provide`传递给子孙后代组件，如`fb-input`、`ti-select`等具体的UI控件
    const fbFormItem = reactive({
      ...toRefs(props),
      validate,
      formItemEmitter: emitter,
    });
    provide("fbFormItem", fbFormItem);
    onMounted(() => {
      // 注册validate事件， 用于UI控件触发校验, 如fb-input控件
      // proxy.$sub("fb.form.item.validate", validate);
      addValidateEvents();
      // 通过父组件的事件总线，将表单项校验方法传递给父组件
      if (props.prop) {
        fbForm;
        proxy.$pub("fb.form.addField", fbFormItem);
        // fbForm.formEmitter.emit("fb.form.addField", fbFormItem);
      }
    });
    const labelFor = computed(() => props.for || props.prop);
    return { error, validate, labelFor, isError };
  },
};
</script>
<style scoped>
.fb-form-item {
  margin-bottom: 18px;
  display: flex;
}
.fb-form-item__label {
  height: 32px;
  line-height: 32px;
  display: inline-flex;
  justify-content: flex-end;
  font-size: 14px;
  color: #333333;
  padding: 0 12px 0 0;
}
.fb-form-item.isRequired > .fb-form-item__label::before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
.fb-form-item.isError :deep(.fb-input-wrapper input.fb-input__inner) {
  border: 1px solid #f56c6c;
}
.fb-form-item__content {
  position: relative;
  flex: 1;
}
.fb-form-item__error {
  position: absolute;
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 2px;
  top: 100%;
  left: 0;
}
</style>