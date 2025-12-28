# コーディングルール

## API

- APIはuse-caseを呼ぶエントリーポイントのみ
- APIでRepositoryインスタンスを作成し、use-caseのconstructorに渡す
- usecaseでログインユーザーチェックを行う

## 型

- `as`による型補正禁止（type guardを使う）
- `as any`禁止
- `unknown`禁止（設計上必須の場合のみ可）

## ログ

- console.log禁止（デバッグ用の一時的使用のみ可）
- console.error, console.warningはエラーハンドリングで許可

## テスト

- use-caseは必ずテストコードを作成

## コード修正時の必須手順

1. pnpm format
2. pnpm lint
3. pnpm test
4. pnpm build

エラー発生時は解決してから次へ進む。

## PR

`.github/PULL_REQUEST_TEMPLATE.md` に沿って `.pr-template.md` に記載。
