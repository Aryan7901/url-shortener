import { defineStore } from "pinia";
import type urlInterface from "./url-type";
export const useUrlStore = defineStore({
  id: "urls",
  state: () => ({
    urls: [] as Array<urlInterface>,
  }),
  getters: {},
  actions: {
    addUrl(longUrl: string, shortUrl: string) {
      if (!this.urls.some((url) => url.shortUrl === shortUrl))
        this.urls.push({ longUrl, shortUrl });
    },
    removeUrl(shortUrl: string) {
      const filteredUrls = this.urls.filter((url) => url.shortUrl !== shortUrl);
      this.urls = filteredUrls;
    },
  },
  persist: true,
});
