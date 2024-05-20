import { Organization } from "./organization";

export type LoginData = {
  email: string;
  password: string;
};

export type NewPasswordType = {
  new_password: string;
  repeat_password: string;
};

export type User = {
  id: number;
  email: string;
  organizations: Organization[];
  lastLogin: any;
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
export type CreateProfile = {
  birthdate: string;
  gender: string;
  passport: string;
  nationality: string;
  phoneNumber: string;
  address: string;
  weight: 0;
  height: 0;
  medicalExpiration: string;
  medicalObservations: string;
};
export type Profile = CreateProfile & {
  id: number;
  genderName: string;
  age: number;
  createdAt: string;
  modifiedAt: string;
  isActive: boolean;
  fifaEntryYear: number;
  memberType: string;
  expirationMedicalRecord: string;
  countries: string;
  isVerified: boolean;
  userOrganization: number;
  category: number;
};
