const BASE = "http://localhost:4000";

/* CREATE */
export const createPlan = async (payload: any) => {
  const res = await fetch(`${BASE}/plans`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Create plan failed");
  return res.json();
};

/* FETCH ALL */
export const fetchPlans = async () => {
  const res = await fetch(`${BASE}/plans`);
  if (!res.ok) throw new Error("Fetch plans failed");
  return res.json();
};
