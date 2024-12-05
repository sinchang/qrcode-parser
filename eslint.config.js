import antfu from '@antfu/eslint-config'

export default antfu({
    rules: {
        'unused-imports/no-unused-vars': ["error", { "caughtErrors": "none" }]
    }
})