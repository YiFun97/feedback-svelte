import App from './App.svelte';
const includeCss = function(url) {
	var link = document.createElement("link");
	link.rel = "stylesheet";
	link.type = "text/css";
	link.href = url;
	document.getElementsByTagName("head")[0].appendChild(link)
};
const sb = () => {
	const app = new App({
		target: document.body,
		props: {
			name: 'world'
		}
	});
}
// window.__ibufeedback = sb
sb()
// const app = new App({
// 	target: document.body,
// 	props: {
// 		name: 'world'
// 	}
// });

export default App;