import type { UserProfile } from "@/src/backend/entity/UserProfile";
import type { IUserProfileRepository } from "@/src/domain/repository/IUserProfileRepository";
import { createClient } from "@/src/infrastructure/database/supabase/server";

export class GetUserProfileUseCase {
  constructor(private readonly repository: IUserProfileRepository) {}

  async execute(): Promise<UserProfile | null> {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not authenticated");
    }

    return await this.repository.findById(user.id);
  }
}
