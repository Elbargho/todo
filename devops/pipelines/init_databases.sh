#!/bin/bash

source interface.sh

log_stage "Initializing databases..."
cd "../../${TODO_BE_FOLDER}"
python3 init_databases.py
check_status "Initialized databases succesfully"

read -p "Press Enter to exit..."