const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

suite('Unit Tests', () => {
	suite('Translate to  British English', () => {
		test(`Translate "Mangoes are my favorite fruit." to British English`, () => {
			const result = translator.translate(
				'Mangoes are my favorite fruit.',
				'american-to-british'
			);
			assert.equal(result.translation.includes('favourite'), true);
		});

		test(`Translate "I ate yogurt for breakfast." to British English`, () => {
			const result = translator.translate(
				'I ate yogurt for breakfast.',
				'american-to-british'
			);
			assert.equal(result.translation.includes('yoghurt'), true);
		});

		test(`Translate "We had a party at my friend's condo." to British English`, () => {
            const result = translator.translate(
                `We had a party at my friend's condo.`,
                `american-to-british`
            );
            assert.equal(result.translation.includes('flat'), true);
        });

        test(`Translate "Can you toss this in the trashcan for me?" to British English`, () => {
            const result = translator.translate(
                `Can you toss this in the trashcan for me?`,
                `american-to-british`
            );
            assert.equal(result.translation.includes('bin'), true);
        });

        test(`Translate "The parking lot was full." to British English`, () => {
            const result = translator.translate(
                `The parking lot was full.`,
                `american-to-british`
            );
            assert.equal(result.translation.includes('car park'), true);
        });

        test(`Translate "Like a high tech Rube Goldberg machine." to British English`, () => {
            const result = translator.translate(
                `Like a high tech Rube Goldberg machine.`,
                `american-to-british`
            );
            assert.equal(result.translation.includes('Heath Robinson device'), true);
        });

        test(`Translate "To play hooky means to skip class or work." to British English`, () => {
            const result = translator.translate(
                `To play hooky means to skip class or work.`,
                `american-to-british`
            );
            assert.equal(result.translation.includes('bunk off'), true);
        });

        test(`Translate "No Mr. Bond, I expect you to die." to British English`, () => {
            const result = translator.translate(
                `No Mr. Bond, I expect you to die.`,
                `american-to-british`
            );
            assert.equal(result.translation.includes('Mr'), true);
        });

        test(`Translate "We had a party at my friend's condo." to British English`, () => {
            const result = translator.translate(
                `We had a party at my friend's condo.`,
                `american-to-british`
            );
            assert.equal(result.translation.includes('flat'), true);
        });

        test(`Translate "We had a party at my friend's condo." to British English`, () => {
            const result = translator.translate(
                `We had a party at my friend's condo.`,
                `american-to-british`
            );
            assert.equal(result.translation.includes('flat'), true);
        });
	});
});

