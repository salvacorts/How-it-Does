#!/bin/bash

## Note: credentials files are created from env variables created with:
## base64 <credentials-file-example.json>

# Remove env vars
set -e

# Configure Google Cloud SDK
ls -la Backend/
echo $GCLOUD_SERVICE_KEY | base64 --decode -i > ${HOME}/Backend/creds.json
echo; echo;
ls -la Backend/
echo "hellooo"
gcloud auth activate-service-account --key-file ${HOME}/Backend/creds.json
gcloud --quiet config set project $PROJECT_NAME
gcloud --quiet config set compute/zone $CLOUDSDK_COMPUTE_ZONE


# Build Backend
cd Backend/
docker build -f dockerfile -t gcr.io/how-it-does/backend:latest .
gcloud docker -- push gcr.io/how-it-does/backend:latest
kubectl rolling-update backend --image=gcr.io/how-it-does/backend:latest

# Move from backent to Frontend
cd ../Frontend/
docker build -f dockerfile -t gcr.io/how-it-does/frontend:latest .
gcloud docker -- push gcr.io/how-it-does/frontend:latest
kubectl rolling-update frontend --image=gcr.io/how-it-does/frontend:latest
