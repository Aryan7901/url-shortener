<script setup lang="ts">
import { useUrlStore } from "@/stores/url";
const urlState = useUrlStore();
</script>
<template>
  <div class="bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden">
    <TransitionGroup name="table" tag="table" v-if="urlState.urls.length > 0" class="w-full">
      <thead class="bg-slate-800/80 text-left" key="header">
        <tr>
          <th class="px-6 py-4 text-sm font-semibold text-slate-300">Original URL</th>
          <th class="px-6 py-4 text-sm font-semibold text-slate-300">Shortened URL</th>
          <th class="px-6 py-4 text-sm font-semibold text-slate-300 text-right">Actions</th>
        </tr>
      </thead>
      <tbody key="body">
        <tr
          v-for="(url, index) in urlState.urls"
          :key="url.shortUrl"
          class="border-t border-slate-700/50 hover:bg-slate-700/30 transition-colors duration-200 group"
          :class="index % 2 == 0 ? '' : 'bg-slate-800/30'"
        >
          <td class="px-6 py-4">
            <p class="text-xs text-purple-400 mb-1">Original</p>
            <a
              class="text-sm text-slate-300 hover:text-purple-400 transition-colors duration-200 line-clamp-2"
              :href="url.longUrl"
              target="_blank"
              :title="url.longUrl"
            >
              {{ url.longUrl }}
            </a>
          </td>
          <td class="px-6 py-4">
            <p class="text-xs text-pink-400 mb-1">Shortened</p>
            <a
              class="text-sm text-purple-300 hover:text-purple-400 transition-colors duration-200 line-clamp-1"
              :href="url.shortUrl"
              target="_blank"
              :title="url.shortUrl"
            >
              {{ url.shortUrl }}
            </a>
          </td>
          <td class="px-6 py-4 text-right">
            <button
              class="px-3 py-1.5 text-sm text-red-400 rounded-lg hover:text-white hover:bg-red-500/20 transition-all duration-200 opacity-60 group-hover:opacity-100"
              @click="urlState.removeUrl(url.shortUrl)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </TransitionGroup>
    
    <div v-if="urlState.urls.length === 0" class="p-12 text-center animate-fade-in">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mx-auto text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
      <p class="text-slate-400 text-lg">No URLs yet</p>
      <p class="text-slate-500 text-sm mt-1">Shorten your first URL to get started</p>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 0.4s ease-out forwards;
}
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.table-enter-active {
  animation: fade-in 0.3s ease-out forwards;
}
.table-leave-active {
  animation: fade-out 0.2s ease-in forwards;
}
.table-move {
  transition: transform 0.3s ease;
}

@keyframes fade-out {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-20px);
  }
}
</style>
