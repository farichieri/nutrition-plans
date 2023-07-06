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
//       "name": "name",
//       "drop": true
//     },
//     {
//       "name": "description",
//       "drop": true
//     },
//     {
//       "name": "ingredientsNames",
//       "drop": true
//     },
//     {
//       "name": "ingredientsDescriptions",
//       "drop": true
//     },
//     {
//       "name": "isCurated",
//       "drop": true
//     },
//     {
//       "name": "uploaderID",
//       "drop": true
//     },
//     {
//       "name": "kind",
//       "drop": true
//     },
//     {
//       "name": "imageURL",
//       "drop": true
//     },
//     {
//       "name": "compatiblePlans",
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
//       "name": "name",
//       "type": "string",
//       "optional": false,
//       "facet": false
//     },
//     {
//       "name": "description",
//       "type": "string",
//       "optional": false,
//       "facet": false
//     },
//     {
//       "name": "ingredientsNames",
//       "type": "string[]",
//       "optional": false,
//       "facet": false
//     },
//     {
//       "name": "ingredientsDescriptions",
//       "type": "string[]",
//       "optional": false,
//       "facet": false
//     },
//     {
//       "name": "isCurated",
//       "type": "bool",
//       "optional": false,
//       "facet": true
//     },
//     {
//       "name": "uploaderID",
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
//       "name": "imageURL",
//       "type": "string",
//       "optional": false,
//       "facet": false
//     },
//     {
//       "name": "compatiblePlans",
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
//       "name": "likes",
//       "type": "int32",
//       "optional": false,
//       "facet": true
//     },
//   ]
// }

// id,name,description,ingredientsNames,ingredientsDescriptions,isCurated,uploaderID,kind,nutrients,imageURL,compatiblePlans,likes
