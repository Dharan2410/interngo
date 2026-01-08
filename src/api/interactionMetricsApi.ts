



// import type { InteractionMetricDefinition } from "../types/interaction";

// const BASE = "http://localhost:4000/metricDefinitions";

// export const fetchMetrics = async () => {
//   const res = await fetch(BASE);
//   return res.json();
// };

// export const createMetric = async (
//   data: InteractionMetricDefinition
// ) => {
//   const res = await fetch(BASE, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   return res.json();
// };

// export const updateMetric = async (
//   id: string,
//   data: InteractionMetricDefinition
// ) => {
//   const res = await fetch(`${BASE}/${id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   return res.json();
// };

// export const deleteMetric = async (id: string) => {
//   await fetch(`${BASE}/${id}`, {
//     method: "DELETE",
//   });
// };
