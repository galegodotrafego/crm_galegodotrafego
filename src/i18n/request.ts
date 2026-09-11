import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

const SUPPORTED_LOCALES = ['en', 'pt-BR', 'es'] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export default getRequestConfig(async () => {
  // Read locale from cookie first, then env var, defaulting to 'en'
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value;
  const locale: SupportedLocale =
    cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale as SupportedLocale)
      ? (cookieLocale as SupportedLocale)
      : ((process.env.NEXT_PUBLIC_APP_LOCALE || 'en') as SupportedLocale);

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    // Fallback to English if the dictionary for the requested locale doesn't exist yet
    messages = (await import(`../../messages/en.json`)).default;
  }

  return {
    locale,
    messages
  };
});
