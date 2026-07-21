class SimilarityMatcher {

    normalize(text = "") {

        return text
            .toString()
            .toLowerCase()
            .trim()
            .replace(/[_-]/g, " ")
            .replace(/[^\w\s]/g, "")
            .replace(/\s+/g, " ");

    }

    tokenize(text = "") {

        return this
            .normalize(text)
            .split(" ")
            .filter(Boolean);

    }

    exactMatch(first, second) {

        return this.normalize(first) === this.normalize(second);

    }

    startsWith(first, second) {

        const a = this.normalize(first);
        const b = this.normalize(second);

        return a.startsWith(b) || b.startsWith(a);

    }

    endsWith(first, second) {

        const a = this.normalize(first);
        const b = this.normalize(second);

        return a.endsWith(b) || b.endsWith(a);

    }

    contains(first, second) {

        const a = this.normalize(first);
        const b = this.normalize(second);

        return a.includes(b) || b.includes(a);

    }

    tokenSimilarity(first, second) {

        const tokensA = this.tokenize(first);

        const tokensB = this.tokenize(second);

        const common = tokensA.filter(

            token => tokensB.includes(token)

        );

        const total =

            new Set([

                ...tokensA,

                ...tokensB

            ]).size;

        if (total === 0) {

            return 0;

        }

        return Math.round(

            (common.length / total) * 100

        );

    }

    wordOverlap(first, second) {

        const wordsA = this.tokenize(first);

        const wordsB = this.tokenize(second);

        if (!wordsA.length || !wordsB.length) {

            return 0;

        }

        const overlap = wordsA.filter(

            word => wordsB.includes(word)

        ).length;

        return Math.round(

            (overlap / Math.max(wordsA.length, wordsB.length)) * 100

        );

    }

    calculateConfidence(first, second) {

        if (this.exactMatch(first, second)) {

            return {

                score: 100,

                algorithm: "Exact Match"

            };

        }

        if (this.startsWith(first, second)) {

            return {

                score: 96,

                algorithm: "Starts With"

            };

        }

        if (this.endsWith(first, second)) {

            return {

                score: 94,

                algorithm: "Ends With"

            };

        }

        if (this.contains(first, second)) {

            return {

                score: 92,

                algorithm: "Contains Match"

            };

        }

        const tokenScore =

            this.tokenSimilarity(first, second);

        const overlapScore =

            this.wordOverlap(first, second);

        const weighted = Math.round(

            tokenScore * 0.7 +

            overlapScore * 0.3

        );

        return {

            score: weighted,

            algorithm: "Weighted Similarity"

        };

    }

    compare(first, second) {

        const result =

            this.calculateConfidence(

                first,

                second

            );

        return {

            first,

            second,

            score: result.score,

            matched: result.score >= 70,

            algorithm: result.algorithm

        };

    }

    compareMultiple(header, candidates = []) {

        let best = {

            matched: false,

            score: 0,

            algorithm: "None",

            keyword: null

        };

        candidates.forEach(candidate => {

            const result =

                this.compare(

                    header,

                    candidate

                );

            if (

                result.score >

                best.score

            ) {

                best = {

                    ...result,

                    keyword: candidate

                };

            }

        });

        return best;

    }

}

module.exports = new SimilarityMatcher();