import type {
  CreateUserProfileParams,
  UpdateUserProfileParams,
  UserProfile,
} from "@/backend/entity/UserProfile";

export interface IUserProfileRepository {
  findById(id: string): Promise<UserProfile | null>;
  create(params: CreateUserProfileParams): Promise<UserProfile>;
  update(id: string, params: UpdateUserProfileParams): Promise<UserProfile>;
  delete(id: string): Promise<void>;
}
