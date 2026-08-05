# YH BRANDS Website

GitHub Desktopへ登録できる静的ホームページです。

## 確認方法

`index.html` をダブルクリックするとSafariなどで表示できます。

## GitHub Desktopへ登録

1. GitHub Desktopを開きます。
2. 「File」→「Add Local Repository」を選びます。
3. 「Choose」で、この `YH-BRANDS-Website` フォルダを選択します。
4. リポジトリでないという表示が出た場合は「create a repository」を選びます。
5. 「Publish repository」を押すとGitHubへ登録できます。

## 主なファイル

- `index.html`：文章とリンク
- `style.css`：デザイン
- `script.js`：メニューと表示アニメーション
- `images`：画像とアイコン
- `404.html`：ページが見つからない場合の表示
- `robots.txt`：検索エンジンの巡回設定
- `sitemap.xml`：検索エンジン向けのページ一覧

## SEOの自動更新

HTMLを更新してGitHubへ反映すると、GitHub Actionsが`sitemap.xml`を自動生成します。手元で更新するときは`npm run generate:sitemap`を実行します。

お問い合わせ先にはGoogleフォームを設定しています。
