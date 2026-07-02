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
  const originalPrice = 9.90;
  const [currencyCode, setCurrencyCode] = useState<string>('USD');
  const [convertedPrice, setConvertedPrice] = useState<number>(9.90);
  const [formattedPrice, setFormattedPrice] = useState<string>('$9.90');
  const [rate, setRate] = useState<number>(1);
  const [isConverting, setIsConverting] = useState<boolean>(false);

  useEffect(() => {
    async function loadCurrency() {
      setCurrencyCode('USD');
      setRate(1);
      setConvertedPrice(9.90);
      setFormattedPrice('$9.90');
      setIsConverting(false);
    }

    loadCurrency();
  }, []);

  const convertAndFormat = (usdValue: number): string => {
    try {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: usdValue % 1 === 0 ? 0 : 2,
        maximumFractionDigits: 2
      });
      return formatter.format(usdValue);
    } catch (e) {
      return `$${usdValue}`;
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
