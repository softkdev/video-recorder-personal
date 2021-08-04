import babel from "rollup-plugin-babel";
import json from "@rollup/plugin-json";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import resolve from "rollup-plugin-node-resolve";
import url from "rollup-plugin-url";
import {
  imgResolverPlugin,
  cssResolverPlugin,
  svgResolverPlugin,
  mediaResolverPlugin,
} from "./rollup-plugin-images.js";

import pkg from "./package.json";

export default {
  input: "src/index.js",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: true,
    },
  ],
  plugins: [
    imgResolverPlugin(),
    cssResolverPlugin(),
    svgResolverPlugin(),
    mediaResolverPlugin(),
    json({
      compact: true,
    }),
    external(),
    url({ exclude: ["**/*.svg"] }),
    babel({
      exclude: "node_modules/**",
    }),
    resolve(),
    commonjs(),
  ],
};
