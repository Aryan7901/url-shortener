<script setup lang="ts">
import { useUrlStore } from "@/stores/url";
import { ref } from "vue";
const url = ref("");
const shortUrl = ref("");
const errorText = ref("");
const isLoading = ref(false);
const urlState = useUrlStore();
const copied = ref(false);

async function submit(inputUrl: string) {
  try {
    isLoading.value = true;
    errorText.value = "";
    shortUrl.value = "";
    inputUrl = inputUrl.trim();
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/url`, {
      method: "POST",
      body: JSON.stringify({
        url: inputUrl,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
    const data = await response.json();
    shortUrl.value = data.shortUrl;
    urlState.addUrl(inputUrl, shortUrl.value);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    errorText.value = error?.message;
  } finally {
    isLoading.value = false;
  }
}

function copyToClipboard() {
  if (shortUrl.value) {
    navigator.clipboard.writeText(shortUrl.value);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  }
}
</script>
<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div
      class="w-full max-w-lg bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-700/50 animate-scale-in"
    >
      <div class="text-center mb-10">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-500/20 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </div>
        <h1 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Shorten Your Link!
        </h1>
        <p class="text-slate-400 mt-2 text-sm">Transform long URLs into short, shareable links</p>
      </div>
      
      <form @submit.prevent="submit(url)" class="space-y-6">
        <div class="space-y-2">
          <label for="url" class="block text-sm font-medium text-slate-300 ml-1">
            Enter URL to Shorten
          </label>
          <div class="relative">
            <input
              type="url"
              id="url"
              v-model="url"
              placeholder="https://example.com/very-long-url"
              required
              class="w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200 focus:scale-[1.01]"
            />
            <div class="absolute right-3 top-1/2 -translate-y-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
          </div>
        </div>
        
        <button
          type="submit"
          :disabled="isLoading || !url.trim()"
          class="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          <span v-if="isLoading" class="flex items-center gap-2">
            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Shortening...
          </span>
          <span v-else class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            Shorten URL
          </span>
        </button>
      </form>

      <div v-if="shortUrl" class="mt-8 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 animate-fade-in">
        <p class="text-sm text-slate-400 mb-2">Your shortened URL:</p>
        <div class="flex items-center gap-2">
          <a 
            :href="shortUrl" 
            target="_blank" 
            class="flex-1 text-purple-400 hover:text-purple-300 truncate transition-colors duration-200"
          >
            {{ shortUrl }}
          </a>
          <button
            @click="copyToClipboard"
            class="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors duration-200 group"
            :title="copied ? 'Copied!' : 'Copy to clipboard'"
          >
            <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-slate-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </div>
      
      <p v-if="errorText" class="mt-4 text-center text-red-400 text-sm bg-red-500/10 py-2 px-4 rounded-lg">
        {{ errorText }}
      </p>
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
@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}
.animate-scale-in {
  animation: scale-in 0.4s ease-out forwards;
}
</style>
