# MongoDB container
# Run in background
```
docker-compose up -d
```
# logs
```
docker-compose logs -f mongodb
```
# Check status
```
docker-compose ps
```

# Install order
## Frontend
```
npm install 
npm run build
```
  it create bundle in server/static

## Backend
### make virtual events if nessesary
```
python3 -m venv .venv
```
#### activate
```
source ./.venv/bin/activate
```
### install deps
```
pip install -r ./requirements.txt       
```
### run server
./run.py
