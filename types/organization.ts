export interface Organization {
  id: number;
  createdAt: string;
  modifiedAt: string;
  isActive: boolean;
  name: string;
  initials: string;
  maxMembers: number;
  contactName: string;
  contactLastName: string;
  contactEmail: string;
  logoLink: string;
  isVerified: boolean;
}
