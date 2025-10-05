# サンプル

Supabaseを使った認証のサンプル

## コンセプト

Next.js + Supabase Authで認証機能を実装するサンプルです。
主に、ANONキーとサービスロールキーの使い分けを示しています。

### キーの使い方

`NEXT_PUBLIC_SUPABASE_ANON_KEY` は全てのデータベースの操作権限を剥奪し認証のみで利用
`SUPABASE_SERVICE_ROLE_KEY` を使いAPI経由でデータベースの参照、更新を行う

### Migrationについて

Supabaseのデフォルトの設定では、ANONキーでデータベースの参照、更新が可能なためです。
これをそのまま公開するわけにはいきません。
そのため、`20250726100854_revoke_anon_privileges.sql`でANONキーのデータベース操作権限を剥奪しています。

## 使い方

### 依存関係のインストール

```bash
npm install
```

### Supabaseの起動

```bash
supabase start
```

### 環境変数

`.env.local`を作成し、以下の環境変数を設定します。

Supabaseの起動で表示されたURLとANONキー、サービスロールキーを設定してください。

```plaintext
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54322
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### サーバー起動

```bash
npm run dev
```
