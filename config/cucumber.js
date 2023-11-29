module.exports = {
    // Configuración para pruebas end-to-end (e2e)
    e2e: {
        tags: process.env.npm_config_TAGS || "",
        formatOptions: {
            snippetInterface: "async-await"
        },
        paths: [
            "tests/e2e/features/"
        ],
        dryRun: false,
        require: [
            "tests/e2e/steps/**/*.spec.ts",
            "hooks/hooks.ts"
        ],
        requireModule: [
            "ts-node/register"
        ],
        format: [
            "progress-bar",
            "html:test-results/cucumber-report.html",
            "json:test-results/cucumber-report.json",
            "rerun:@rerun.txt"
        ],
        retry: 1,
        parallel: 2,
    },
    // Configuración para pruebas de API
    api: {
        tags: process.env.npm_config_TAGS || "",
        formatOptions: {
            snippetInterface: "async-await"
        },
        paths: [
            "tests/api/features/"
        ],
        dryRun: false,
        require: [
            "tests/api/steps/**/*.spec.ts",
            "hooks/hooks.ts"
        ],
        requireModule: [
            "ts-node/register"
        ],
        format: [
            "progress-bar",
            "html:test-results/cucumber-report.html",
            "json:test-results/cucumber-report.json",
            "rerun:@rerun.txt"
        ],
        retry: 1,
        parallel: 1
    },
    // Configuración para rerun (ejecución de pruebas fallidas)
    rerun: {
        formatOptions: {
            snippetInterface: "async-await"
        },
        dryRun: false,
        require: [
            "tests/steps/*.spec.ts",
            "hooks/hooks.ts"
        ],
        requireModule: [
            "ts-node/register"
        ],
        format: [
            "progress-bar",
            "html:test-results/cucumber-report.html",
            "json:test-results/cucumber-report.json",
            "rerun:@rerun.txt"
        ],
        parallel: 2
    }
}