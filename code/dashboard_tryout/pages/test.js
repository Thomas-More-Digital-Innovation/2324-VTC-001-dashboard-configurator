// const { countUniqueColumnValues } = require("./csv_parser.js");

// async function Test() {
//     const data = await countUniqueColumnValues("./dataset_dd.csv", 'JAAR')
//     console.log(data)
// }

// Test();

const { countUniqueColumnValues } = require("./csv_parser.js");

async function Test() {
    const data = await countUniqueColumnValues("./dataset_dd.csv", 'JAAR')
    return data;
}

async function main() {
    const data = await Test();
    const b = 7;
    console.log(data);
    console.log(b);
}

main();