import type {
  CreateUserProfileParams,
  UserProfile,
} from "@/src/backend/entity/UserProfile";
import type { IUserProfileRepository } from "@/src/domain/repository/IUserProfileRepository";
import { createClient } from "@/src/infrastructure/database/supabase/server";

export class CreateUserProfileUseCase {
  constructor(private readonly repository: IUserProfileRepository) {}

  async execute(
    params: Omit<CreateUserProfileParams, "id">
  ): Promise<UserProfile> {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not authenticated");
    }

    return await this.repository.create({
      id: user.id,
      ...params,
    });
  }
}
