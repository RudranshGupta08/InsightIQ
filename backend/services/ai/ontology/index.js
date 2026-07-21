const financial = require("./financial");
const sales = require("./sales");
const operations = require("./operations");
const inventory = require("./inventory");
const hr = require("./hr");
const manufacturing = require("./manufacturing");
const logistics = require("./logistics");
const banking = require("./banking");
const insurance = require("./insurance");
const healthcare = require("./healthcare");
const education = require("./education");
const hospitality = require("./hospitality");
const realEstate = require("./realEstate");
const agriculture = require("./agriculture");
const generic = require("./generic");

module.exports = {
    ...financial,
    ...sales,
    ...operations,
    ...inventory,
    ...hr,
    ...manufacturing,
    ...logistics,
    ...banking,
    ...insurance,
    ...healthcare,
    ...education,
    ...hospitality,
    ...realEstate,
    ...agriculture,
    ...generic
};