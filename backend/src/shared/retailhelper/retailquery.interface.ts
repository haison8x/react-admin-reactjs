export interface RetailQuery {
  filter: Record<string, unknown>;
  sort: string[];
  range: number[];
}
