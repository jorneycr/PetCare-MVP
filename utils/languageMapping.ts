import { Language } from './dictionaries';

export const getLanguageFromCountry = (country: string): Language => {

    // Portuguese
    if (country === 'Brasil') return 'pt';

    // French
    const frenchCountries = [
        'Canadá', // (Also English, but let's default to EN usually, or maybe FR if explicitly asked. But Canada is tricky. Let's generic to EN usually, but adding to FR exception list for now if desired as secondary, but standard mapping:
        'Haití',
        'Guadalupe',
        'Martinica',
        'San Martín',
        'San Bartolomé',
        'Guayana Francesa'
    ];
    if (frenchCountries.includes(country)) return 'fr';

    // English
    const englishCountries = [
        'Estados Unidos',
        'Canadá',
        'Jamaica',
        'Bahamas',
        'Barbados',
        'Belice',
        'Dominica',
        'Granada',
        'Guyana',
        'San Cristóbal y Nieves',
        'Santa Lucía',
        'San Vicente y las Granadinas',
        'Trinidad y Tobago',
        'Antigua y Barbuda'
    ];
    if (englishCountries.includes(country)) return 'en';

    // Default to Spanish for everything else in Americas
    return 'es';
};
