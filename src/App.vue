<template>
  <NavBar />
  <router-view :key="$route.fullPath"/> 
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';  // 通过完全路径来判重
import 'bootstrap/dist/js/bootstrap';
import NavBar from './components/navbar';

export default {
  name: "App",
  components: {
    NavBar: NavBar
  }
}
</script>

<style>
</style>
