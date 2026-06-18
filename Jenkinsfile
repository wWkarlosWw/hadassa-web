pipeline {
    agent any
    tools {
        nodejs 'Node.js'
        allure 'allure'
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/wWkarlosWw/hadassa-web.git',
                    credentialsId: 'wWkarlosWw'
            }
        }
        stage('Instalar dependencias') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Tests unitarios (Vitest)') {
            steps {
                sh 'npm run test:unit'
            }
        }
        stage('Ejecutar tests BDD (WebDriver)') {
            steps {
                sh 'npm run test:e2e'
            }
        }
        stage('Publicar reportes HTML') {
            steps {
                publishHTML([
                    allowMissing: true,
                    reportDir: 'test-results',
                    reportFiles: 'vitest-report.html',
                    reportName: 'Reporte Unit Tests (Vitest)',
                    keepAll: true
                ])
                publishHTML([
                    allowMissing: true,
                    reportDir: 'test-results',
                    reportFiles: 'cucumber-report.html',
                    reportName: 'Reporte BDD (Cucumber)',
                    keepAll: true
                ])
            }
        }
        stage('Generar reporte Allure') {
            steps {
                allure includeProperties: false,
                    results: [[path: 'allure-results']]
            }
        }
    }
}
