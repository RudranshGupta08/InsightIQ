class FeedbackMerger {

    merge(existing = {}, feedback = {}) {

        return {

            ...existing,

            originalField:

                feedback.originalField ||

                existing.originalField ||

                null,

            correctedField:

                feedback.correctedField ||

                existing.correctedField ||

                null,

            aliases:

                this.mergeAliases(

                    existing.aliases || [],

                    feedback.aliases || [],

                    feedback.originalField,

                    feedback.correctedField

                ),

            feedbackCount:

                (existing.feedbackCount || 0) + 1,

            acceptedCount:

                (existing.acceptedCount || 0) +

                (feedback.accepted ? 1 : 0),

            rejectedCount:

                (existing.rejectedCount || 0) +

                (feedback.accepted ? 0 : 1),

            confidence:

                feedback.confidence ??

                existing.confidence ??

                0,

            source:

                feedback.source ||

                existing.source ||

                "user",

            updatedBy:

                feedback.updatedBy ||

                existing.updatedBy ||

                "system",

            createdAt:

                existing.createdAt ||

                new Date(),

            updatedAt:

                new Date()

        };

    }

    mergeAliases(

        existingAliases = [],

        incomingAliases = [],

        originalField,

        correctedField

    ) {

        const aliases = new Set([

            ...existingAliases,

            ...incomingAliases

        ]);

        if (originalField) {

            aliases.add(originalField);

        }

        if (correctedField) {

            aliases.add(correctedField);

        }

        return Array.from(aliases);

    }

}

module.exports = new FeedbackMerger();