トークン方式で最も主流なのはJWT
jose,
トークン発行 SignJWT,
トークンの検証 JwtVerify()
payload: トークンの含むことのできるデータ(ユーザ名やメールアドレス)
TextEncoder().encode(str) : strをエンコードするjsのコード


tokenを作るのにpayloadとsecretkey必要。
setProtectedHeaderはhashのアルゴリズムを指定している。
setExpirationTimeは何の時間を指定しているんだ...?
```
const secretKey = new TextEncoder().encode("next-market-route-handlers");
const payload = {
  email: req.email
} 
const token = await new SignJWT(payload)
                        .setProtectedHeader({alg: "HS256"})
                        .setExpirationTime("1d")
                        .sign(secretKey);
```