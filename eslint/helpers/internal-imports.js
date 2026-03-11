import { readdirSync } from "node:fs";

const getLayerSlices = (layer) =>
  readdirSync(new URL(`../../src/${layer}`, import.meta.url), {
    withFileTypes: true,
  })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

export const createSameSliceImportConfigs = (layer) =>
  getLayerSlices(layer).map((slice) => ({
    files: [`src/${layer}/${slice}/**/*.{ts,tsx}`],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [`@${layer}/${slice}`, `@${layer}/${slice}/*`],
              message: "Use relative imports inside the same slice.",
            },
          ],
        },
      ],
    },
  }));
