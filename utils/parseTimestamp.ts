import { Timestamp } from "firebase/firestore";

const parseTimestamp = (timestamp: Timestamp) => {
  return JSON.parse(JSON.stringify(timestamp));
};

export default parseTimestamp;
