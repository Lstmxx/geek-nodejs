import koa from "koa";
import { installDownload } from "@/bff/views/download";
import { installDetail } from "./views/detail";
import { serverConfig } from "@/bff/config";
const app = new koa();

installDownload(app);
installDetail(app);

app.listen(serverConfig.port, serverConfig.hostname, () => {
  console.log(`listened ${serverConfig.port}`);
});
