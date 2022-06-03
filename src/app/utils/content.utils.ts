import YAML from "yaml";
import {IParserResult, parse} from "protobufjs";

/**
 * Returns true if the given content is JSON formatted.
 * @param content the content to check
 */
export function isJson(content: string): boolean {
    try {
        JSON.parse(content);
        return true;
    } catch (e) {
        return false;
    }
}
export function parseJson(content: string): any {
    return JSON.parse(content);
}


/**
 * Returns true if the given content is YAML formatted.
 * @param content the content to check
 */
export function isYaml(content: string): boolean {
    try {
        const result: any = YAML.parse(content);
        if (typeof result === "object") {
            return true;
        }
    } catch (e) {
    }
    return false;
}
export function parseYaml(content: string): any {
    return YAML.parse(content);
}

/**
 * Returns true if the given content is XML formatted.
 * @param content the content to check
 */
export function isXml(content: string): boolean {
    try {
        const xmlParser: DOMParser = new DOMParser();
        const dom: Document = xmlParser.parseFromString(content, "application/xml");
        const isParseError: boolean = dom.getElementsByTagName("parsererror").length !== 0;
        return !isParseError;
    } catch (e) {
        return false;
    }
}

function isXmlWithRootNode(content: string, namespace: string, localName: string): boolean {
    try {
        const xmlParser: DOMParser = new DOMParser();
        const dom: Document = xmlParser.parseFromString(content, "application/xml");
        const isParseError: boolean = dom.getElementsByTagName("parsererror").length !== 0;
        return !isParseError &&
               dom.documentElement.namespaceURI === namespace &&
               dom.documentElement.localName === localName;
    } catch (e) {
        return false;
    }
}
export function isWsdl(content: string): boolean {
    return isXmlWithRootNode(content, "http://schemas.xmlsoap.org/wsdl/", "definitions");
}
export function isXsd(content: string): boolean {
    return isXmlWithRootNode(content, "http://www.w3.org/2001/XMLSchema", "schema");
}


/**
 * Returns true if the given content is PROTO formatted.
 * @param content the content to check
 */
export function isProto(content: string): boolean {
    try {
        const result: IParserResult = parse(content);
        return true;
    } catch (e) {
        return false;
    }
}