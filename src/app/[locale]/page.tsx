import { Mdx } from '@/components';
import { locales } from '@/locales';
import { getContent } from '@/lib/getContent';
import { notFound } from 'next/navigation';

type TParamsLocale = {
  params: {
    locale: locales;
  };
};

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
