const xml2js = require("xml2js");

const builder = new xml2js.Builder({ headless: true });
const parser = new xml2js.Parser({ explicitArray: false });

function json2xml(obj) {
    return builder.buildObject(obj);
}

async function xml2json(xml) {
    return parser.parseStringPromise(xml);
}

module.exports = { json2xml, xml2json };
