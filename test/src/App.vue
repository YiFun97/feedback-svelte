<template>
  <div>
    <fb-dialog></fb-dialog>
  </div>
</template>
<script>
import fbDialog from "./components/fb-dialog.vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "App",
  components: { fbDialog },
  setup(props) {
    const a = ref("")
    return {a}
  }
});
</script>


<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
