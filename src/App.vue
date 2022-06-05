<script setup lang="ts">
import { RouterView, RouterLink } from "vue-router";
import "./index.css";
</script>

<template>
  <nav
    class="fixed top-0 z-10 flex flex-wrap items-center justify-center w-screen gap-10 px-2 py-3 text-lg font-semibold text-white bg-black"
  >
    <RouterLink to="/" class="hover:text-purple-500">Shortener</RouterLink>
    <RouterLink to="/all-urls" class="hover:text-purple-500"
      >All urls</RouterLink
    >
  </nav>

  <RouterView />
</template>
