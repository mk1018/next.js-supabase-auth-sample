import type {
  CreateUserProfileParams,
  UpdateUserProfileParams,
  UserProfile,
} from "@/src/backend/entity/UserProfile";
import type { IUserProfileRepository } from "@/src/domain/repository/IUserProfileRepository";
import type { SupabaseClient } from "@supabase/supabase-js";

type UserProfileRow = {
  id: string;
  name: string;
  birth_date: string;
  gender: string;
  created_at: string;
  updated_at: string;
};

function isValidUserProfileRow(data: unknown): data is UserProfileRow {
  if (typeof data !== "object" || data === null) {
    return false;
  }
  const row = data as Record<string, unknown>;
  return (
    typeof row.id === "string" &&
    typeof row.name === "string" &&
    typeof row.birth_date === "string" &&
    typeof row.gender === "string" &&
    typeof row.created_at === "string" &&
    typeof row.updated_at === "string"
  );
}

function mapRowToEntity(row: UserProfileRow): UserProfile {
  return {
    id: row.id,
    name: row.name,
    birthDate: new Date(row.birth_date),
    gender: row.gender as UserProfile["gender"],
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}

export class UserProfileRepository implements IUserProfileRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async findById(id: string): Promise<UserProfile | null> {
    const { data, error } = await this.supabase
      .from("user_profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return null;
      }
      throw new Error(`Failed to find user profile: ${error.message}`);
    }

    if (!isValidUserProfileRow(data)) {
      throw new Error("Invalid user profile data");
    }

    return mapRowToEntity(data);
  }

  async create(params: CreateUserProfileParams): Promise<UserProfile> {
    const { data, error } = await this.supabase
      .from("user_profiles")
      .insert({
        id: params.id,
        name: params.name,
        birth_date: params.birthDate.toISOString().split("T")[0],
        gender: params.gender,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create user profile: ${error.message}`);
    }

    if (!isValidUserProfileRow(data)) {
      throw new Error("Invalid user profile data");
    }

    return mapRowToEntity(data);
  }

  async update(
    id: string,
    params: UpdateUserProfileParams
  ): Promise<UserProfile> {
    const updateData: Record<string, unknown> = {};

    if (params.name !== undefined) {
      updateData.name = params.name;
    }
    if (params.birthDate !== undefined) {
      updateData.birth_date = params.birthDate.toISOString().split("T")[0];
    }
    if (params.gender !== undefined) {
      updateData.gender = params.gender;
    }

    const { data, error } = await this.supabase
      .from("user_profiles")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update user profile: ${error.message}`);
    }

    if (!isValidUserProfileRow(data)) {
      throw new Error("Invalid user profile data");
    }

    return mapRowToEntity(data);
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase
      .from("user_profiles")
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(`Failed to delete user profile: ${error.message}`);
    }
  }
}
