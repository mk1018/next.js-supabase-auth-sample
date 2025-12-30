import type { UserProfile } from "@/backend/entity/UserProfile";
import { GetUserProfileUseCase } from "@/backend/use-case/GetUserProfile";
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

describe("GetUserProfileUseCase", () => {
  let mockRepository: jest.Mocked<IUserProfileRepository>;
  let useCase: GetUserProfileUseCase;

  beforeEach(() => {
    mockRepository = {
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    useCase = new GetUserProfileUseCase(mockRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return user profile when found", async () => {
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

    mockRepository.findById.mockResolvedValue(mockProfile);

    const result = await useCase.execute();

    expect(result).toEqual(mockProfile);
    expect(mockRepository.findById).toHaveBeenCalledWith("user-id");
  });

  it("should return null when profile not found", async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: "user-id" } },
    });

    mockRepository.findById.mockResolvedValue(null);

    const result = await useCase.execute();

    expect(result).toBeNull();
    expect(mockRepository.findById).toHaveBeenCalledWith("user-id");
  });

  it("should throw error when user not authenticated", async () => {
    mockGetUser.mockResolvedValue({
      data: { user: null },
    });

    await expect(useCase.execute()).rejects.toThrow("User not authenticated");
  });
});
