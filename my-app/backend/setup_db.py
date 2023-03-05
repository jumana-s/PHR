import os
import psycopg2

conn = psycopg2.connect(
        host="localhost",
        database="flask",
        user=os.environ['DB_USERNAME'],
        password=os.environ['DB_PASSWORD'])

# Open a cursor to perform database operations
cur = conn.cursor()

# Execute a command: this creates a new table
cur.execute('DROP TABLE IF EXISTS users CASCADE;')
cur.execute('CREATE TABLE users (id INT GENERATED ALWAYS AS IDENTITY,'
                                 'fname varchar (100) NOT NULL,'
                                 'lname varchar (100) NOT NULL,'
                                 'phr_enc varchar (200),'
                                 'access_tree varchar (200),'
                                 'PRIMARY KEY(id));'
                                 )

cur.execute('DROP TABLE IF EXISTS login;')
cur.execute('CREATE TABLE login (id INT REFERENCES users,'
                                 'usr varchar (100) NOT NULL,'
                                 'pswd varchar (100) NOT NULL);'
                                 )

cur.execute('DROP TABLE IF EXISTS attributes;')
cur.execute('CREATE TABLE attributes (id INT REFERENCES users,'
                                 'attribute varchar (50) NOT NULL);'
                                 )

cur.execute('DROP TABLE IF EXISTS keys;')
cur.execute('CREATE TABLE keys (id INT REFERENCES users,'
            'public varchar (100) NOT NULL,'
            'master varchar (100) NOT NULL);')

conn.commit()

cur.close()
conn.close()
