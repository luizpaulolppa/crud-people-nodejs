const Koa = require('koa');
const KoaBody = require('koa-body');
const router = require('./router');

const PORT = process.env.PORT || 3000;

const app = new Koa();

app
  .use(KoaBody())
  .use(router.allowedMethods())
  .use(router.routes());

app.listen(PORT, () => {
  console.log('Server listen on port 3000!');
});
