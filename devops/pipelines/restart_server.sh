#!/bin/bash

source interface.sh

log_stage "6: Restarting server..."
cd "../../$TODO_BE_FOLDER"
sudo pkill gunicorn
gunicorn3 --workers=3 app:app --daemon
check_status "Server restarted successfully"