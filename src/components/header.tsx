import { locales } from '@/lang/locales';
import { ChangeLanguage, ToggleTheme } from '.';
import Link from 'next/link';
import { Button } from './ui/button';

type THeader = {
  locale: locales;
};

export default function Header(props: THeader) {
  return (
    <header className='w-full fixed -top-1 p-5 flex justify-between items-center border-b bg-background'>
      <Button variant='link' asChild>
        <Link href={`/${props.locale}`}>Home</Link>
      </Button>
      <section className='flex items-center gap-2'>
        <ChangeLanguage locale={props.locale} />
        <ToggleTheme />
      </section>
    </header>
  );
}
