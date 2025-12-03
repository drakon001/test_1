# this is test task implemmentation React -front, FastAPI - back

For run implement MongoDB you need alreday installed  docker-compose in your system
Also you need install npm and python there
afte it just run next order in you console:
run mongo in docker container:
```
docker-compose up -d
```
run in project root , it create front bundle
```
npm install 
npm run build
```
make virtual eniroment for python
```
python3 -m venv .venv
```
install python deps:
```
pip install -r ./requirements.txt
```
run server
```
./run.py
```
After this you can see result in
http://localhost:8001/


## MongoDB container
## Run in background
```
docker-compose up -d
```
### logs
```
docker-compose logs -f mongodb
```
### Check status
```
docker-compose ps
```

## Install order
### Frontend
```
npm install 
npm run build
```
  it create bundle in server/static
```
### Backend
#### make virtual events if nessesary
```
python3 -m venv .venv
```
##### activate
```
source ./.venv/bin/activate
```
#### install deps
```
pip install -r ./requirements.txt       
```
#### run server
./run.py
