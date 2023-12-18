'use client';

import { locales } from '@/lang/locales';
import { ChangeLanguage, ToggleTheme } from '.';
import Link from 'next/link';
import { Button } from './ui/button';
import { useTranslations } from 'next-intl';

type THeader = {
  locale: locales;
};

const links = [
  {
    label: 'how_to_use',
    href: '/how-to-use',
  },
];

export default function Header(props: THeader) {
  const t = useTranslations('header');

  return (
    <header className='w-full fixed -top-1 p-5 flex justify-between items-center border-b bg-background'>
      <Button variant='link' asChild>
        <Link href={`/${props.locale}`}>Home</Link>
      </Button>
      <section>
        {links.map(({ label, href }) => (
          <Button asChild variant='link' key={label}>
            <Link href={`/${props.locale}${href}`}>{t(label)}</Link>
          </Button>
        ))}
      </section>
      <section className='flex items-center gap-2'>
        <ChangeLanguage locale={props.locale} />
        <ToggleTheme />
      </section>
    </header>
  );
}
