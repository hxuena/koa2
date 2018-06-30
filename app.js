const Koa = require('koa')
const path = require('path')
const router = require('koa-simple-router')
const render = require('koa-swig')
const co = require('co')
const serve = require('koa-static')

const app = new Koa()

app.context.render = co.wrap(render({
  root: path.join(__dirname, './views'),
  autoescape: true,
  cache:'memory',
  ext: 'html',
  writeBody: false
}));
 
app.use(router(_ => {
  _.get('/', (ctx, next) => {
    ctx.body = 'hello'
  })
  _.get('/index', async(ctx, next) => {
    ctx.body = await ctx.render('index.html')
  })
}))

app.use(serve(path.join(__dirname, './public')))

app.listen(3000, ()=>{
  console.log('sever is ok')
})