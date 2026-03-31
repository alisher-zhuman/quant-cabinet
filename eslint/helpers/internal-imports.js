export const createSameLayerImportConfig = (layer) => ({
  files: [`src/${layer}/**/*.{ts,tsx}`],
  rules: {
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: [`@${layer}`, `@${layer}/*`],
            message: `${layer} cannot import ${layer}. Move shared code down a layer or compose it in a higher layer.`,
          },
        ],
      },
    ],
  },
});
