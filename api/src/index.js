const Koa = require('koa');
const KoaBody = require('koa-body');
const cors = require('@koa/cors');
const router = require('./router');

const PORT = process.env.PORT || 3001;

const app = new Koa();

app
  .use(cors())
  .use(KoaBody())
  .use(router.allowedMethods())
  .use(router.routes());

app.listen(PORT, () => {
  console.log('Server listen on port 3000!');
});
