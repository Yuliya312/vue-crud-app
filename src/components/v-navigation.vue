<template>
  <nav class="nav blue lighten-2">
    <div class="nav-wrapper">
      <ul id="nav-mobile" class="left show-on-med-and-down">
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/user">Add&nbsp;user</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>



<script>

export default {
  name: 'vNavigation',
}
</script>

<style>
  .nav {
    padding: 0 20px;
  }
</style>
