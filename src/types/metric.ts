// export type Metric = {
//   id: string;
//   title: string;
//   maxScore: number;
// };


export interface Metric {
  id: string;
  title: string;
  maxScore: number;
  isTemp?: boolean; // 👈 important
}
