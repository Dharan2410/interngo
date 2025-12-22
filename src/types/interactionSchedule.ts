export interface ScheduleData {
  internId: string;
  internName: string;
  internEmail?: string;

  interactionName: string;

  mentorId?: string;
  mentorName?: string;

  interviewerId?: string;
  interviewerName?: string;

  date?: string;
  time?: string;
  duration?: number;

  scheduled?: boolean;
}
