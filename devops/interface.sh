#!/bin/bash

GREEN='\033[0;32m'
RED='\033[0;31m'
GRAY='\033[1;30m'
NOCOLOR='\033[0m'

log_success() {
    echo -e "${GREEN}[SUCCESS]${NOCOLOR} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NOCOLOR} $1"
}

log_stage() {
    echo -e "${GRAY}[STAGE]${NOCOLOR} $1"
}

check_status() {
    if [ $? -eq 0 ]; then
        log_success "$1"
    else
        log_error "Stage failed due to previous errors"
        read -p "Press Enter to exit..."
        exit 1
    fi
}