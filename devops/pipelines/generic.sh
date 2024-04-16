#!/bin/bash

source build.sh
cd "devops/pipelines"
source restart_server.sh

log_success "All stages completed successfully!"

read -p "Press Enter to exit..."