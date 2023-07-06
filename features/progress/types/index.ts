export interface ProgressItem {
  createdAt: string;
  date: string;
  weightInKg: number | null;
}
export interface Progress {
  [date: string]: ProgressItem;
}

export interface ProgressArray extends Array<ProgressItem> {}

// initial
export const newProgressItem: ProgressItem = {
  createdAt: "",
  date: "",
  weightInKg: null,
};
