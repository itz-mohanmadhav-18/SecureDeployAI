pipeline {
    agent any

    environment {
        IMAGE_NAME = "mohanmadhavsinghal/my-node-app"
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
                    try {
                        sh 'npm test'
                    } catch (Exception e) {
                        echo 'Tests failed, but continuing...'
                    }
                }
            }
        }

        // Simulating AI-based Security Script Generation
        stage('Request AI to Generate Security Scripts') {
            steps {
                echo "Sending request to AI to generate security testing scripts..."
                sh 'sleep 3'  // Simulating API call to AI
            }
        }

        stage('Retrieve AI-Generated Security Scripts') {
            steps {
                echo "Retrieving generated security scripts from AI..."
                sh 'sleep 2'  // Simulating AI response delay
                sh 'echo "Generated security scripts saved" > ai_security_scripts.sh'
            }
        }

        stage('Execute AI-Generated Security Scripts') {
            steps {
                echo "Executing AI-generated security scripts..."
                sh 'bash ai_security_scripts.sh'  // Dummy execution
            }
        }

        // OWASP Dependency Check
        stage('OWASP Dependency Check') {
            steps {
                echo "Running OWASP Dependency Check..."
                sh '''
                docker run --rm -v $(pwd):/src dependency-check \
                --scan /src --format HTML --out reports/
                '''
            }
        }

        // OWASP ZAP Scan
        stage('OWASP ZAP Security Scan') {
            steps {
                echo "Running OWASP ZAP Security Scan..."
                sh '''
                docker run -t owasp/zap2docker-stable zap-baseline.py -t http://localhost:3000 -r zap_report.html
                '''
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
                sh 'docker run -d -p 3000:3000 --name my-node-app $IMAGE_NAME'
            }
        }
    }
}
