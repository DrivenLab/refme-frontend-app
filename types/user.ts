export type LoginData = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  email: string;
  organizations: any[];
  lastLogin: string;
  isSuperuser: boolean;
  firstName: string;
  lastName: string;
  isActive: boolean;
  dateJoined: string;
  createdAt: string;
  modifiedAt: string;
  username: string;
  role: string;
  profilePicture: any;
  isVerified: boolean;
  groups: any[];
  fullName: string;
};
