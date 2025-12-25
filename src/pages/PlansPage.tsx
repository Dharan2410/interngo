// import { useEffect, useState } from "react";
// import { createPlan, fetchPlans } from "../../api/plansApi";
// import CreatePlanCard from "./CreatePlanCard";
// import PlanCard from "./PlanCard";
// import CreatePlanModal from "./CreatePlanModal";
// import toast from "react-hot-toast";

// const PlansPage = () => {
//   const [plans, setPlans] = useState<any[]>([]);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     fetchPlans().then(setPlans);
//   }, []);

//   const savePlan = async (data: any) => {
//     const saved = await createPlan(data);
//     setPlans((p) => [...p, saved]);
//     toast.success("Plan created successfully");
//     setOpen(false);
//   };

//   return (
//     <>
//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         <CreatePlanCard onClick={() => setOpen(true)} />

//         {plans.map((p) => (
//           <PlanCard key={p.id} plan={p} />
//         ))}
//       </div>

//       <CreatePlanModal
//         open={open}
//         onClose={() => setOpen(false)}
//         onSave={savePlan}
//       />
//     </>
//   );
// };

// export default PlansPage;
