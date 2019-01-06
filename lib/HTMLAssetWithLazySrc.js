const HTMLAsset = require("parcel-bundler/src/assets/HTMLAsset");

class HTMLAssetWithLazySrc extends HTMLAsset {
  collectDependencies() {
    super.collectDependencies();
    this.ast.walk(node => {
      if (node.attrs) {
        for (let attr in node.attrs) {
          if (
            attr === "data-src" ||
            attr === "data-srcset" ||
            attr === "data-flickity-lazyload" ||
            attr === "data-flickity-bg-lazyload"
          ) {
            node.attrs[attr] = super.collectSrcSetDependencies(
              node.attrs[attr]
            );
            this.isAstDirty = true;
            continue;
          }
        }
      }

      return node;
    });
  }
}

module.exports = HTMLAssetWithLazySrc;
