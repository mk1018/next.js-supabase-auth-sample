import type { UserProfile } from "@/backend/entity/UserProfile";
import { CreateUserProfileUseCase } from "@/backend/use-case/CreateUserProfile";
import type { IUserProfileRepository } from "@/domain/repository/IUserProfileRepository";

const mockGetUser = jest.fn();

// Mock Supabase client
jest.mock("@/infrastructure/database/supabase/server", () => ({
  createClient: jest.fn(() => ({
    auth: {
      getUser: mockGetUser,
    },
  })),
}));

describe("CreateUserProfileUseCase", () => {
  let mockRepository: jest.Mocked<IUserProfileRepository>;
  let useCase: CreateUserProfileUseCase;

  beforeEach(() => {
    mockRepository = {
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    useCase = new CreateUserProfileUseCase(mockRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create user profile successfully", async () => {
    const mockProfile: UserProfile = {
      id: "user-id",
      name: "Test User",
      birthDate: new Date("1990-01-01"),
      gender: "male",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockGetUser.mockResolvedValue({
      data: { user: { id: "user-id" } },
    });

    mockRepository.create.mockResolvedValue(mockProfile);

    const result = await useCase.execute({
      name: "Test User",
      birthDate: new Date("1990-01-01"),
      gender: "male",
    });

    expect(result).toEqual(mockProfile);
    expect(mockRepository.create).toHaveBeenCalledWith({
      id: "user-id",
      name: "Test User",
      birthDate: new Date("1990-01-01"),
      gender: "male",
    });
  });

  it("should throw error when user not authenticated", async () => {
    mockGetUser.mockResolvedValue({
      data: { user: null },
    });

    await expect(
      useCase.execute({
        name: "Test User",
        birthDate: new Date("1990-01-01"),
        gender: "male",
      })
    ).rejects.toThrow("User not authenticated");
  });
});
