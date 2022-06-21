import { createApp } from 'vue'
import App from './App.vue'
import emitter from "./plugins/emitter";


const s1 = document.createElement('div');
s1.id = 's1';
document.body.appendChild(s1);
window.sfTest = 123
const app = createApp(App)
app.use(emitter);
app.mount('#s1')

// dialog组件
// el-form组件 el-form-item
//  input 
//  select 
//  input-axe
// 上传文件

//  function() {
//     createApp(App).mount('#s1')
// }

