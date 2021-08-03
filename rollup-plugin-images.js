const path = require("path");
import fs from "fs";

export function imgResolverPlugin() {
  return {
    resolveId(source, importer) {
      if (source.endsWith(".jpg") || source.endsWith(".png")) {
        return path.resolve(path.dirname(importer), source);
      }
    },
    load(id) {
      if (id.endsWith(".jpg") || id.endsWith(".png")) {
        const referenceId = this.emitFile({
          type: "asset",
          name: path.basename(id),
          source: fs.readFileSync(id),
        });
        return `export default import.meta.ROLLUP_FILE_URL_${referenceId};`;
      }
    },
  };
}
export function mediaResolverPlugin() {
  return {
    resolveId(source, importer) {
      if (source.endsWith(".mp4") || source.endsWith(".mp3")) {
        return path.resolve(path.dirname(importer), source);
      }
    },
    load(id) {
      if (id.endsWith(".mp4") || id.endsWith(".mp3")) {
        const referenceId = this.emitFile({
          type: "asset",
          name: path.basename(id),
          source: fs.readFileSync(id),
        });
        return `export default import.meta.ROLLUP_FILE_URL_${referenceId};`;
      }
    },
  };
}
export function svgResolverPlugin() {
  return {
    resolveId(source, importer) {
      if (source.endsWith(".svg")) {
        return path.resolve(path.dirname(importer), source);
      }
    },
    load(id) {
      if (id.endsWith(".svg")) {
        const referenceId = this.emitFile({
          type: "asset",
          name: path.basename(id),
          source: fs.readFileSync(id),
        });
        return `export default import.meta.ROLLUP_FILE_URL_${referenceId};`;
      }
    },
  };
}
export function cssResolverPlugin() {
  return {
    resolveId(source, importer) {
      if (source.endsWith(".css")) {
        return path.resolve(path.dirname(importer), source);
      }
    },
    load(id) {
      if (id.endsWith(".css")) {
        const referenceId = this.emitFile({
          type: "asset",
          name: path.basename(id),
          source: fs.readFileSync(id),
        });
        return `export default import.meta.ROLLUP_FILE_URL_${referenceId};`;
      }
    },
  };
}
