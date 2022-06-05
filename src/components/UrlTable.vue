<script setup lang="ts">
import { useUrlStore } from "@/stores/url";
const urlState = useUrlStore();
</script>
<template>
  <table class="my-10 origin-top scale-50 2xs:scale-75 xs:scale-100 lg:w-10/12">
    <thead class="text-2xl text-white">
      <tr>
        <th class="font-normal">Your Urls</th>
        <th class="font-normal">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(url, index) in urlState.urls"
        :key="url.shortUrl"
        class="h-16 text-slate-300"
        :class="index % 2 == 0 ? '' : 'bg-slate-900'"
      >
        <td class="flex flex-col p-2">
          <h2 class="text-purple-200">Original:</h2>
          <a
            class="m-4 break-words hover:text-purple-500"
            :href="url.longUrl"
            target="_blank"
            >{{ url.longUrl }}</a
          >
          <h2 class="text-purple-300">Shortened:</h2>
          <a
            class="m-4 break-words hover:text-purple-500"
            :href="url.shortUrl"
            target="_blank"
            >{{ url.shortUrl }}</a
          >
        </td>

        <td>
          <button
            class="p-2 text-red-500 rounded-lg outline-none hover:text-white hover:bg-red-500"
            @click="urlState.removeUrl(url.shortUrl)"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
