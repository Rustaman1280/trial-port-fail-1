#!/usr/bin/env node
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";

const projectRequire = createRequire(import.meta.url);
const contentlayerPackagePath = projectRequire.resolve("contentlayer/package.json");
const contentlayerRoot = dirname(contentlayerPackagePath);
const requireFromContentlayer = createRequire(join(contentlayerRoot, "/"));
const pnpmNodeModulesRoot = dirname(contentlayerRoot);

const resolveInternalModule = (...segments) => join(pnpmNodeModulesRoot, ...segments);

const importFromContentlayer = async (specifier) => {
  let resolvedPath;
  if (specifier === "@contentlayer/utils") {
    resolvedPath = resolveInternalModule("@contentlayer", "utils", "dist", "index.js");
  } else if (specifier === "@contentlayer/utils/effect") {
    resolvedPath = resolveInternalModule("@contentlayer", "utils", "dist", "effect", "index.js");
  } else if (specifier === "@contentlayer/utils/node") {
    resolvedPath = resolveInternalModule("@contentlayer", "utils", "dist", "node", "index.js");
  } else if (specifier.startsWith("@contentlayer/cli/dist/commands/")) {
    const commandFile = specifier.split("/").pop();
    resolvedPath = resolveInternalModule("@contentlayer", "cli", "dist", "commands", commandFile);
  } else {
    resolvedPath = requireFromContentlayer.resolve(specifier);
  }
  return import(pathToFileURL(resolvedPath).href);
};

const { provideDummyTracing } = await importFromContentlayer("@contentlayer/utils");
const effect = await importFromContentlayer("@contentlayer/utils/effect");
const nodeUtils = await importFromContentlayer("@contentlayer/utils/node");
const { Builtins, Cli } = await importFromContentlayer("clipanion");
const { BuildCommand } = await importFromContentlayer("@contentlayer/cli/dist/commands/BuildCommand.js");
const { DefaultCommand } = await importFromContentlayer("@contentlayer/cli/dist/commands/DefaultCommand.js");
const { DevCommand } = await importFromContentlayer("@contentlayer/cli/dist/commands/DevCommand.js");
const { PostInstallCommand } = await importFromContentlayer("@contentlayer/cli/dist/commands/PostInstallCommand.js");

const { pipe, T } = effect;
const { getContentlayerVersion, NodeFsLive } = nodeUtils;

const run = async () => {
  const [node, app, ...rawArgs] = process.argv;
  const args = rawArgs.length > 0 ? rawArgs : ["build"];
  const contentlayerVersion = await pipe(
    getContentlayerVersion(),
    provideDummyTracing,
    T.provideSomeLayer(NodeFsLive),
    T.runPromise,
  );

  const cli = new Cli({
    binaryLabel: "Contentlayer CLI",
    binaryName: process.env.CL_DEBUG ? `${node} ${app}` : "contentlayer",
    binaryVersion: contentlayerVersion,
  });

  cli.register(DefaultCommand);
  cli.register(DevCommand);
  cli.register(BuildCommand);
  cli.register(PostInstallCommand);
  cli.register(Builtins.HelpCommand);
  cli.register(Builtins.VersionCommand);

  const result = await cli.run(args, Cli.defaultContext);
  if (typeof result === "number") {
    process.exitCode = result;
  } else if (result && typeof result === "object" && typeof result.code === "number") {
    process.exitCode = result.code;
  } else {
    process.exitCode = 0;
  }
};

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
