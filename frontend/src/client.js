import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-03-25",
  token: process.env.REACT_APP_SANITY_TOKEN,
});

export default client;

export const urlFor = (source) => imageUrlBuilder(client).image(source);
