import { CreateUserProfileUseCase } from "@/src/backend/use-case/CreateUserProfile";
import { GetUserProfileUseCase } from "@/src/backend/use-case/GetUserProfile";
import { UserProfileRepository } from "@/src/infrastructure/database/repository/UserProfileRepository";
import { createClient } from "@/src/infrastructure/database/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const repository = new UserProfileRepository(supabase);
    const useCase = new GetUserProfileUseCase(repository);

    const profile = await useCase.execute();

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json(profile);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, birthDate, gender } = body;

    if (!name || !birthDate || !gender) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const repository = new UserProfileRepository(supabase);
    const useCase = new CreateUserProfileUseCase(repository);

    const profile = await useCase.execute({
      name,
      birthDate: new Date(birthDate),
      gender,
    });

    return NextResponse.json(profile, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
