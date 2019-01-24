# chmod +x whatever you're executing ./
# bash resetdb.sh

dropdb users
dropdb students
dropdb words
dropdb studentwords
dropdb studenttestresults

createdb users1
createdb words
createdb students1
createdb studenttestresults
createdb studentwords

# start-server.sh