import { Mdx } from '@/components';
import { locales } from '@/lang/locales';
import { getContent } from '@/lib/getContent';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type TParamsLocale = {
  params: {
    locale: locales;
  };
};

export async function generateMetadata(
  props: TParamsLocale
): Promise<Metadata> {
  const content = await getContent(props.params.locale, 'home', 'content');

  if (!content) {
    return {};
  }

  return {
    title: content.title,
    description: content.description,
    openGraph: {
      title: content.title,
      description: content.description,
      type: 'website',
      locale: props.params.locale,
      images: [
        {
          url: content.image || '',
          width: 1200,
          height: 675,
          alt: content.imageCaption,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: content.title,
      description: content.description,
      creator: '@juancmandev',
      images: {
        width: 1200,
        height: 675,
        url: content.image || '',
        alt: content.imageCaption,
      },
    },
  };
}

export default async function Home(props: TParamsLocale) {
  const content = await getContent(props.params.locale, 'home', 'content');

  if (!content) {
    return notFound();
  }

  return (
    <>
      <Mdx code={content.body.code} />
    </>
  );
}
