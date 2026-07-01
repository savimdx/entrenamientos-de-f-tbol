import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CurrencyContextProps {
  originalPrice: number;
  convertedPrice: number;
  currencyCode: string;
  formattedPrice: string;
  isConverting: boolean;
  rate: number;
  convertAndFormat: (usdValue: number) => string;
}

const CurrencyContext = createContext<CurrencyContextProps | undefined>(undefined);

// Major country to currency mapping
const countryToCurrency: Record<string, string> = {
  US: 'USD',
  ES: 'EUR', DE: 'EUR', FR: 'EUR', IT: 'EUR', PT: 'EUR', GR: 'EUR', NL: 'EUR', BE: 'EUR', AT: 'EUR', FI: 'EUR', IE: 'EUR',
  BR: 'BRL',
  MX: 'MXN',
  AR: 'ARS',
  CO: 'COP',
  CL: 'CLP',
  PE: 'PEN',
  UY: 'UYU',
  VE: 'VES',
  EC: 'USD',
  SV: 'USD',
  PA: 'USD',
  BO: 'BOB',
  PY: 'PYG',
  CR: 'CRC',
  DO: 'DOP',
  GT: 'GTQ',
  HN: 'HNL',
  NI: 'NIO',
  GB: 'GBP',
  CA: 'CAD',
  AU: 'AUD',
  NZ: 'NZD',
  JP: 'JPY',
  CN: 'CNY',
  IN: 'INR',
  ZA: 'ZAR',
  CH: 'CHF',
  SE: 'SEK',
  NO: 'NOK',
  DK: 'DKK',
  RU: 'RUB',
  KR: 'KRW',
  SG: 'SGD',
  HK: 'HKD',
};

// Major timezone to country mapping
const timezoneToCountry: Record<string, string> = {
  'America/Sao_Paulo': 'BR',
  'America/Rio_Branco': 'BR',
  'America/Manaus': 'BR',
  'America/Belem': 'BR',
  'America/Fortaleza': 'BR',
  'America/Recife': 'BR',
  'America/Cuiaba': 'BR',
  'America/Argentina/Buenos_Aires': 'AR',
  'America/Argentina/Cordoba': 'AR',
  'America/Argentina/Salta': 'AR',
  'America/Bogota': 'CO',
  'America/Santiago': 'CL',
  'America/Mexico_City': 'MX',
  'America/Monterrey': 'MX',
  'America/Tijuana': 'MX',
  'America/Lima': 'PE',
  'America/Caracas': 'VE',
  'America/Montevideo': 'UY',
  'America/Asuncion': 'PY',
  'America/La_Paz': 'BO',
  'America/Guayaquil': 'EC',
  'America/Quito': 'EC',
  'America/Panama': 'PA',
  'America/Costa_Rica': 'CR',
  'America/Guatemala': 'GT',
  'America/El_Salvador': 'SV',
  'America/Tegucigalpa': 'HN',
  'America/Managua': 'NI',
  'America/Santo_Domingo': 'DO',
  'Europe/Madrid': 'ES',
};

// Fallback offline exchange rates in case API is down or blocked
const fallbackRates: Record<string, number> = {
  BRL: 5.60,
  EUR: 0.92,
  MXN: 18.20,
  COP: 4100.00,
  ARS: 915.00,
  CLP: 940.00,
  PEN: 3.75,
  UYU: 40.00,
  USD: 1.00,
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const originalPrice = 7.90;
  const [currencyCode, setCurrencyCode] = useState<string>('USD');
  const [convertedPrice, setConvertedPrice] = useState<number>(7.90);
  const [formattedPrice, setFormattedPrice] = useState<string>('$7.90');
  const [rate, setRate] = useState<number>(1);
  const [isConverting, setIsConverting] = useState<boolean>(true);

  useEffect(() => {
    async function loadCurrency() {
      let detectedCurrency = 'USD';

      // 1. Check local storage cache for detected currency
      try {
        const cachedCurrency = localStorage.getItem('user_detected_currency');
        if (cachedCurrency) {
          detectedCurrency = cachedCurrency;
        } else {
          // Try fetching from geolocation API
          try {
            const res = await fetch('https://ipapi.co/json/');
            if (res.ok) {
              const data = await res.json();
              if (data.currency) {
                detectedCurrency = data.currency;
              }
            }
          } catch (e) {
            // Geolocation blocked or down, try timezone mapping
            const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
            if (tz && timezoneToCountry[tz]) {
              const country = timezoneToCountry[tz];
              detectedCurrency = countryToCurrency[country] || 'USD';
            } else {
              // Try locale/navigator mapping
              const locale = navigator.language || '';
              const country = locale.split('-')[1]?.toUpperCase();
              if (country && countryToCurrency[country]) {
                detectedCurrency = countryToCurrency[country];
              }
            }
          }
          localStorage.setItem('user_detected_currency', detectedCurrency);
        }
      } catch (err) {
        console.warn('LocalStorage is not available:', err);
      }

      setCurrencyCode(detectedCurrency);

      // 2. Fetch exchange rate for the detected currency
      let detectedRate = 1;
      if (detectedCurrency !== 'USD') {
        const cacheKey = `rate_USD_${detectedCurrency}`;
        const now = Date.now();
        let useCached = false;

        try {
          const cachedRate = localStorage.getItem(cacheKey);
          const cacheTime = localStorage.getItem(`${cacheKey}_time`);
          if (cachedRate && cacheTime && now - parseInt(cacheTime, 10) < 12 * 60 * 60 * 1000) {
            detectedRate = parseFloat(cachedRate);
            useCached = true;
          }
        } catch (e) {
          // Ignored
        }

        if (!useCached) {
          try {
            const res = await fetch('https://open.er-api.com/v6/latest/USD');
            if (res.ok) {
              const data = await res.json();
              if (data && data.rates && data.rates[detectedCurrency]) {
                detectedRate = data.rates[detectedCurrency];
                try {
                  localStorage.setItem(cacheKey, detectedRate.toString());
                  localStorage.setItem(`${cacheKey}_time`, now.toString());
                } catch (e) {
                  // Ignored
                }
              } else {
                detectedRate = fallbackRates[detectedCurrency] || 1;
              }
            } else {
              detectedRate = fallbackRates[detectedCurrency] || 1;
            }
          } catch (e) {
            detectedRate = fallbackRates[detectedCurrency] || 1;
          }
        }
      }

      setRate(detectedRate);

      // 3. Compute final converted price and formatting
      const finalPrice = Number((originalPrice * detectedRate).toFixed(2));
      setConvertedPrice(finalPrice);

      try {
        const formatter = new Intl.NumberFormat(navigator.language || 'es-ES', {
          style: 'currency',
          currency: detectedCurrency,
        });
        setFormattedPrice(formatter.format(finalPrice));
      } catch (e) {
        // Simple manual formatting fallback if Intl.NumberFormat fails
        setFormattedPrice(`${detectedCurrency} ${finalPrice.toFixed(2)}`);
      }

      setIsConverting(false);
    }

    loadCurrency();
  }, []);

  const convertAndFormat = (usdValue: number): string => {
    const converted = Number((usdValue * rate).toFixed(2));
    try {
      const formatter = new Intl.NumberFormat(navigator.language || 'es-ES', {
        style: 'currency',
        currency: currencyCode,
      });
      return formatter.format(converted);
    } catch (e) {
      return `${currencyCode} ${converted.toFixed(2)}`;
    }
  };

  return (
    <CurrencyContext.Provider value={{ originalPrice, convertedPrice, currencyCode, formattedPrice, isConverting, rate, convertAndFormat }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
