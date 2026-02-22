<script setup lang="ts">
import UrlTable from "@/components/UrlTable.vue";
</script>
<template>
  <div class="min-h-screen px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-8 animate-fade-in-down">
        <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-500/20 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        </div>
        <h1 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          All Your Shortened Links
        </h1>
        <p class="text-slate-400 mt-2 text-sm">Manage and track all your shortened URLs</p>
      </div>
      <UrlTable />
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-down {
  animation: fade-in-down 0.4s ease-out forwards;
}
</style>
