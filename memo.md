
Node.jsなどへの恐怖心がだいぶ薄れたので、さかなさんのdocをみながら定期げーもどきをつくってゆくぞ。
とりあえずVercel + Nuxt + PostgreSQL(Vercelに入っているので)

### version
- node.js v20.15.0
- npm 10.7.0

### Nuxt Install
プロジェクトフォルダの上の階層で
　npx nuxi@latest init teiki-sakanasan
　（いんすとーる）
　cd teiki-sakanasan
　npm run dev
　（開発サーバ起動）
ﾖｼ！

### GitHub + Vercel
あげちゃいけないやつは.gitignoreに書いてあるので、丸ごとGithubに投げ込み、Vercelへインポートする。

### DB接続
Prismaつかうか。あとは・・・・・・mongo atlas？　つかいかたわかんねえんですけど！
昔作って多っぽいのがあったので全部消して、新規project作成→新規Cluster作成。無料のM0。
Vercelのサーバがワシントンにあるらしいので、近郊のものを選びました。AWSのN.Virginia(us-east-1)。
Automated Security にチェックを入れ、Preload sample dataset は外す。

#### Connect to (クラスター名)
1. 1. Add a connection IP address  
やってあった。
   2. 接続するユーザーを作ってくださいとか何とか。ボタン押した。  
   パスワードは覚えておかないといけない（忘れたので設定画面から再設定する羽目になった）
2. Choose a connection method  
Connect to your application. - Drivers を選んだ。nodeで接続するので。
3. Connect  
接続の仕方を教えてくれるんですが、Nuxt-mongooseを使うので無視しちゃお。Done。

[https://docs.arashsheyda.me/nuxt-mongoose/getting-started/setup]
nuxt-mongooseいれたら脆弱性あるぞいっていわれたんですけど？
```npm audit fix --force```
なんか破壊的変更があるっぽいけどまあええやろ！　やっちまえ！

なにがわるいのかよくわからずわからん！となり、死です

### Nuxt-Mongoose
https://jahid.dev/blog/nuxt-mongodb
こっちつかう

### auth 
https://qiita.com/M_inagaki/items/bae0e8c27cace2f3c3fe

@sidebasde/nuxt-auth
https://github.com/sidebase/nuxt-auth

localっていうのが多分自分で作るログイン機構……ではないかも
くれでんしゃる？　ローカルはスタティックページに使うみたいなこと書いてあるけど

### JWT認証
Json Web Token 認証
セッションを使わないらしい。つまりステートレスな認証ってこと……？
https://qiita.com/asagohan2301/items/cef8bcb969fef9064a5c

https://www.netattest.com/jwt-2023_mkt_tst
利点と欠点があり、セッションとは別目的の存在。
CORSできる・できない、鯖側から無効化できるかどうかとか。

https://developer.mamezou-tech.com/blogs/2022/12/08/jwt-auth/
改ざん防止のシステムというより、改ざん検知のシステム。
中身を見られることは前庭っぽい感じがある。だからパスワード入れちゃいけないって言われてるのね。

JWT、盗聴リスクがあるから短期間用ってかんじだ。
セッションつかうのがいいかな。

### Nuxt-mongoose
mongoDBのクエリが独特すぎるよお！！  
あとserver/modelsに入ってるやつはauto-import対象らしいのにやってくれない　なぜ？

[https://hohara.info/mongoose-plural-collection-name/]  
> すると驚いたことに、デフォルト状態のmongooseから、このコレクションへアクセスすることはできない。  
> 末尾が「s」ではないからだ。
ふざけるな

```typescript
export const UserSchema = defineMongooseModel({
   name: 'User',
   ...
   options: {
      collection: 'User',
   },
})
```
