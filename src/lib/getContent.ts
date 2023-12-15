import { locales } from '@/lang/locales';
import { allEnContents, allEsContents } from 'contentlayer/generated';

export async function getAllContent(locale: locales, type: string) {
  let content: typeof allEnContents | typeof allEsContents;

  switch (locale) {
    case 'en':
      content = allEnContents.filter((c) =>
        new RegExp(`en/${type}/*`).test(c._id)
      );
      break;
    case 'es':
      content = allEsContents.filter((c) =>
        new RegExp(`es/${type}/*`).test(c._id)
      );
      break;
  }

  if (!content) return;

  return content;
}

type TContent = (typeof allEnContents)[number] | (typeof allEsContents)[number];

export async function getContent(locale: locales, type: string, slug: string) {
  let content: TContent | undefined;

  switch (locale) {
    case 'en':
      content =
        allEnContents.find((c) =>
          new RegExp(`en/${type}/${slug}`).test(c._id)
        ) || undefined;
      break;
    case 'es':
      content =
        allEsContents.find((c) =>
          new RegExp(`es/${type}/${slug}`).test(c._id)
        ) || undefined;
      break;
  }

  if (!content) return;

  return content;
}
