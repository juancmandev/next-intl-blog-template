import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { localesList, type locales } from '@/locales';
import { Header } from '@/components';
import { ThemeProvider } from '@/providers/theme';

type TRootLayout = {
  children: React.ReactNode;
  params: {
    locale: locales;
  };
};

export function generateStaticParams() {
  return localesList.map((locale) => ({
    lang: locale,
  }));
}

export default async function RootLayout(props: TRootLayout) {
  let messages;
  try {
    messages = (await import(`../../lang/${props.params.locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={props.params.locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <Header locale={props.params.locale} />
            <main className='px-5 pt-36 pb-16'>{props.children}</main>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
