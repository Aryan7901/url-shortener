<script setup lang="ts">
import { useUrlStore } from "@/stores/url";
import { ref } from "vue";
const url = ref("");
const shortUrl = ref("");
const errorText = ref("");
const urlState = useUrlStore();
async function submit(url: string) {
  try {
    url = url.trim();
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/url`, {
      method: "POST",
      body: JSON.stringify({
        url,
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
    //console.log(data);
    shortUrl.value = data.shortUrl;
    urlState.addUrl(url, shortUrl.value);
    errorText.value = "";
  } catch (error: any) {
    console.log(error);
    errorText.value = error?.message;
  }
}
</script>
<template>
  <div
    class="flex flex-col items-center w-11/12 gap-2 p-8 m-auto mt-20 text-white rounded-2xl bg-slate-900 md:w-3/5 min-h-96"
  >
    <h1 class="m-6 text-4xl font-semibold text-purple-500">
      Shorten Your Link!
    </h1>
    <form
      @submit.prevent="submit(url)"
      class="flex flex-col items-center gap-2"
    >
      <label for="url" class="m-6 text-2xl font-semibold"
        >Enter Url to Shorten</label
      >
      <input
        type="url"
        class="p-2 m-2 rounded-lg bg-slate-900 opacity-80 sm:w-80 ring-2 ring-purple-500 focus:outline-none text-slate-200"
        v-model="url"
        required
      />
      <button
        type="submit"
        class="p-2 text-purple-400 rounded-lg outline-none hover:text-white hover:bg-purple-700"
      >
        Shorten Url
      </button>
    </form>
    <p v-show="shortUrl" class="text-purple-300">Shortened URL:</p>
    <a :href="shortUrl" target="_blank" class="hover:text-purple-500">{{
      shortUrl
    }}</a>
    <p v-if="errorText" class="text-red-500">{{ errorText }}</p>
  </div>
</template>
