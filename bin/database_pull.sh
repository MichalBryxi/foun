#!/bin/bash

DUMP_FILENAME='./foun.pudr.com_dump.sql'

#source ./backend/.env.production
#pg_dump -U $PGUSER -h $PGHOST -p $PGPORT -W -F t $PGDATABASE > $DUMP_FILENAME

source ./backend/.env.development
dropdb $PGDATABASE -p $PGPORT -U $PGUSER -h $PGHOST
createdb $PGDATABASE -p $PGPORT -U $PGUSER -h $PGHOST
pg_restore -U $PGUSER -h $PGHOST -p $PGPORT -W -F t -d $PGDATABASE $DUMP_FILENAME