class VocabularyBuilder {

    normalize(term = "") {

        return term

            .toString()

            .trim()

            .toLowerCase()

            .replace(/[_-]/g, " ")

            .replace(/[^\w\s]/g, "")

            .replace(/\s+/g, " ");

    }

    build(headers = []) {

        const vocabulary = [];

        const seen = new Set();

        headers.forEach(header => {

            const normalized = this.normalize(header);

            if (

                !normalized ||

                seen.has(normalized)

            ) {

                return;

            }

            seen.add(normalized);

            vocabulary.push({

                original: header,

                normalized,

                tokens: normalized

                    .split(" ")

                    .filter(Boolean),

                frequency: 1

            });

        });

        return vocabulary;

    }

    merge(existing = [], incoming = []) {

        const map = new Map();

        [...existing, ...incoming].forEach(item => {

            const key = item.normalized;

            if (!map.has(key)) {

                map.set(

                    key,

                    {

                        ...item,

                        frequency:

                            item.frequency || 1

                    }

                );

            }

            else {

                map.get(key).frequency +=

                    item.frequency || 1;

            }

        });

        return Array.from(

            map.values()

        );

    }

    extractKeywords(vocabulary = []) {

        const keywords = new Set();

        vocabulary.forEach(item => {

            item.tokens.forEach(token => {

                if (

                    token.length >= 3

                ) {

                    keywords.add(token);

                }

            });

        });

        return Array.from(keywords);

    }

}

module.exports = new VocabularyBuilder();