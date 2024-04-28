const { rspack, EntryOptionPlugin } = require("@rspack/core");

class EntryPlugin {
  apply(compiler) {
    compiler.hooks.entryOption.tap("EntryPlugin", (context, entry) => {
      const newEntry = () => {
        console.log("entry", entry);
        return entry;
      };

      EntryOptionPlugin.applyEntryOption(compiler, context, newEntry);
      return true;
    });
  }
}

const compiler = rspack({
  entry: "./index.js",
  plugins: [new EntryPlugin()],
  mode: "development",
});

const watching = compiler.watch(
  {
    // 示例
    aggregateTimeout: 300,
    poll: undefined,
  },
  (err, stats) => {
    // 这里打印 watch/build 结果...
    console.log(stats.toString());
  }
);

setInterval(() => {
  watching.invalidate();
}, 3000);
