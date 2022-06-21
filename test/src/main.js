import { createApp } from 'vue'
import App from './App.vue'
const s1 = document.createElement('div');
s1.id = 's1';
document.body.appendChild(s1);
window.sfTest = 123
createApp(App).mount('#s1')

//  function() {
//     createApp(App).mount('#s1')
// }

