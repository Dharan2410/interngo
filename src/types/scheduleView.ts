export interface ScheduleView {
  internId: string;
  internName: string;
  internEmail?: string;

  interactionId: string;
  interactionName: string;

  mentorId?: string;
  mentorName?: string;

  interviewerId?: string;
  interviewerName?: string;

  date?: string;
  time?: string;
  duration?: number;

  status?: "scheduled" | "completed" | "feedback_pending";
  feedbackStatus?: "pending" | "completed";
}
