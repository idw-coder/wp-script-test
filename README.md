# WordPress React Plugin

React + TypeScript + Tailwind CSS で作るWordPressプラグイン

## セットアップ

```bash
npm install
npm run build
```

WordPressでプラグインを有効化

## 使用方法

投稿・ページに以下を記述：
```
[my_react_app]
```

## コマンド

wp-scripts は @wordpress/scripts パッケージに含まれているコマンドラインツールです
package.json の scripts セクションに定義することで使用できます
wp-scripts が自動的に Tailwind CSS を処理

```bash
# 開発時 ホットリロード（ブラウザの自動更新）
npm run start

# ビルド
npm run build
```

## ファイル構成

```
├── src/
│   ├── index.tsx        # Reactコンポーネント
│   └── style.css        # Tailwind CSS
├── my-react-plugin.php  # WordPressプラグイン
└── build/              # ビルド結果
```

## 技術スタック

- React 18 + TypeScript
- Tailwind CSS  
- @wordpress/scripts