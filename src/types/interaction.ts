// export type Metric = {
//   title: string;
//   maxScore: number;
// };

// export type InteractionMetricDefinition = {
//   id?: string; // json-server uses id
//   name: string;
//   metrics: Metric[];
// };



export type Metric = {
  title: string;
  maxScore: number;
};

export type InteractionMetricDefinition = {
  id?: string;
  name: string;
  metrics: Metric[];
};
