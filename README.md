## どんなアプリ？

レシートをかき集めたときに、予算内に収まる最高効率なレシートの組みあわせを計算するアプリ

## 開発

Node.js 22.13 以降と pnpm 12.15.0 を使用します。pnpm のインストール方法は[公式ドキュメント](https://pnpm.io/installation)を参照してください。

```sh
pnpm install --frozen-lockfile
pnpm run dev
```

品質確認と本番ビルド:

```sh
pnpm run lint
pnpm run test
pnpm run build
```
