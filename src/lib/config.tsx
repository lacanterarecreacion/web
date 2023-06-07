export const sanityConfig = {
  // Find your project ID and dataset in `sanity.json` in your studio project
  projectId: "1ekf84ne",
  dataset: "production",
  apiVersion: "2023-02-08",
  useCdn: true,
  // useCdn == true gives fast, cheap responses using a globally distributed cache.
  // Set this to false if your application require the freshest possible
  // data always (potentially slightly slower and a bit more expensive).
};
