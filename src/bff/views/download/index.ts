import mount from "koa-mount";
import koaStatic from "koa-static";
import koa, { Context, DefaultContext, DefaultState } from "koa";
import { readFileSync } from "fs";
import { staticConfig } from "@/bff/config";
import path from "path";
const basePath = path.join(staticConfig.path.static, "/download/");
export const installDownload = (app: koa<DefaultState, DefaultContext>) => {
  app.use(koaStatic(basePath));
  app.use(
    mount("/download", async (ctx: Context) => {
      ctx.body = readFileSync(path.join(basePath, "index.html"), "utf-8");
    })
  );
};
