#!/bin/bash

TODO_BE_FOLDER="todo_be"

source interface.sh

log_stage "Starting server..."
cd "../${TODO_BE_FOLDER}"
python app.py