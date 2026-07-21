const WorkspaceMemoryService = require(
    "../../memory/WorkspaceMemoryService"
);

const VocabularyBuilder = require("../../utils/VocabularyBuilder");

const KnowledgeMerger = require("../../utils/KnowledgeMerger");

const businessDictionary =
require("../../../ai/ontology");

class KnowledgeCollector {

    async collect(context) {

        context.reasoning.push({

            stage: "Knowledge Collection",

            input: context.vocabulary.length,

            output: null,

            decision: "Collecting workspace knowledge.",

            confidence: null,

            duration: null,

            timestamp: new Date()

        });

        const workspace =
            await WorkspaceMemoryService.getWorkspace(
                context.payload.workspaceId
            );

        const dictionaryKnowledge =

            this.buildDictionaryKnowledge();

        const workspaceKnowledge =

            workspace?.businessVocabulary ||

            [];

        const mergedKnowledge =

            KnowledgeMerger.merge({

                dictionary:

                    dictionaryKnowledge,

                workspace:

                    workspaceKnowledge,

                industry: [],

                feedback: [],

                upload:

                    context.vocabulary

            });

        context.knowledge =

            mergedKnowledge;

        context.reasoning.push({

            stage: "Knowledge Collection",

            input:

                context.vocabulary.length,

            output:

                mergedKnowledge.length,

            decision:

                "Knowledge successfully merged.",

            confidence: null,

            duration: null,

            timestamp: new Date()

        });

        return context;

    }

    buildDictionaryKnowledge() {

        const knowledge = [];

        Object.entries(

            businessDictionary

        ).forEach(

            ([field, words]) => {

                words.forEach(

                    word => {

                        knowledge.push({

                            field,

                            original: word,

                            normalized:

                                VocabularyBuilder.normalize(

                                    word

                                )

                        });

                    }

                );

            }

        );

        return knowledge;

    }

}

module.exports = new KnowledgeCollector();