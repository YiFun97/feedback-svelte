<template>
  <div class="fb-dialog">
    {{ formData }}
    <Form ref="formRef" :model="formData" :rules="rules">
      <FormItem label="名称" prop="name">
        <fb-input v-model="formData.name" :placeholder="'请输入'"></fb-input>
      </FormItem>
      <FormItem label="年龄年龄年龄年龄" prop="age" required>
        <fb-input v-model="formData.age" :placeholder="'请输入'"></fb-input>
      </FormItem>
      <FormItem label="类型" prop="type">
        <Select
          v-model="formData.type"
          :filterable="true"
          :options="[
            { label: '86', value: 86 },
            { label: '186', value: 186 },
            { label: '286', value: 386 },
            { label: '286', value: 386 },
            { label: '286', value: 486 },
            { label: '286', value: 586 },
            { label: '286', value: 686 },
            { label: '286', value: 786 },
            { label: '286', value: 886 },
            { label: '286', value: 326 },
            { label: '286', value: 336 },
            { label: '286', value: 316 },
            { label: '286', value: 306 },
          ]"
        ></Select>
      </FormItem>
    </Form>
    <footer class="dialog__footer">
      <button class="fb-button" @click="submitHandle">提交</button>
    </footer>
  </div>
</template>
<script>
import { reactive, ref } from "vue";
import Form from "./form.vue";
import FormItem from "./form-item.vue";
import fbInput from "./input.vue";
import Select from "./select.vue";
export default {
  name: "fbDialog",
  components: { fbInput, Select, Form, FormItem },
  setup(props, { emit }) {
    const formData = reactive({
      name: "",
      age: "",
      type: "",
    });
    const formRef = ref(null);
    const rules = {
      name: [{ required: "true", message: "请输入名称" }],
      age: [{ required: "true", message: "请输入年龄" }],
      type: [{ required: "true", message: "请选择" }],

    };
    const submitHandle = () => {
      console.log("asd");
      formRef.value.validate((valid) => {
        console.log("valid", valid);
      });
    };
    return { formData, rules, submitHandle, formRef };
  },
};
</script>
<style scoped>
.fb-dialog {
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translate(-50%);
  min-width: 350px;
  padding: 20px;
  border: 1px solid red;
}
.dialog__footer {
  text-align: right;
}
.fb-button {
  width: 60px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  height: 32px;
  white-space: nowrap;
  cursor: pointer;
  color: #fff;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  transition: 0.1s;
  font-weight: 400;
  user-select: none;
  vertical-align: middle;
  -webkit-appearance: none;
  background-color: #1863fb;
  border: none;
  /* border-color: var(--el-button-border-color); */
  padding: 8px 15px;
  font-size: 12px;
  border-radius: 2px;
}
.fb-button:hover {
  background-color: #4682fb;
}
</style>