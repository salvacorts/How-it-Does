#!/bin/bash

## Note: credentials files are created from env variables created with:
## base64 <credentials-file-example.json>

# Remove env vars
set -e

# Configure Google Cloud SDK
echo $GCLOUD_SERVICE_KEY | base64 --decode -i > ./Backend/creds.json
gcloud auth activate-service-account $GCLOUD_EMAIL --key-file ./Backend/creds.json
gcloud --quiet config set project $PROJECT_NAME
gcloud --quiet config set compute/zone $CLOUDSDK_COMPUTE_ZONE

# Configure Docker to access Google Container Registry
echo $GCR_SERVICE_KEY | base64 --decode -i > ./gcr-creds.json
docker login -u _json_key -p "$(cat ./gcr-creds.json)" https://gcr.io

# Install Kubectl and authenticate
gcloud components install kubectl
gcloud container clusters get-credentials main-cluster

# Build Backend
cd Backend/
docker build -f dockerfile -t gcr.io/how-it-does/backend:latest .
docker push gcr.io/how-it-does/backend:latest
kubectl set image deployment/how-it-does backend=backend:latest

# Move from backent to Frontend
cd ../Frontend/
docker build -f dockerfile -t gcr.io/how-it-does/frontend:latest .
docker push gcr.io/how-it-does/frontend:latest
kubectl set image deployment/how-it-does frontend=frontend:latest
