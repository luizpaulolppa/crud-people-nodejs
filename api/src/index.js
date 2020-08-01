const Koa = require('koa');
const KoaBody = require('koa-body');
const router = require('./router');

const app = new Koa();

app
  .use(KoaBody())
  .use(router.allowedMethods())
  .use(router.routes());

app.listen(3000, () => {
  console.log('Server listen on port 3000!');
});
