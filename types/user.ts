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

export type Profile = {
  id: number;
  genderName: string;
  age: number;
  createdAt: string;
  modifiedAt: string;
  isActive: boolean;
  birthdate: string;
  fifaEntryYear: number;
  memberType: string;
  gender: string;
  passport: string;
  phoneNumber: string;
  address: string;
  weight: number;
  height: number;
  expirationMedicalRecord: string;
  medicalObservations: string;
  countries: string;
  isVerified: boolean;
  userOrganization: number;
  category: number;
};
