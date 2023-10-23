import { createClient } from 'sanity-codegen';
import { Documents } from './exportedBlogSchema';

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET;

export const nonTypedSanityClient = {
  projectId: 'cvelh0ca', //Replace this with your project ID
  dataset: 'production',
};

// This type parameter enables the client to be aware of your generated types
//                           👇👇👇
export default createClient<Documents>({
  // Note: these are useful to pull from environment variables
  // (required) your sanity project id
  projectId: projectId, //Replace this with your project ID

  // (required) your sanity dataset
  dataset: dataset,

  fetch: fetch,

  previewMode: false,

  apiVersion: '2022-08-18',
});
