## Environment pre-requirements

1. Clone project:

    ```cmd
    git clone https://github.com/Elbargho/todo.git
    ```
    
2. Download `git` [here](https://github.com/git-for-windows/git/releases/download/v2.43.0.windows.1/Git-2.43.0-64-bit.exe)
3. Download `python` [here](https://www.python.org/ftp/python/3.12.1/python-3.12.1-amd64.exe)
4. Download `node.js` (v20.11.0) [here](https://nodejs.org/dist/v20.11.0/node-v20.11.0-x64.msi)
5. Install required `python packages`:

    ```cmd
    cd devops
    py -m pip install -r requirements.txt
    ```
    
6. Install `yarn`:

    ```cmd
    npm install -g yarn
    ```
    
7. Initialize databases - run `devops/pipelines/init_databases.sh`

## Starting backend server

1. Run `devops/pipelines/main_build.sh`
2. Run `devops/pipelines/start_server.sh`

Happy Hacking! :smile:

#### In a NON-PRODUCTION environement - add a file `devops/config.properties` with the following content:

    ```properties
    [DEBUG]
    #this property should ALWAYS be false in production
    debug = False
    ```
    