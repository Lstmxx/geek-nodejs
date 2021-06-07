import { readFileSync } from "fs";
import { runInContext, createContext } from "vm";

const templateCache: Record<string, any> = {};

const templateContext = createContext({
  include: function (name: string, data: any) {
    const template = templateCache[name] || createTemplate(name);
    return template(data);
  },
});

export function createTemplate(templatePath: string) {
  templateCache[templatePath] = runInContext(
    `(function (data) {
      with (data) {
        return \`${readFileSync(templatePath, "utf-8")}\`
      }
    })`,
    templateContext
  );

  return templateCache[templatePath];
}
