<template>
  <div class="fb-select-wrapper" ref="selectRef">
    <div class="fb-select" @click.stop="showOptions = !showOptions">
      <template v-if="filterable">
        <fb-input
          :placeholder="hasValue ? '' : placeholder"
          v-model="searchInput"
          @blur="blurHandle"
          @focus="focusHandle"
        ></fb-input>
        <div
          v-if="hasValue && searchInput === ''"
          class="fb-select-filterable-value"
          :class="{'focus': searchInputFocus}"
          @click="focusSearchInput"
        >
          {{ singleValue }}
        </div>
      </template>
      <template v-else>
        <fb-input
          :placeholder="placeholder"
          v-model="singleValue"
          disabled
        ></fb-input>
      </template>
      <span class="icon-arrow" :class="{ 'arrow-180': showOptions }"></span>
    </div>
    <div class="fb-option" v-show="showOptions">
      <ul>
        <li
          v-for="(item, index) in filterOptions"
          :key="index"
          class="fb-select-item"
          @click="chooseOption(item.value)"
        >
          {{ item.label }}
        </li>
        <li v-if="filterOptions.length == 0">未搜索到相关数据</li>
      </ul>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, onUnmounted, computed } from "vue";
import fbInput from "./input.vue";
export default {
  name: "FbSelect",
  components: { fbInput },
  props: {
    placeholder: {
      type: String,
      default: "",
    },
    filterable: {
      type: Boolean,
      required: false,
    },
    options: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      required: true,
    },
  },
  //   emits: [],
  setup(props, { emit }) {
    let singleValue = ref("");

    let showOptions = ref(false);
    const closeOption = () => {
      showOptions.value = false;
    };

    const chooseOption = (value) => {
      singleValue.value = value;
      emit("update:modelValue", value);
      closeOption();
    };
    // searchInput为 filter时 输入的值
    let searchInput = ref("");
    let filterOptions = computed(() => {
      // console.log('searchInput',searchInput)
      if (searchInput.value) {
        // if (this.dropdown) this.dropdown.update();
        let searchValue = String(searchInput.value).toLowerCase();
        return props.options.filter((item) => {
          return item.label.toLowerCase().indexOf(searchValue) != -1;
        });
      }
      return props.options;
    });
    // 是否选中了值
    let hasValue = computed(() => {
      if (
        singleValue === "" ||
        singleValue === undefined ||
        singleValue === null
      ) {
        return false;
      } else {
        return true;
      }
    });

    let searchInputFocus = ref(false);
    const blurHandle = () => {
      searchInputFocus.value = false;
      setTimeout(() => {
        searchInput.value = "";
      }, 100);
    };

    const focusHandle = () => {
      searchInputFocus.value = true;
    };
    // 选择框的显示隐藏
    const selectRef = ref(null);
    const handleClick = (e) => {
      if (selectRef.value) {
        if (
          //contains判断节点是否包含节点
          !selectRef.value.contains(e.target) &&
          showOptions.value
        ) {
          showOptions.value = false;
        }
      }
    };
    onMounted(() => {
      //注册全局的点击事件
      document.addEventListener("click", handleClick);
    });
    onUnmounted(() => {
      //解绑
      document.removeEventListener("click", handleClick);
    });
    return {
      singleValue,
      showOptions,
      closeOption,
      selectRef,
      chooseOption,
      searchInput,
      hasValue,
      filterOptions,
      blurHandle,
      focusHandle,
      searchInputFocus,
    };
  },
};
</script>
<style scoped>
.ul,
ol,
li {
  list-style: none;
}
ul {
  margin: 0;
  padding: 0;
}
.icon-arrow {
  position: absolute;
  right: 0px;
  top: 35%;
  background-image: url("./arrow-down.svg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 1em;
  width: 1em;
  color: #a8abb2;
  transition: 0.2s;
}
.icon-arrow.arrow-180 {
  transition: 0.2s;
  transform: rotate(180deg);
}
.fb-select-wrapper {
  position: relative;
  cursor: pointer;
}
.fb-select-wrapper .fb-input__inner {
  cursor: pointer;
}
.fb-select:hover {
  border-color: #6ac79d;
}
.fb-select {
  position: relative;
}
.fb-select-filterable-value.focus {
  color: #c1c1c1;
}
.fb-select-filterable-value {
  font-size: 14px;
  position: absolute;
  line-height: 32px;
  top: 4px;
  left: 16px;
  z-index: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.fb-option {
  position: absolute;
  left: 0;
  right: 0;
  top: 90%;
  margin: 4px;
  padding: 10px 0;
  overflow: auto;
  background: #ffffff;
  box-shadow: 0px 2px 10px rgba(66, 70, 86, 0.15);
  border-radius: 2px;
  max-height: 274px;
}
.fb-option li {
  padding: 0 20px 0 20px;
  cursor: pointer;
  text-overflow: ellipsis;
  color: #606266;
  height: 34px;
  line-height: 34px;
  font-size: 14px;
}
.fb-option .fb-select-item:hover {
  background-color: #f5f7fa;
}
.fb-select:hover :deep(.fb-input__inner) {
border-color: #1863fb;
}
</style>