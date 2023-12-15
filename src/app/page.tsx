import { redirect } from 'next/navigation';

export default function RootPage() {
  // Your default locale
  redirect('/en');
}
