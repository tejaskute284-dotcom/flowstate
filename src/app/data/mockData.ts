export interface Email {
    id: string;
    sender: string;
    subject: string;
    preview: string;
    time: string;
    intent: 'action' | 'meeting' | 'fyi';
    hasMeetingLink?: boolean;
    threadContent?: string;
}

export interface Meeting {
    id: string;
    title: string;
    startTime: string;
    endTime: string;
    attendees: number;
    emailContext?: {
        sender: string;
        promise: string;
    };
    hasConflict?: boolean;
    conflictMessage?: string;
}

export const actionEmails: Email[] = [
    {
        id: '1',
        sender: 'Prasad Kulkarni',
        subject: 'Budget Approval Needed - Q2 Planning',
        preview: 'Can you review and approve the Q2 budget by end of day? We need to submit to finance...',
        time: '2:34 PM',
        intent: 'action',
        hasMeetingLink: true,
        threadContent: "Hi team, I need your approval on the Q2 budget proposal. We've allocated 40% for engineering, 30% for marketing, and 30% for operations. Please review the attached spreadsheet and let me know if you have any concerns. We need to submit this to finance by EOD today to stay on schedule.",
    },
    {
        id: '2',
        sender: 'Manasvi Sharma',
        subject: 'Design Review Tomorrow',
        preview: "Quick reminder about tomorrow's design review at 2 PM. I've shared the latest mockups...",
        time: '1:15 PM',
        intent: 'action',
        hasMeetingLink: true,
        threadContent: "Hey everyone, just a reminder that we have the design review scheduled for tomorrow at 2 PM. I've shared the latest mockups in Figma. Please take a look before the meeting so we can have a productive discussion. Looking forward to your feedback!",
    },
    {
        id: '3',
        sender: 'Kartik Desai',
        subject: 'Urgent: Production Issue',
        preview: "We're seeing elevated error rates in production. Need your input on the database optimization...",
        time: '12:45 PM',
        intent: 'action',
        threadContent: "Team, we have an urgent situation. Our production database is showing elevated error rates (5% vs normal 0.1%). The issue started around 11:30 AM. Initial investigation suggests it might be related to the new indexing we deployed yesterday. Can you review the query patterns and suggest optimizations? This is affecting customer experience.",
    },
];

export const meetingRelatedEmails: Email[] = [
    {
        id: '4',
        sender: 'Riya Patel',
        subject: 'Weekly Standup Notes',
        preview: "Here are the notes from this morning's standup. Key action items highlighted...",
        time: '11:00 AM',
        intent: 'meeting',
        hasMeetingLink: true,
    },
];

export const meetings: Meeting[] = [
    {
        id: 'm1',
        title: 'Design Review',
        startTime: '2:00 PM',
        endTime: '3:00 PM',
        attendees: 5,
        emailContext: {
            sender: 'Manasvi Sharma',
            promise: 'You promised: Review designs before meeting',
        },
        hasConflict: false,
    },
    {
        id: 'm2',
        title: 'Q2 Budget Discussion',
        startTime: '3:30 PM',
        endTime: '4:30 PM',
        attendees: 8,
        emailContext: {
            sender: 'Prasad Kulkarni',
            promise: 'Approval needed by EOD',
        },
        hasConflict: true,
        conflictMessage: 'Overlaps with focus time',
    },
    {
        id: 'm3',
        title: 'Engineering Sync',
        startTime: '4:45 PM',
        endTime: '5:30 PM',
        attendees: 12,
        emailContext: {
            sender: 'Kartik Desai',
            promise: 'Need your input on database optimization',
        },
        hasConflict: false,
    },
];
