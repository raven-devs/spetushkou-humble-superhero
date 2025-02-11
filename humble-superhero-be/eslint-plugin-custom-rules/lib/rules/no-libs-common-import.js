module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: "Disallow usage of 'libs/common' import",
      category: 'Custom rules',
      recommended: false,
    },
    messages: {
      avoidLibsCommonImport: "Avoid using 'libs/common' import.",
    },
    schema: [],
  },

  create(context) {
    return {
      Literal(node) {
        if (typeof node.value === 'string' && node.value.includes('libs/common')) {
          context.report({
            node,
            messageId: 'avoidLibsCommonImport',
          });
        }
      },
    };
  },
};
