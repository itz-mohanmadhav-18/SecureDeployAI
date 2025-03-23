pipeline {
    agent any

    environment {
        CI = "true"
        OWASP_ZAP_PATH = "/usr/share/zaproxy/zap.sh"  // EC2 Path
        IMAGE_NAME = "mohanmadhavsinghal/my-node-app"
        TARGET_URL = "http://localhost:3000"
        NODE_HOME = "/usr/bin"
        PATH = "${NODE_HOME}:${env.PATH}"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/itz-mohanmadhav-18/SecureDeployAI.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Start Application') {
            steps {
                sh 'nohup node server.js &'
                sleep(time: 10, unit: 'SECONDS')
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

        stage('Deploy Application') {
            steps {
                sh '''
                docker stop my-node-app || true
                docker rm my-node-app || true
                docker run -d -p 3000:3000 --name my-node-app $IMAGE_NAME
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
                sh """
                    ${OWASP_ZAP_PATH} -cmd -port 9090 -quickurl ${TARGET_URL} -quickout "\$WORKSPACE/zap_report.html" -script "\$WORKSPACE/zap_scan.js"
                """
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
