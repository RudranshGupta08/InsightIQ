class MemoryCleaner {

    removeDuplicates(records = []) {

        const unique = new Map();

        records.forEach(record => {

            const key =

                record.normalized ||

                record.original ||

                JSON.stringify(record);

            if (!unique.has(key)) {

                unique.set(

                    key,

                    record

                );

            }

            else {

                const existing = unique.get(key);

                if (

                    (record.confidence || 0) >

                    (existing.confidence || 0)

                ) {

                    unique.set(

                        key,

                        record

                    );

                }

            }

        });

        return Array.from(

            unique.values()

        );

    }

    removeEmpty(records = []) {

        return records.filter(record => {

            return Object.values(record).some(value =>

                value !== null &&

                value !== undefined &&

                value !== ""

            );

        });

    }

    removeLowConfidence(

        records = [],

        minimum = 30

    ) {

        return records.filter(record =>

            (record.confidence || 0) >= minimum

        );

    }

    sortByConfidence(records = []) {

        return [...records].sort(

            (a, b) =>

                (b.confidence || 0) -

                (a.confidence || 0)

        );

    }

    clean(records = []) {

        let cleaned = this.removeEmpty(

            records

        );

        cleaned = this.removeDuplicates(

            cleaned

        );

        cleaned = this.removeLowConfidence(

            cleaned

        );

        cleaned = this.sortByConfidence(

            cleaned

        );

        return cleaned;

    }

}

module.exports = new MemoryCleaner();