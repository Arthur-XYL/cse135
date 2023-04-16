#!/bin/bash

# Define variables
REPO_URL="https://github.com/Arthur-XYL/cse135.git"
BRANCH="main"
DEPLOY_DIR="/var/www/cse135.cloud/public_html/cse135"

TMP_DIR="/tmp/cse135"

# Clone the repository
git clone -b $BRANCH $REPO_URL $TMP_DIR

# Copy the files to the deployment directory
rsync -avz --delete $TMP_DIR/ $DEPLOY_DIR/

# Restart the web server
systemctl restart apache2
