import { parsePhoneNumberFromString, CountryCode } from "libphonenumber-js";
import { byCountry } from "country-code-lookup";

export const formatPhoneNumber = (
  rawNumber: number | string,
  defaultCountry: string
): string => {
  const phoneStr = rawNumber.toString();

  const country = byCountry(defaultCountry);
  console.log("🚀 ~ country:", country)

  const countryCode = country?.iso2 || defaultCountry;
  console.log("🚀 ~ countryCode:", countryCode)

  const phoneNumber = parsePhoneNumberFromString(
    phoneStr,
    countryCode as CountryCode
  );

  return phoneNumber?.isValid() ? phoneNumber.formatInternational() : phoneStr;
};
