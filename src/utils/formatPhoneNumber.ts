import { parsePhoneNumberFromString, CountryCode } from "libphonenumber-js";
import { byCountry } from "country-code-lookup";

export const formatPhoneNumber = (
  rawNumber: number | string,
  defaultCountry: string
): string => {
  const phoneStr = rawNumber.toString();

  const country = byCountry(defaultCountry);

  const countryCode = country?.iso2 || defaultCountry;

  const phoneNumber = parsePhoneNumberFromString(
    phoneStr,
    countryCode as CountryCode
  );

  return phoneNumber?.isValid() ? phoneNumber.formatInternational() : phoneStr;
};
