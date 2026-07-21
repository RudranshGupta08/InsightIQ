class LearningPayloadBuilder {

    build(normalizedData = {}, options = {}) {

        if (!normalizedData.success) {

            throw new Error(

                normalizedData.error ||

                "Invalid normalized data."

            );

        }

        const {

            workspaceId,

            fileName,

            uploadedBy = null,

            source = "upload"

        } = options;

        return {

            workspaceId,

            fileName:

                fileName ||

                normalizedData.metadata.fileName,

            uploadedBy,

            source,

            uploadedAt: new Date(),

            headers:

                normalizedData.headers,

            rows:

                normalizedData.records,

            metadata: {

                ...normalizedData.metadata,

                generatedAt:

                    new Date()

            }

        };

    }

}

module.exports = new LearningPayloadBuilder();