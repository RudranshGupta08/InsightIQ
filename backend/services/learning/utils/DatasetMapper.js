class DatasetMapper {

    build(rows = [], mappings = []) {

        if (!Array.isArray(rows) || rows.length === 0) {

            return [];

        }

        const mappingDictionary = this.createMappingDictionary(

            mappings

        );

        return rows.map(row => {

            const businessRow = {};

            Object.entries(row).forEach(

                ([key, value]) => {

                    const mappedField =

                        mappingDictionary[key] ||

                        mappingDictionary[key.toLowerCase()] ||

                        key;

                    businessRow[mappedField] = value;

                }

            );

            return businessRow;

        });

    }

    createMappingDictionary(mappings = []) {

        const dictionary = {};

        mappings.forEach(mapping => {

            dictionary[mapping.original] =

                mapping.mappedTo;

            dictionary[

                mapping.original.toLowerCase()

            ] = mapping.mappedTo;

        });

        return dictionary;

    }

    getColumns(dataset = []) {

        if (!dataset.length) {

            return [];

        }

        return Object.keys(dataset[0]);

    }

    getNumericColumns(dataset = []) {

        const columns =

            this.getColumns(dataset);

        return columns.filter(column =>

            dataset.some(row =>

                typeof row[column] === "number"

            )

        );

    }

    getCategoricalColumns(dataset = []) {

        const columns =

            this.getColumns(dataset);

        return columns.filter(column =>

            dataset.some(row =>

                typeof row[column] === "string"

            )

        );

    }

}

module.exports = new DatasetMapper();