# 相談スタジオ (MVP)

訪問看護の現役看護師が、匿名で状況整理をサポートするインタラクティブ相談Web。
診断・治療は行わず、必要な窓口への案内に限定しています。

## 特徴
- ピンク基調 + 清潔感のカードUI / 進行バー
- 1分チェックイン / 相談フロー / 相談ルーム
- 緊急フラグ表示 (119/110)
- Supabase Auth + Postgres + Realtime
- RLS有効 / 匿名セッション (Supabase匿名ログイン)
- Netlifyデプロイ前提

## セットアップ

### 1. 依存関係
```bash
npm install
```

### 2. 環境変数
`.env.example` を `.env.local` にコピーし、Supabaseの値を設定します。

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_BASE_URL=http://localhost:3000
ADMIN_API_KEY=任意
```

### 3. Supabaseセットアップ
`supabase/schema.sql` をSQLエディタで実行し、RLSとポリシーを作成します。
`supabase/seed.sql` は任意で実行してください。

**匿名セッション**
- クライアント側で `signInAnonymously()` を使っています。
- 相談継続用に `localStorage.anonymousKey` にユーザーIDを保存します。

### 4. 開発サーバー
```bash
npm run dev
```

## ページ構成
- `/` LP
- `/checkin` 1分チェックイン
- `/consult` 対話型相談
- `/room/[id]` 相談ルーム (リアルタイム)
- `/resources` ナレッジ
- `/pricing` 料金
- `/admin` 管理 (Supabase Auth)

## Netlifyデプロイ
1. `netlify.toml` をリポジトリ直下に配置済み
2. Netlifyで環境変数を設定
3. Build command: `npm run build`
4. Publish directory: `.next`

## セキュリティ
- RLS有効 (Supabase)
- 入力サニタイズ (簡易)
- レート制限 (簡易, in-memory)
- 簡易CAPTCHA (チェックイン)
- CSP/基本ヘッダ (next.config)

> NOTE: レート制限はサーバレス環境では永続化されません。Redis等へ移行してください。

## E2Eテスト (Playwright)
```bash
npm run test:e2e
```

## 安全なテンプレ文言
`lib/data/templates.ts` に受診勧奨・緊急・制度案内のテンプレを用意しています。

## 注意
- 医療行為・診断・治療の断定は行いません。
- 緊急時は119/110へ案内する導線を常設しています。
