#!/bin/bash

log_stage "3: Running yarn command..."
cd "../../$TODO_REACT_FOLDER"
yarn
check_status "yarn command executed successfully"

log_stage "4: Running yarn build command..."
yarn build
cd ".."
check_status "yarn build command executed successfully"

log_stage "5: Copying $TODO_REACT_FOLDER/build to $TODO_BE_FOLDER"
rm -r "${TODO_BE_FOLDER}/build"
cp -r "${TODO_REACT_FOLDER}/build" "$TODO_BE_FOLDER"
check_status "Copied build folder succesfully"
