import { SearchClient as TypesenseSearchClient } from "typesense"; // To get the total number of docs

let TYPESENSE_SERVER_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_TYPESENSE_SEARCH_API_KEY!, // Be sure to use an API key that only allows searches, in production
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

// {
//   "fields": [
//     {
//       "name": "food_name",
//       "drop": true
//     },
//     {
//       "name": "food_description",
//       "drop": true
//     },
//     {
//       "name": "ingredients_names",
//       "drop": true
//     },
//     {
//       "name": "ingredients_descriptions",
//       "drop": true
//     },
//     {
//       "name": "curated",
//       "drop": true
//     },
//     {
//       "name": "uploader_id",
//       "drop": true
//     },
//     {
//       "name": "kind",
//       "drop": true
//     },
//     {
//       "name": "image",
//       "drop": true
//     },
//     {
//       "name": "compatible_plans",
//       "drop": true
//     },
//     {
//       "name": "nutrients.calories",
//       "drop": true
//     },
//     {
//       "name": "nutrients.carbohydrates",
//       "drop": true
//     },
//     {
//       "name": "nutrients.proteins",
//       "drop": true
//     },
//     {
//       "name": "nutrients.fats",
//       "drop": true
//     },

//     {
//       "name": "food_name",
//       "type": "string",
//       "optional": false,
//       "facet": false
//     },
//     {
//       "name": "food_description",
//       "type": "string",
//       "optional": false,
//       "facet": false
//     },
//     {
//       "name": "ingredients_names",
//       "type": "string[]",
//       "optional": false,
//       "facet": false
//     },
//     {
//       "name": "ingredients_descriptions",
//       "type": "string[]",
//       "optional": false,
//       "facet": false
//     },
//     {
//       "name": "curated",
//       "type": "bool",
//       "optional": false,
//       "facet": true
//     },
//     {
//       "name": "uploader_id",
//       "type": "string",
//       "optional": false,
//       "facet": true
//     },
//     {
//       "name": "kind",
//       "type": "string",
//       "optional": false,
//       "facet": true
//     },
//     {
//       "name": "image",
//       "type": "string",
//       "optional": false,
//       "facet": false
//     },
//     {
//       "name": "compatible_plans",
//       "type": "object",
//       "optional": false,
//       "facet": true
//     },
//     {
//       "name": "nutrients.calories",
//       "type": "float",
//       "optional": false,
//       "facet": true
//     },
//     {
//       "name": "nutrients.carbohydrates",
//       "type": "float",
//       "optional": false,
//       "facet": true
//     },
//     {
//       "name": "nutrients.fats",
//       "type": "float",
//       "optional": false,
//       "facet": true
//     },
//     {
//       "name": "nutrients.proteins",
//       "type": "float",
//       "optional": false,
//       "facet": true
//     },
//     {
//       "name": "num_likes",
//       "type": "int32",
//       "optional": false,
//       "facet": true
//     },
//   ]
// }
