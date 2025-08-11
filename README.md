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

## 開発

```bash
# 開発時
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