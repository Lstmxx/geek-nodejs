import mount from "koa-mount";
import koaStatic from "koa-static";
import koa, { Context, DefaultContext, DefaultState } from "koa";
import path from "path";

import rpcClient from "./client";
import { staticConfig } from "@/bff/config";
import { createTemplate } from "@/bff/static/detail/template";

const basePath = path.join(staticConfig.path.static, "/detail");

const detailTemplate = createTemplate(
  path.join(basePath + "/template/index.html")
);
export const installDetail = (app: koa<DefaultState, DefaultContext>) => {
  app.use(koaStatic(path.join(basePath, "/source/static")));
  app.use(
    mount("/detail", async (ctx: Context) => {
      if (!ctx.query.columnid) {
        ctx.status = 400;
        ctx.body = "invalid columnid";
        return;
      }

      const result = await new Promise((resolve, reject) => {
        rpcClient.write(
          {
            columnid: ctx.query.columnid,
          },
          function (err: Error, data: any) {
            err ? reject(err) : resolve(data);
          }
        );
      });

      ctx.status = 200;
      ctx.body = detailTemplate(result);
    })
  );
};
