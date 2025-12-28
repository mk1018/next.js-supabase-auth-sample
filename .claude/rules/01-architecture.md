# アーキテクチャ

クリーンアーキテクチャに基づく構成。

## 技術スタック

- TypeScript / Next.js
- Supabase PostgreSQL / Supabase Auth

## ディレクトリ構成

```bash
src/
├── domain/              # ドメイン層（リポジトリインターフェース）
├── app/                 # アプリケーション層（API、ページ）
├── infrastructure/      # インフラストラクチャ層（DB、外部API、リポジトリ実装）
├── backend/             # バックエンド（entity、use-case）
├── components/          # フロントエンドコンポーネント
├── hooks/               # use(hooks)の定義
├── stores/              # ローカルstore
├── types/               # 型定義
├── errors/              # エラークラス
├── utils/               # ユーティリティ
└── __test__/            # テスト

supabase/
├── migrations/
└── config.toml
```
