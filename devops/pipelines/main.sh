#!/bin/bash

source interface.sh

log_stage "1: Pulling latest version of todo project..."
git reset --hard
git pull
check_status "Pulled the latest version of todo project succesfully"

log_stage "2: Running generic.sh..."
source generic.sh