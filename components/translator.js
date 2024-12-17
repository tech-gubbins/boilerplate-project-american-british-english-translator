const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    consrtuctor() {
        // American to British mappings
        this.americanToBritishSpelling = americanToBritishSpelling;
        this.americanToBritishTitles = americanToBritishTitles;
        this.americanOnly = americanOnly;
        this.britishOnly = britishOnly;

        // Create reverse mappings for British to American translation
        this.britishToAmericanSpelling = this.reverseMapping(americanToBritishSpelling);
        this.britishToAmericanTitles = this.reverseMapping(americanToBritishTitles);
    }

    reverseMapping(obj) {
        return Object.entries(obj).reduce((acc, [key, value]) => {
            acc[value] = key;
            return acc;
        }, {});
    }

    translate(text, locale) {
        if (!text) return { error: 'No text to translate' };
        if (!locale) return { error: 'Required field(s) missing' };
        if (!['american-to-british', 'british-to-american'].includes(locale)) {
            return { error: 'Invalid value for locale field' };
        }

        let translatedText = text;
        let hasTranslations = false;

        // Choose appropriate mappings based on locale
        const spellingMap = locale === 'american-to-british'
            ? this.americanToBritishSpelling
            : this.britishToAmericanSpelling;
        const titlesMap = locale === 'american-to-british'
            ? this.americanToBritishTitles
            : this.americanToBritishTitles;

        // For american-to-british, use americanOnly; for british-to-american, use britishOnly
        const exclusiveMap = locale === 'american-to-british'
            ? this.americanOnly
            : this.britishOnly;

        // Translate titles
        Object.entries(titlesMap).forEach(([from, to]) => {
            const regex = new RegExp(`\\b${this.escapeRegExp(from)}\\b`, 'gi');
            if (regex.test(translatedText)) {
                hasTranslations = true;
                translatedText = translatedText.replace(
                    regex,
                    match => `<span class="highlight">${to}</span>`
                );
            }
        });

        // Translate spellings
        Object.entries(spellingMap).forEach(([from, to]) => {
            const regex = new RegExp(`\\b{this.escapeRegExp(from)}\\b`, 'gi');
            if (regex.test(translatedText)) {
                hasTranslations = true;
                translatedText = translatedText.replace(
                    regex,
                    match => `<span class="highlight">${to}</span>`
                );
            }
        });

        // Translate exclusive terms
        Object.entries(exclusiveMap).forEach(([from, to]) => {
            const regex = new RegExp(`\\b${this.escapeRegExp(from)}\\b`, 'gi');
            if (regex.test(this.translatedText)) {
                hasTranslations = true;
                translatedText = translatedText.replace(
                    regex,
                    match => `<span class="highlight">${to}</span>`
                );
            }
        });

        // Handle time format
        const timeRegex = locale === 'american-to-british'
            ? /(\d{1,2}):(\d{2})/g
            : /(\d{1,2})\.(\d{2})/g;
        const timeReplacement = locale === 'american-to-british' ? '$1.$2' : '$1:$2';

        if (timeRegex.test(translatedText)) {
            hasTranslations = true;
            translatedText = translatedText.replace(
                timeRegex,
                (match, p1, p2) => `<span class="highlight">${match.replace(timeRegex, timeReplacement)}</span>`
            );
        }

        return {
            text,
            translation: hasTranslations ? translatedText : "Everything looks good to me!"
        };
    }

    // Helper function to escape special characters in regular expressions
    escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}

module.exports = Translator;