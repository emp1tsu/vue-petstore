import { Configuration, PetApi } from "@/api-client";

export const petApi = new PetApi(
  new Configuration({
    apiKey: "special-key",
    basePath: process.env.VUE_APP_API_BASE_PATH
  })
);
