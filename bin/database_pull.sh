#!/bin/bash

DUMP_FILENAME='./foun.pudr.com_dump.sql'

source ./backend/.env.production || exit $?
echo '💾 Creating production dump'
pg_dump -U $PGUSER -h $PGHOST -p $PGPORT -W -F t $PGDATABASE > $DUMP_FILENAME

source ./backend/.env.development || exit $?
echo '🎡 Loading dump on localhost'
dropdb $PGDATABASE -p $PGPORT -U $PGUSER -h $PGHOST
createdb $PGDATABASE -p $PGPORT -U $PGUSER -h $PGHOST
pg_restore -U $PGUSER -h $PGHOST -p $PGPORT -W -F t -d $PGDATABASE $DUMP_FILENAME

echo '✨ Success!'