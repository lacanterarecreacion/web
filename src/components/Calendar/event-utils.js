
import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: '1ekf84ne',
  dataset: 'production',
  apiVersion: '2023-02-08',
  useCdn: false
});

export const INITIAL_EVENTS = await sanityClient.fetch(`*[_type == "calendarioLudico"] | order(start asc)
{
  title,
  start,
  end,
  "extendedProps":  {
    description,
    image,
    link,
  }
}`)

