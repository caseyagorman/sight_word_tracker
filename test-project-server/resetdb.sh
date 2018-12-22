# chmod +x whatever you're executing ./
# bash resetdb.sh

dropdb users
dropdb students
dropdb words
dropdb studentwords
dropdb studenttestresults

createdb users
createdb words
createdb students
createdb studenttestresults
createdb studentwords

start-server.sh