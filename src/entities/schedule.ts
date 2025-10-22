export type WeekCycle = 'Z1' | 'Z2' | 'WEEKLY'; 

export interface WeekRange {
  fromKw: number; 
  toKw?: number;  
  year: number; 
}

export interface MeetingPattern {
  weekday: 1|2|3|4|5|6|0;    
  start: string;             
  end: string;             
  cycle: WeekCycle;          
  range: WeekRange;      
}

export interface Attachment {
  id: string;
  name: string;
  mime: string;
  size?: number;
  url?: string; 
  createdAt: string; 
}

export interface Subject {
  id: string;
  title: string;
  color?: string; 
  description?: string;
  attachments?: Attachment[];
  patterns: MeetingPattern[]; 
}

export interface Occurrence {
  id: string;      
  subjectId: string;
  title: string;
  start: Date;
  end: Date;
  attended?: boolean;
}
