# テストルール

## テスト対象

- use-caseは必ずテストコードを作成

## テストファイル配置

- テストファイルは `src/__test__/` に配置
- ディレクトリ構造は実装ファイルと同じ構造を維持
  - 例: `src/backend/use-case/GetUserProfile.ts` → `src/__test__/use-case/GetUserProfile.test.ts`

## ファイル名

- テストファイル名は実装ファイル名に `.test.ts` を付ける
- PascalCase を使用（実装ファイルと同じ命名規則）
  - 例: `GetUserProfile.test.ts`, `CreateUserProfile.test.ts`

## モックの作成

- 外部依存（Supabase、APIなど）は jest.mock でモック化
- モック関数は describe ブロックの外で定義

  ```typescript
  const mockGetUser = jest.fn();

  jest.mock("@/infrastructure/database/supabase/server", () => ({
    createClient: jest.fn(() => ({
      auth: {
        getUser: mockGetUser,
      },
    })),
  }));
  ```

## テストケース

### 必須テストケース

1. **正常系**: 期待通りの動作を確認
2. **異常系**: エラーハンドリングを確認
3. **認証エラー**: ユーザー未認証時の動作を確認（認証が必要な場合）

### テストの構成

```typescript
describe("UseCaseName", () => {
  let mockRepository: jest.Mocked<IRepository>;
  let useCase: UseCaseName;

  beforeEach(() => {
    // モックの初期化
    mockRepository = {
      method1: jest.fn(),
      method2: jest.fn(),
    };
    useCase = new UseCaseName(mockRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should ...", async () => {
    // テストケース
  });
});
```

## アサーション

- 戻り値の検証: `expect(result).toEqual(expected)`
- 関数呼び出しの検証: `expect(mock).toHaveBeenCalledWith(args)`
- エラーの検証: `expect(fn).rejects.toThrow("error message")`
