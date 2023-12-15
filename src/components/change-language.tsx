'use client';

import { locales, localesList } from '@/lang/locales';
import { BookA } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

type TChangeLanguage = {
  locale: locales;
};

export default function ChangeLanguage(props: TChangeLanguage) {
  const t = useTranslations();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button title={t('change_language.title')} variant='ghost' size='icon'>
          <BookA />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{t('change_language.title')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {localesList.map((locale) => (
          <DropdownMenuItem asChild key={locale} className='flex items-center'>
            <Link href={`/${locale}`}>
              {t(`change_language.${locale}`)}{' '}
              {locale === props.locale && t('common.current')}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
