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
        stage('Instalar Playwright') {
            steps {
                sh 'npx playwright install chromium'
            }
        }
        stage('Ejecutar tests E2E') {
            steps {
                sh 'npm run test:e2e'
            }
        }
        stage('Archivar capturas') {
            steps {
                archiveArtifacts artifacts: 'tests/screenshots/*.png',
                    allowEmptyArchive: true
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
