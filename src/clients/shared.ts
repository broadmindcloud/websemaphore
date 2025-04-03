
const apiUrl = (protocol: string, stage: string, prefix?: string) => {
    return `${protocol}://${prefix || ""}api-${stage}.websemaphore.com/v1`
};

const DEFAULT_REGION = "eu";

const stages = [
    "dev",
    "prod",
    "eu-dev",
    "eu-prod",
    "us-dev",
    "us-prod"
];
const actualStage = (stage: (typeof stages)[number]) => ["dev", "prod"].includes(stage) ? (DEFAULT_REGION + "-" + stage) : stage;

export const WebSemaphoreApiUrl = (stage: string) => stages.includes(stage) && apiUrl("https", actualStage(stage));
export const WebSemaphoreWebsocketsUrl = (stage: string) => stages.includes(stage) && apiUrl("wss", actualStage(stage), "ws");

// export const ChainstreamBaseUrls = stages.reduce((urls, stage) => apiUrl("https", actualStage(stage)));
// export const ChainstreamWebsocketsServers = zip(stages, stages.map(stage => apiUrl("wss", actualStage(stage), "wsapi")))

// export const ChainstreamBaseUrls: Record<string, string> = {
//   "dev": "https://api-eu-dev.websemaphore.com/v1",
//   "prod": "https://api.websemaphore.com/v1",
//   "us-dev": apiUrl("us-dev"),
//   "us-dev": "https://api-us-dev.websemaphore.com/v1", //"https://api-eu-dev.websemaphore.com/v1",
//   "us-prod": "https://api-us.websemaphore.com/v1",
// };

// export const ChainstreamWebsocketsServers: Record<string, string> = {
//     "dev": "wss://wsapi-eu-dev.websemaphore.com/v1",
//     "prod": "wss://wsapi.websemaphore.com/v1",
//     "us-dev": "wss://wsapi-us-dev.websemaphore.com/v1",
//     "us-prod": "wss://wsapi-us.websemaphore.com/v1"
// };