class KnowledgeMerger {

    merge({

        dictionary = [],

        workspace = [],

        industry = [],

        feedback = [],

        upload = []

    } = {}) {

        const knowledge = new Map();

        const sources = [

            {

                name: "Dictionary",

                data: dictionary

            },

            {

                name: "Workspace",

                data: workspace

            },

            {

                name: "Industry",

                data: industry

            },

            {

                name: "Feedback",

                data: feedback

            },

            {

                name: "Upload",

                data: upload

            }

        ];

        sources.forEach(source => {

            source.data.forEach(item => {

                const key =

                    item.normalized ||

                    item.original ||

                    item.field ||

                    JSON.stringify(item);

                if (

                    !knowledge.has(key)

                ) {

                    knowledge.set(

                        key,

                        {

                            ...item,

                            sources: [

                                source.name

                            ]

                        }

                    );

                }

                else {

                    const existing =

                        knowledge.get(key);

                    if (

                        !existing.sources.includes(

                            source.name

                        )

                    ) {

                        existing.sources.push(

                            source.name

                        );

                    }

                }

            });

        });

        return Array.from(

            knowledge.values()

        );

    }

    prioritize(records = []) {

        const priority = {

            Feedback: 5,

            Workspace: 4,

            Industry: 3,

            Upload: 2,

            Dictionary: 1

        };

        return [...records].sort(

            (a, b) => {

                const scoreA =

                    Math.max(

                        ...(a.sources || [])

                            .map(

                                source =>

                                    priority[source] || 0

                            )

                    );

                const scoreB =

                    Math.max(

                        ...(b.sources || [])

                            .map(

                                source =>

                                    priority[source] || 0

                            )

                    );

                return scoreB - scoreA;

            }

        );

    }

}

module.exports = new KnowledgeMerger();