export interface ProgressItem {
  created_at: string;
  date: string;
  weight: number | null;
}
export interface Progress {
  [date: string]: ProgressItem;
}
