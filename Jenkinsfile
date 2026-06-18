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
        stage('Instalar dependencias backend') {
            steps {
                sh 'cd ../hadasa-back && npm ci'
            }
        }
        stage('Iniciar backend') {
            steps {
                sh 'cd ../hadasa-back && npm run start:dev > /tmp/backend.log 2>&1 &'
                sh 'sleep 8'
            }
        }
        stage('Iniciar frontend') {
            steps {
                sh 'npm run dev > /tmp/frontend.log 2>&1 &'
                sh 'sleep 5'
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
    post {
        always {
            sh 'pkill -f "nest start" || true'
            sh 'pkill -f "vite" || true'
        }
    }
}
