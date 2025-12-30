export type Gender = "male" | "female" | "other";

export interface UserProfile {
  id: string;
  name: string;
  birthDate: Date;
  gender: Gender;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserProfileParams {
  id: string;
  name: string;
  birthDate: Date;
  gender: Gender;
}

export interface UpdateUserProfileParams {
  name?: string;
  birthDate?: Date;
  gender?: Gender;
}
