import {Template} from "@app/models/templates/template.model";
import {
    ASYNCAPI_2_TEMPLATES,
    AVRO_TEMPLATES,
    JSON_TEMPLATES,
    OPENAPI_2_TEMPLATES,
    OPENAPI_3_TEMPLATES,
    PROTOBUF_TEMPLATES
} from "@app/services/_templates";
import {ArtifactTypes} from "@app/models";


async function getTemplatesFor(type: string, version?: string): Promise<Template[]> {
    if (type === ArtifactTypes.AVRO) {
        return Promise.resolve(AVRO_TEMPLATES);
    }
    if (type === ArtifactTypes.PROTOBUF) {
        return Promise.resolve(PROTOBUF_TEMPLATES);
    }
    if (type === ArtifactTypes.JSON) {
        return Promise.resolve(JSON_TEMPLATES);
    }
    if (type === ArtifactTypes.ASYNCAPI) {
        return Promise.resolve(ASYNCAPI_2_TEMPLATES);
    }
    if (type === ArtifactTypes.OPENAPI) {
        if (version && version.startsWith("3")) {
            return Promise.resolve(OPENAPI_3_TEMPLATES);
        } else {
            return Promise.resolve(OPENAPI_2_TEMPLATES);
        }
    }
    return Promise.reject(`No templates found for type ${type} and version ${version}.`);
}

async function getTemplate(id: string): Promise<Template> {
    return Promise.resolve(
        OPENAPI_3_TEMPLATES[0]
    );
}


/**
 * The Templates Service interface.
 */
export interface TemplatesService {
    getTemplatesFor(type: string, version?: string): Promise<Template[]>;
    getTemplate(id: string): Promise<Template>;
}


/**
 * React hook to get the Templates service.
 */
export const useTemplatesService: () => TemplatesService = (): TemplatesService => {
    return {
        getTemplatesFor,
        getTemplate,
    };
};
