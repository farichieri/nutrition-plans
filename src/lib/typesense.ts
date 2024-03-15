import { SearchClient as TypesenseSearchClient } from "typesense";

let TYPESENSE_SERVER_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_TYPESENSE_SEARCH_API_KEY!,
  nodes: [
    {
      host: process.env.NEXT_PUBLIC_TYPESENSE_HOST!,
      port: Number(process.env.NEXT_PUBLIC_TYPESENSE_PORT),
      protocol: process.env.NEXT_PUBLIC_TYPESENSE_PROTOCOL!,
    },
  ],
  numRetries: 8,
};

export const searchClient = new TypesenseSearchClient(TYPESENSE_SERVER_CONFIG);
