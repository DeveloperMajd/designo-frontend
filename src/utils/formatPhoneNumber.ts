import { parsePhoneNumberFromString, CountryCode } from "libphonenumber-js";
import { byCountry } from "country-code-lookup";

export type Phone = { display: string; href: string };

/**
 * A phone number from the CMS, formatted for display, with a tel: link in international
 * format so it dials the right country. Numbers that do not validate are shown as typed.
 */
export const formatPhone = (
  raw: number | string | null | undefined,
  defaultCountry: string
): Phone | null => {
  const value = raw?.toString().trim();
  if (!value) return null;

  const countryCode = byCountry(defaultCountry)?.iso2 || defaultCountry;
  const phoneNumber = parsePhoneNumberFromString(
    value,
    countryCode as CountryCode
  );

  return phoneNumber?.isValid()
    ? { display: phoneNumber.formatInternational(), href: phoneNumber.getURI() }
    : { display: value, href: `tel:${value.replace(/[^\d+]/g, "")}` };
};
