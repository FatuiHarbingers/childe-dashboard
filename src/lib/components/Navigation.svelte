<script lang="ts">
    import { trpc } from '$lib/trpc/client';
    import { page } from '$app/stores';
    import Button from './ui/Button.svelte';
    import { onMount } from 'svelte';

	let user: ReturnType<ReturnType<typeof trpc>[ 'users' ][ 'me' ][ 'query' ]>
	onMount( () => {
		user = trpc($page).users.me.query()
	} )
</script>

<div class="navigation">
	<img src="/logo.png" alt="logo" width="50">
	<h1> Ajax </h1>
	<ul class="navigation__links">
		<li> <a href="/"> Home </a> </li>
		<li> <a href="/about"> About </a> </li>
		<li> <a href="/features"> Features </a> </li>
	</ul>
	<div class="navigation__filler"></div>
	<!-- svelte-ignore empty-block -->
	{ #await user }
	{ :then user }
		{ #if user }
			<div class="navigation__user">
				<img src="https://cdn.discordapp.com/avatars/{ user.id }/{ user.avatar }.png?size=48" alt="avatar">
				<span> { user.username } </span>
				<Button content="Dashboard" href="/dashboard" />
				<Button content="Log out" href="/logout" type="secondary" />
			</div>
		{ :else }
			<Button content="Log in" href="/oauth2/authorize" />
		{ /if }
	{ /await }
</div>

<style>
.navigation {
	align-items: center;
	background-color: #0e1018;
	box-shadow: 0 0 5px #555;
	display: flex;
	padding: 0 2em;
}
.navigation h1 {
	margin: 0.35em 1em 0.35em 0;
}
.navigation__filler {
	flex-grow: 1;
}
.navigation__links {
	align-items: center;
	column-gap: 1em;
	display: flex;
	font-size: 1.15em;
	list-style: none;
	margin: 0.5em 0;
	padding: 0;
}
.navigation__links a {
	color: #b0b0b0;
	text-decoration: none;
}
.navigation__links a:hover {
	color: #888888;
	text-decoration: underline;
}
.navigation__user {
	align-items: center;
	column-gap: 1em;
	display: flex;
	justify-self: end;
}
.navigation__user img {
	border-radius: 5px;
	height: 32px;
	width: 32px;
}

@media screen and ( max-width: 840px ) {
	.navigation {
		flex-wrap: wrap;
	}
	.navigation__links {
		flex-basis: 100%;
		justify-content: space-evenly;
		order: 4;
	}
}
</style>