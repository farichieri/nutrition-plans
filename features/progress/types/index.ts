export interface ProgressItem {
  created_at: string;
  date: string;
  weight_in_kg: number | null;
}
export interface Progress {
  [date: string]: ProgressItem;
}

export interface ProgressArray extends Array<ProgressItem> {}

// initial
export const newProgressItem: ProgressItem = {
  created_at: "",
  date: "",
  weight_in_kg: null,
};
