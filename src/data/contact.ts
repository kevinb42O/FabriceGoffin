/**
 * Single source of truth for public contact details.
 * Update here — every page picks it up automatically.
 */
export const contact = {
  email: 'contact@fabricegoffin.be',
  phoneDisplay: '059 80 55 00',
  phoneHref: 'tel:+3259805500',
  address: {
    line1: 'Stadhuis, Vindictivelaan 1',
    line2: '8400 Oostende',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Stadhuis,+Vindictivelaan+1,+8400+Oostende',
  },
  socials: {
    facebook: 'https://www.facebook.com/GoffinFabrice',
    instagram: 'https://www.instagram.com/goffinfabrice/',
    linkedin: 'https://www.linkedin.com/in/goffinfabrice/',
  },
} as const;
