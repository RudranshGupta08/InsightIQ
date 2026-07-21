function patternEngine(normalizedData = {}) {

    const records = normalizedData.records || [];
    const headers = normalizedData.headers || [];

    const lowerHeaders = headers.map(header =>
        String(header).toLowerCase()
    );

    const patterns = {

        hasRevenue: false,

        hasExpense: false,

        hasProfit: false,

        hasCustomer: false,

        hasVendor: false,

        hasSalary: false,

        hasTax: false,

        hasInventory: false,

        hasDate: false,

        transactionCount: records.length,

        headerCount: headers.length

    };

    
    // Revenue Detection

    patterns.hasRevenue =

        lowerHeaders.some(header =>

            header.includes("revenue") ||

            header.includes("sales") ||

            header.includes("income") ||

            header.includes("turnover")

        );

    
    // Expense Detection
   

    patterns.hasExpense =

        lowerHeaders.some(header =>

            header.includes("expense") ||

            header.includes("cost") ||

            header.includes("purchase")

        );

   
    // Profit Detection
    

    patterns.hasProfit =

        lowerHeaders.some(header =>

            header.includes("profit") ||

            header.includes("margin")

        );

   
    // Customer Detection
    

    patterns.hasCustomer =

        lowerHeaders.some(header =>

            header.includes("customer") ||

            header.includes("client")

        );

    
    // Vendor Detection
   

    patterns.hasVendor =

        lowerHeaders.some(header =>

            header.includes("vendor") ||

            header.includes("supplier")

        );

    // Salary Detection
    

    patterns.hasSalary =

        lowerHeaders.some(header =>

            header.includes("salary") ||

            header.includes("payroll") ||

            header.includes("employee")

        );

    
    // Tax Detection
   

    patterns.hasTax =

        lowerHeaders.some(header =>

            header.includes("gst") ||

            header.includes("tax") ||

            header.includes("vat") ||

            header.includes("tds")

        );

    
    // Inventory Detection
  

    patterns.hasInventory =

        lowerHeaders.some(header =>

            header.includes("inventory") ||

            header.includes("stock") ||

            header.includes("product")

        );

    
    // Date Detection
    

    patterns.hasDate =

        lowerHeaders.some(header =>

            header.includes("date")

        );

    
    // Business Type Prediction
    
    let businessType = "General Business";

    if (

        patterns.hasInventory &&

        patterns.hasRevenue

    ) {

        businessType = "Retail";

    }

    if (

        patterns.hasRevenue &&

        patterns.hasCustomer &&

        !patterns.hasInventory

    ) {

        businessType = "Service";

    }

    if (

        patterns.hasSalary &&

        patterns.hasCustomer

    ) {

        businessType = "Consultancy";

    }

    if (

        patterns.hasInventory &&

        patterns.hasVendor &&

        patterns.hasTax

    ) {

        businessType = "Trading";

    }

    return {

        businessType,

        patterns

    };

}

module.exports = patternEngine;