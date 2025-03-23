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
                sh 'npm test'
            }
        }

        stage('Docker Build & Push') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
                sh 'docker login -u mohanmadhavsinghal -p Mohan123@'
                sh 'docker push $IMAGE_NAME'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker run -d -p 3000:3000 $IMAGE_NAME'
            }
        }
    }
}
