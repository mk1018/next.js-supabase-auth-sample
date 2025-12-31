# Commit and Push

新しいブランチを作成し、変更をコミットしてプッシュします。

## 手順

1. **ブランチの作成**
   - 現在のブランチ状況を確認
   - ユーザーに新しいブランチ名を確認（提案する場合は feature/xxx, fix/xxx, docs/xxx などのプレフィックスを使用）
   - main ブランチから新しいブランチを作成（必要に応じて main を最新化）

2. **変更のコミット**
   - git status で変更内容を確認
   - git diff で差分を確認
   - 変更内容に応じた適切なコミットメッセージを作成
   - 変更をステージングしてコミット
   - コミットメッセージには以下を含める：
     - 簡潔な変更内容の要約
     - フッターに以下を追加：
       ```
       🤖 Generated with [Claude Code](https://claude.com/claude-code)

       Co-Authored-By: Claude <noreply@anthropic.com>
       ```

3. **リモートへのプッシュ**
   - git push -u origin <branch-name> でリモートにプッシュ
   - プッシュ後の状態を確認

## 注意事項

- ブランチ名は機能や修正内容がわかるように命名する
- コミット前に必ず変更内容を確認する
- .env や credentials.json などの機密情報をコミットしないよう注意する
- main ブランチがベースブランチであることを確認する
