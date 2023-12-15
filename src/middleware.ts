import createMiddleware from 'next-intl/middleware';
import { NextResponse, NextRequest } from 'next/server';
import { localesList } from './lang/locales';

export async function middleware(req: NextRequest) {
  const intlMiddleware: (request: NextRequest) => NextResponse<unknown> =
    createMiddleware({
      locales: localesList,
      defaultLocale: 'en',
    });
  return intlMiddleware(req);
}

export const config = {
  matcher: ['/', '/(en|es)/:path*'],
};
