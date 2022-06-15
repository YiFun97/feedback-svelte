<script>
	import Feedback from "./views/feedback-form.svelte";
	let dialogShow = false;

	function handleClick() {
		dialogShow = true;
	}
	function handleClose() {
		dialogShow = false;
	}
</script>

<button on:click={handleClick} class="feedback-btn">点击</button>

<Feedback {dialogShow} on:close={handleClose} />

<style>
	:root {
		--be-primary: #1863FB !important; 
	}

	.feedback-btn {
		position: fixed;
		right: -30px;
		top: 50%;
		width: 40px;
		height: 40px;
		cursor: pointer;
		transition: 0.3s;
		
	}
	.feedback-btn:hover {
		transform: translateX(-23px);
		transition: 0.3s;
	}
</style>
