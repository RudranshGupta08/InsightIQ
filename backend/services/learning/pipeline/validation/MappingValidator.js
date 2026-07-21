class MappingValidator {

    validate(context) {

        const {

            payload

        } = context;

        context.warnings = [];

        if (!payload) {

            throw new Error(

                "Payload is required."

            );

        }

        if (

            !Array.isArray(

                payload.headers

            )

        ) {

            throw new Error(

                "Headers must be an array."

            );

        }

        if (

            payload.headers.length === 0

        ) {

            throw new Error(

                "No headers found."

            );

        }

        if (

            !payload.workspaceId

        ) {

            throw new Error(

                "Workspace ID is required."

            );

        }

        const uniqueHeaders = [

            ...new Set(

                payload.headers

            )

        ];

        if (

            uniqueHeaders.length !==

            payload.headers.length

        ) {

            context.warnings.push(

                "Duplicate headers detected."

            );

        }

        return true;

    }

}

module.exports = new MappingValidator();