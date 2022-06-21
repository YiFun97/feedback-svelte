<template>
  <div class="ti-form-item">
    <label for="">
      {{ label }}
    </label>
    <slot></slot>
    <p class="errors">
      {{ error }}
    </p>
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
} from "vue";
export default {
  props: {
    label: {
      type: String,
    },
    prop: {
      type: String,
    },
  },
  setup(props) {
    const { proxy } = getCurrentInstance();
    const emitter = mitt();
    let error = ref();
    // 接受父组件传递的`formItemEmitter`、`prop`、`model`、`rules`属性和方法
    const tiForm = inject("tiForm");
    // 获取rules
    const getRules = () => {
      return tiForm.rules[props.prop] || [];
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
      const value = tiForm.model[props.prop];
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
      console.log('112344444')
      validate("change");
    };
    // 添加validate事件监听
    const addValidateEvents = () => {
      const rules = getRules();
      // 如果form-item存在rules
      // props.required !== undefined 没有必要吧，因为props.required有值时，rules一定是有元素的啊
      if (rules.length) {
        // 使用Mitt事件总线，监听el.form.blur el.form.change事件
        proxy.$sub("ti.form.blur", onFieldBlur);
        proxy.$sub("ti.form.change", onFieldChange);
      }
    };
    // 定义响应式的表单项对象，将props、校验方法、事件总线通过`provide`传递给子孙后代组件，如`ti-input`、`ti-select`等具体的UI控件
    const tiFormItem = reactive({
      ...toRefs(props),
      validate,
      formItemEmitter: emitter,
    });
    provide("tiFormItem", tiFormItem);
    onMounted(() => {
      // 注册validate事件， 用于UI控件触发校验, 如ti-input控件
      // proxy.$sub("ti.form.item.validate", validate);
      addValidateEvents();
      // 通过父组件的事件总线，将表单项校验方法传递给父组件
      if (props.prop) {
        tiForm;
        proxy.$pub("ti.form.addField", tiFormItem);
        // tiForm.formEmitter.emit("ti.form.addField", tiFormItem);
      }
    });
    return { error, validate };
  },
};
</script>
<style scoped>
.errors {
  color: red;
  font-size: 12px;
}
</style>