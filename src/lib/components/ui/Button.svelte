<script lang="ts">
	export let content: string
	export let href: string | null = null
	export let type: 'primary' | 'secondary' | 'success' = 'primary'
</script>

<svelte:element
	this={ href ? 'a' : 'button' }
	class="btn btn--{ type }"
	href={ href }> { content } </svelte:element>

<style>
	.btn {
		background-color: transparent;
		border: 1px solid #000;
		border-radius: 5px;
		color: #fff;
		font-weight: bold;
		padding: 0.45em 1.25em;
		text-decoration: none;
	}
	.btn--primary {
		background-color: #884ddb;
	}
	.btn--secondary {
		background-color: transparent;
		border-color: #884ddb;
		color: #884ddb;
	}
</style>