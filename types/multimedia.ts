export interface Video {
  id: number;
  video: string;
  createdAt: string;
  modifiedAt: string;
  isActive: boolean;
  topic: string;
  usageType: string;
  answer1: string;
  answer2: string;
  answer3: any;
  isApproved: boolean;
  media: number;
  organization: number;
}
