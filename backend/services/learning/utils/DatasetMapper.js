class DatasetMapper {

    build(rows = [], mappings = []) {
        if (!Array.isArray(rows) || rows.length === 0) {
            return [];
        }

        const mappingDictionary = this.createMappingDictionary(mappings);

        return rows.map((row) => {
            const businessRow = {};

            Object.entries(row).forEach(([key, value]) => {
                const normalizedKey = String(key).trim().toLowerCase();
                const mappedField =
                    this.getCanonicalHeader(normalizedKey) ||
                    mappingDictionary[key] ||
                    mappingDictionary[normalizedKey] ||
                    key;

                businessRow[mappedField] = value;
            });

            return businessRow;
        });
    }

    createMappingDictionary(mappings = []) {
        const dictionary = {};

        mappings.forEach((mapping) => {
            if (!mapping?.original || !mapping?.mappedTo) return;

            const original = String(mapping.original).trim();
            const mappedTo = String(mapping.mappedTo).trim();

            if (!original || !mappedTo || mappedTo.toLowerCase() === "unknown") {
                return;
            }

            dictionary[original] = mappedTo;
            dictionary[original.toLowerCase()] = mappedTo;
        });

        return dictionary;
    }

    getCanonicalHeader(header = "") {
        const aliases = {
            amount: "amount",
            "transaction amount": "amount",
            "transaction value": "amount",
            "total amount": "amount",
            totalamount: "amount",
            "net amount": "amount",
            value: "amount",
            "transaction type": "transactionType",
            transactiontype: "transactionType",
            "txn type": "transactionType",
            type: "transactionType",
            date: "transactionDate",
            "transaction date": "transactionDate",
            transactiondate: "transactionDate",
            "txn date": "transactionDate",
            title: "title",
            description: "description",
            category: "category",
            subcategory: "subCategory",
            "sub category": "subCategory",
            currency: "currency",
            status: "status",
            "customer/vendor": "customerVendor",
            customer: "customerVendor",
            vendor: "customerVendor",
            "customer vendor": "customerVendor",
            quantity: "quantity",
            qty: "quantity",
            "unit price": "unitPrice",
            unitprice: "unitPrice",
            "payment method": "paymentMethod",
            paymentmethod: "paymentMethod",
            "payment reference": "paymentReference",
            paymentreference: "paymentReference",
            "invoice number": "invoiceNumber",
            invoicenumber: "invoiceNumber",
            region: "region",
            city: "city",
            country: "country",
            "item name": "itemName",
            itemname: "itemName",
            notes: "notes",
        };

        return aliases[header] || null;
    }

    getColumns(dataset = []) {
        if (!dataset.length) return [];
        return Object.keys(dataset[0]);
    }

    getNumericColumns(dataset = []) {
        const columns = this.getColumns(dataset);
        return columns.filter((column) =>
            dataset.some((row) => typeof row[column] === "number")
        );
    }

    getCategoricalColumns(dataset = []) {
        const columns = this.getColumns(dataset);
        return columns.filter((column) =>
            dataset.some((row) => typeof row[column] === "string")
        );
    }
}

module.exports = new DatasetMapper();
