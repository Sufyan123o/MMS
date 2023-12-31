# MMS

## Virtual Environment

Recommended to run program and install the libraries inside a virtual environment.

### To create the virtual environment use

```powershell
python -m venv venv
```

> ensure to use the filename of venv, as it is included in the .gitignore

### To run the virtual environment use

```shell
# Command Line
.\venv\scripts\activate.bat

# Powershell
.\venv\scripts\activate

# macOS
source venv/bin/activate
```

## Installing project dependenices

With the virtual environment activated use the following to install the specific versions of the project dependencies using the follow:

```powershell
pip install -r requirements.txt
```

> After setting up the virtual environment and installing the dependencies, in future all only the virtual environment needs to be run.

## Development

After cloning the repo and setting up venv there are two commands you need to run

1. Run the backend, whilst in `./backend`

```powershell
flask run
```

2. Run the front end, whilst in `./frontend`

```powershell
npm i
npm run dev
```

> This installs the neccessary node dependencies specified in package-lock.json

## APIs

The APIs should be of the format
`/api/...`

## Branches

To create a new branch, use the following:

```powershell
git checkout -b <your-new-branch-name>
```

> This only creates a local branch

Then to push this branch to the origin repository, use the following:

```powershell
git push origin <your-new-branch-name>
```

To switch branches, use the following:

```powershell
git checkout <your-new-branch-name>
```
