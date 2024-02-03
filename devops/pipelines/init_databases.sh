#!/bin/bash

TODO_BE_FOLDER="todo_be"

source interface.sh

log_stage "Initializing databases..."
cd "../../${TODO_BE_FOLDER}"
py init_databases.py
check_status "Initialized databases succesfully"

read -p "Press Enter to exit..."