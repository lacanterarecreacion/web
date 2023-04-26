import { portableTextToHtml } from 'astro-sanity';
import { urlForImage } from '@/lib/urlForImage';
import getYouTubeId from 'get-youtube-id'

const customComponents = {
  types: {
    image: ({ value }) => {
      return `
        <picture>
          <source
            srcset="${urlForImage(value.asset).format('webp').url()}"
            type="image/webp"
          />
          <img
            class="responsive__img glightbox"
            src="${urlForImage(value.asset).url()}"
            alt="${value.alt}"
          />
        </picture>
      `;
    },
    YoutubeEmbed: ({ value }) => {
      const { url } = value
      const id = getYouTubeId(url)
      return `
        <div class="videoYoutube youtube-container aspect-w-16 rounded-xl aspect-h-9 overflow-hidden" >
          <iframe
            width="100%"
            height="450"
            src="https://www.youtube.com/embed/${id}"
            allow="autoplay; encrypted-media"
            allowfullscreen
          >
          </iframe>
        </div>
      `;
    },
  },
};

export function sanityPortableText(portabletext) {
  return portableTextToHtml(portabletext, customComponents);
}