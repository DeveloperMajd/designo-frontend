import { createContext, useContext, type ReactNode } from "react";

// Interface copy edited in the CMS ("See Location", "Contact Us", ...), keyed by name.
const LabelsContext = createContext<Record<string, string>>({});

export const LabelsProvider = ({
  labels,
  children,
}: {
  labels: Record<string, string>;
  children: ReactNode;
}) => (
  <LabelsContext.Provider value={labels}>{children}</LabelsContext.Provider>
);

/** The CMS label with this name, or the fallback when the CMS has none. */
export const useLabel = (name: string, fallback = "") =>
  useContext(LabelsContext)[name] || fallback;
