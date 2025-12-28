# Supabase

## キー

- NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY：認証のみ。DBへの接続には使用しない。
- SUPABASE_SECRET_KEY：DB操作（接続、参照、追加、更新、削除）のみ。

## 認証クライアント

- フロントエンド: @/infrastructure/database/supabase/client.ts
- サーバーサイド: @/infrastructure/database/supabase/server.ts
- Middleware: @/infrastructure/database/supabase/middleware.ts

## データベース

- 接続はサーバーサイドのSupabaseAdmin（@/infrastructure/database/supabase/admin.ts）で行う
- RLSは設定不要
- Userテーブルは作成しない（SupabaseデフォルトのAuthUserを利用）
- migrationsはSupabase CLIで作成: `supabase migration new <ファイル名>`
