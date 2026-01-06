import {
  createAdminClient,
  createAnonClient,
  supabaseAnonKey,
  supabaseSecretKey,
  supabaseUrl,
} from "./test-client";

async function getPublicTables(): Promise<string[]> {
  const response = await fetch(`${supabaseUrl}/rest/v1/`, {
    headers: {
      apikey: supabaseSecretKey,
      Authorization: `Bearer ${supabaseSecretKey}`,
    },
  });
  const data = await response.json();
  return Object.keys(data.definitions || {}).filter(
    (name) => !name.startsWith("_") && name !== "rpc"
  );
}

let tables: string[] = [];

beforeAll(async () => {
  tables = await getPublicTables();
  console.log("テスト対象テーブル:", tables);
});

describe("anon key アクセス制限テスト", () => {
  const anonClient = createAnonClient();

  test("全publicテーブルへのアクセスがブロックされる", async () => {
    expect(tables.length).toBeGreaterThan(0);
    for (const tableName of tables) {
      const { error } = await anonClient.from(tableName).select("*").limit(1);
      expect(error?.message).toContain("Anonymous access is not allowed");
    }
  });

  test("auth.admin.listUsers() がブロックされる", async () => {
    const { error } = await anonClient.auth.admin.listUsers();
    expect(error).not.toBeNull();
  });

  test("OpenAPIスキーマ（テーブル一覧）へのアクセスがブロックされる", async () => {
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
    });
    const data = await response.json();
    // definitionsが空またはエラーであることを確認
    expect(data.definitions || {}).toEqual({});
  });

  test("information_schema へのアクセスがブロックされる", async () => {
    const { error } = await anonClient
      .from("information_schema.tables")
      .select("*")
      .limit(1);
    expect(error).not.toBeNull();
  });

  test("pg_catalog へのアクセスがブロックされる", async () => {
    const { error } = await anonClient
      .from("pg_catalog.pg_tables")
      .select("*")
      .limit(1);
    expect(error).not.toBeNull();
  });

  test("auth.users へのアクセスがブロックされる", async () => {
    const { error } = await anonClient.from("auth.users").select("*").limit(1);
    expect(error).not.toBeNull();
  });

  test("storage.buckets へのアクセスがブロックされる", async () => {
    const { error } = await anonClient
      .from("storage.buckets")
      .select("*")
      .limit(1);
    expect(error).not.toBeNull();
  });
});

describe("anon key 認証機能テスト", () => {
  const anonClient = createAnonClient();

  test("signUp APIにアクセスできる", async () => {
    const { error } = await anonClient.auth.signUp({
      email: `test-${Date.now()}@example.com`,
      password: "testpassword123",
    });
    // エラーがないか、rate limitエラーであることを確認（認証API自体は動作している）
    expect(
      error === null ||
        error.message.includes("rate") ||
        error.message.includes("Email") ||
        error.message.includes("already")
    ).toBe(true);
  });

  test("signInWithPassword APIにアクセスできる", async () => {
    const { error } = await anonClient.auth.signInWithPassword({
      email: "nonexistent@example.com",
      password: "wrongpassword",
    });
    // Invalid login credentialsエラーが返る = 認証APIは動作している
    expect(error?.message).toContain("Invalid login credentials");
  });
});

describe("SECRET_KEY アクセステスト", () => {
  const adminClient = createAdminClient();

  test("全publicテーブルにアクセスできる", async () => {
    expect(tables.length).toBeGreaterThan(0);
    for (const tableName of tables) {
      const { error } = await adminClient.from(tableName).select("*").limit(1);
      expect(error).toBeNull();
    }
  });

  test("auth.admin.listUsers() にアクセスできる", async () => {
    const { data, error } = await adminClient.auth.admin.listUsers();
    expect(error).toBeNull();
    expect(data).toBeDefined();
  });
});
