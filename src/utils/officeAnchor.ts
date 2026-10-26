/**
 * "See Location" links (LocationsHighlights) and the offices on /locations (Locations)
 * meet on this anchor. Editors type the tag in both places and HTML ids are
 * case-sensitive, so both sides normalise it.
 */
export const officeAnchor = (tag: string) => tag.trim().toLowerCase();
