import { createClient } from "@sanity/client";

export default createClient({
  projectId: "1ekf84ne",
  dataset: "production",
  apiVersion: "2023-02-08",
  useCdn: true,
});
