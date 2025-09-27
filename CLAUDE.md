<language>Japanese</language>
<character_code>UTF-8</character_code>

# next.js with supabase auth sample

サンプルコード

## 概要

クリーンアーキテクチャに基づき、スケーラブルで保守性の高い企業レベルのソリューションを提供します。

## 主な機能

### 🏗️ 基盤機能

- **認証システム**: Supabase認証
- **データベース**: Supabase PostgreSQL

### 🎯 コア機能

- **ダッシュボード**: ログイン結果の表示画面

## 技術スタック

- **言語**: TypeScript
- **フレームワーク**: Next.js
- **データベース**: Supabase PostgreSQL
- **認証**: Supabase

## アーキテクチャ

```
src/
├── domain/              # ドメイン層
│   └── repositories/    # リポジトリインターフェース
├── app/                 # アプリケーション層
│   ├── api/             # API
│   │   └── auth/
│   ├── (auth)/
│   └── (etc..)/
├── infrastructure/      # インフラストラクチャ層
│   ├── database/        # データベース
│   │   ├── supabase/    # supabase server api
│   │   └── etc../
│   ├── external-apis/   # 外部API統合
│   │   ├── openai/
│   │   └── etc../
│   └── repository/      # リポジトリ
├── backend/             # バックエンド
│   ├── entity/          # データベースエンティティ
│   └── use-case/        # ユースケース層
├── components/          # フロントエンドのコンポーネント
├── hooks/               # use(hooks)の定義
├── stores/              # ローカルstore
├── middleware.ts        # ミドルウェア
├── types/               # 型定義
├── errors/              # エラークラス
├── utils/               # ユーティリティ
├── log/                 # ユーティリティ
└── __test__/            # テスト
```

```
supabase/            # Supabase
├── migrations/
└── config.toml
```

## セットアップ

### 前提条件

- Node.js 20+
- Docker
- Supabase CLI

# 必須要件

## Supabaseのキーについて

NEXT_PUBLIC_SUPABASE_ANON_KEY：認証のみに使う、データベースへの接続には使用しない。
SUPABASE_SERVICE_ROLE_KEY：データベースの接続、参照、追加、更新、削除のみに使う。

## APIについて

- APIはuse-caseを呼ぶためのエントリーポイントのみを定義すること
- APIでRepositoryのインスタンスを作成し、constructorでuse-caseに渡すこと

```typescript
# 例:
usecase = UserUsecase(
    new UserRepository(db)
)
```

- usecaseでログインユーザーのチェックを行うこと

## 型補正について

`as`を使っての型補正は禁止です、適切な型定義とtype guardを使うこと。
`as any`は禁止です。
`unkown`も禁止です。（設計上必須の場合のみ使用可能です）

## Userについて

- Userテーブルは作成しないこと。
- SupabaseのデフォルトAuthUserテーブルを利用すること。

## データベースについて

- migrationsファイルはsupabaseのCLIで作成すること

```bash
supabase migration new <ファイル名>
例：
supabase migration new create_customers_table
```

- データベースへの接続はサーバーサイドのSupabaseAdminで行うこと
  @/infrastructure/database/supabase/admin.ts
- RLSは設定する必要ありません。

## Supabase認証について

フロントエンド: @/infrastructure/database/supabase/client.ts
サーバーサイド: @/infrastructure/database/supabase/server.ts
Middleware: @/infrastructure/database/supabase/middleware.ts
ANONキーを使用すること。

## テストコードについて

- use-caseは必ずテストコードを作成すること

## コードを修正した場合は必ず以下を実行すること

必ず一つずつ進め、エラーが発生したら解決してから次に進むこと

1. npm run format
2. npm run lint:fix
3. npm run test
4. npm run build
   一つでも失敗した場合は必ずコードを修正すること

## ログについて

- console.logは必ず削除すること。（エラーハンドリングにおけるconsole.error, console.warningは許可する）
- デバッグ用に一時的に作成することのみ許可する。

## PR説明作成

`.github/PULL_REQUEST_TEMPLATE.md` に沿ってPRに記載する内容を `.pr-template.md` に記載してください。
