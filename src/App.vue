<script setup lang="ts">
import { RouterView, RouterLink } from "vue-router";
import "./index.css";
</script>

<template>
  <nav
    class="fixed top-0 z-50 w-full backdrop-blur-md bg-slate-900/80 border-b border-slate-700/50"
  >
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-center gap-8">
      <RouterLink 
        to="/" 
        class="text-base font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-pink-300 transition-all duration-200 router-link-active:text-purple-400 router-link-active:bg-none"
      >
        Shortener
      </RouterLink>
      <RouterLink 
        to="/all-urls" 
        class="text-base font-semibold text-slate-300 hover:text-purple-400 transition-colors duration-200 router-link-active:text-purple-400"
      >
        All URLs
      </RouterLink>
    </div>
  </nav>

  <RouterView class="pt-16" />
</template>

<style>
.router-link-active {
  color: #a78bfa !important;
}
</style>
