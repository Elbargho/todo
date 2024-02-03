## Environment pre-requirements

1. Download `git` [here](https://github.com/git-for-windows/git/releases/download/v2.43.0.windows.1/Git-2.43.0-64-bit.exe)
2. Download `python` [here](https://www.python.org/ftp/python/3.12.1/python-3.12.1-amd64.exe)
3. Download `node.js` (v20.11.0) [here](https://nodejs.org/dist/v20.11.0/node-v20.11.0-x64.msi)
4. Install required `python packages`:

    ```cmd
    cd devops
    py -m pip install -r requirements.txt
    ```
    
5. Install `yarn`:

    ```cmd
    npm install -g yarn
    ```
    
6. Initialize databases:
    1. Open the project in VSCode 
    2. Run `init_databases.py`

## Starting backend server

1. Open `devops/pipeline.sh` file
2. Run `app.py`

Happy Hacking! :smile:

#### In a NON-PRODUCTION environement - go to `devops/config.properties` and change `debug` property to True
