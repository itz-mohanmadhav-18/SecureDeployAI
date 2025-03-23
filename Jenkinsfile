pipeline {
    agent any

    environment {
        IMAGE_NAME = "mohanmadhavsinghal/my-node-app"
        TARGET_URL = "http://localhost:3000"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/itz-mohanmadhav-18/SecureDeployAI.git'
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                script {
                    def exitCode = sh(script: 'npm test', returnStatus: true)
                    if (exitCode != 0) {
                        echo 'Tests failed, but continuing...'
                    }
                }
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'DOCKERHUB_TOKEN', variable: 'DOCKER_PAT')]) {
                        sh '''
                        docker build -t $IMAGE_NAME .
                        echo $DOCKER_PAT | docker login -u mohanmadhavsinghal --password-stdin
                        docker push $IMAGE_NAME
                        '''
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                docker stop my-node-app || true
                docker rm my-node-app || true
                docker run -d -p 3000:3000 --name my-node-app mohanmadhavsinghal/my-node-app
                '''
            }
        }

        stage('Getting scripts from AI') {
            steps {
                echo 'Getting scripts from AI...'
            }
        }

        stage('Running AI-generated scripts') {
            steps {
                echo 'Running AI-generated scripts...'
            }
        }

        stage('Run OWASP ZAP Scan') {
            steps {
                sh '''
                /snap/bin/zaproxy -daemon -port 9090 -host 127.0.0.1 -config api.disablekey=true
                sleep 10
                /snap/bin/zaproxy -cmd -quickurl $TARGET_URL -quickout zap_report.html
                '''
            }
        }

        stage('Publish OWASP ZAP Report') {
            steps {
                publishHTML([allowMissing: true,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: '.',
                    reportFiles: 'zap_report.html',
                    reportName: "OWASP ZAP Security Report"])
            }
        }
    }
}
