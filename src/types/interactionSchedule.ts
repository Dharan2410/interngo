// export interface ScheduleData {
//   internId: string;
//   internName: string;
//   internEmail?: string;

//   interactionName: string;

//   mentorId?: string;
//   mentorName?: string;

//   interviewerId?: string;
//   interviewerName?: string;

//   date?: string;
//   time?: string;
//   duration?: number;

//   scheduled?: boolean;
// }




export interface ScheduledInteraction {
  id?: string;

  internId: string;
  internName: string;
  internEmail: string;

  mentorId: string;
  interviewerId: string;

  interactionId: string;        // 🔥 REQUIRED
  interactionName: string;

  date: string;
  time: string;
  duration: number;
  mode?: "online" | "offline";

  status: "scheduled" | "completed" | "feedback_pending";
  feedbackStatus: "pending" | "completed";
}
