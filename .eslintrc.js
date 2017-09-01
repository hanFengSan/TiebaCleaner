module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: ['standard', "plugin:flowtype/recommended"],
    // required to lint *.vue files
    plugins: [
        'flowtype',
        'html'
    ],
    // add your custom rules here
    'rules': {
        "space-before-function-paren": 0,
        "semi": 0,
        "indent": ["error", 4, { "SwitchCase": 1, "MemberExpression": 1 }],
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'outerIIFEBody': 0,
        // flow
        "flowtype/boolean-style": [
            2,
            "boolean"
        ],
        "flowtype/define-flow-type": 1,
        "flowtype/delimiter-dangle": [
            2,
            "never"
        ],
        "flowtype/generic-spacing": [
            2,
            "never"
        ],
        "flowtype/no-primitive-constructor-types": 2,
        "flowtype/no-types-missing-file-annotation": 2,
        "flowtype/no-weak-types": 2,
        "flowtype/object-type-delimiter": [
            2,
            "comma"
        ],
        "flowtype/require-parameter-type": 2,
        "flowtype/require-return-type": [
            2,
            "always",
            {
                "annotateUndefined": "never"
            }
        ],
        "flowtype/require-valid-file-annotation": 2,
        "flowtype/semi": [
            2,
            "always"
        ],
        "flowtype/space-after-type-colon": [
            2,
            "always"
        ],
        "flowtype/space-before-generic-bracket": [
            2,
            "never"
        ],
        "flowtype/space-before-type-colon": [
            2,
            "never"
        ],
        "flowtype/type-id-match": [
            2,
            "^([A-Z][a-z0-9]+)+Type$"
        ],
        "flowtype/union-intersection-spacing": [
            2,
            "always"
        ],
        "flowtype/use-flow-type": 1,
        "flowtype/valid-syntax": 1
    },
    "settings": {
        "flowtype": {
            "onlyFilesWithFlowAnnotation": false
        }
    }
}
