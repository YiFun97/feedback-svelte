<template>
  <div>
    <fb-input v-model="sb" :placeholder="'请输入'"></fb-input>
    {{ sb }}
    {{sv}}
    <Select
      v-model="sv"
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
    <!-- <el-select v-model="value" filterable placeholder="Select">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select> -->
  </div>
</template>
<script>
import { ref } from "vue";
import fbInput from "./input.vue";
import Select from "./select.vue";
export default {
  name: "fbDialog",
  components: { fbInput, Select },
  setup(props, { emit }) {
    const sb = ref("");
    const sv = ref("");
    return { sb,sv };
  },
};
</script>
<style scoped>
</style>