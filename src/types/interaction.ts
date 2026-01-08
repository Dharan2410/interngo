


// export type Metric = {
//   title: string;
//   maxScore: number;
// };

// export type InteractionMetricDefinition = {
//   id?: string;
//   name: string;
//   metrics: Metric[];
// };



export type Interaction = {
  id?: string;
  name: string;
  year: string;
  batch: string;
  metricIds: string[]; 
  createdAt?: string;
};
