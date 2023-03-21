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
                                 'PRIMARY KEY(id));'
                                 )

cur.execute('DROP TABLE IF EXISTS login;')
cur.execute('CREATE TABLE login (id INT REFERENCES users,'
                                 'usr varchar (100) NOT NULL,'
                                 'pswd varchar (100) NOT NULL);'
                                 )

cur.execute('DROP TABLE IF EXISTS attributes;')
cur.execute('CREATE TABLE attributes (id INT REFERENCES users,'
                                 'attribute varchar (1000) NOT NULL);'
                                 )

cur.execute('DROP TABLE IF EXISTS phr;')
cur.execute('CREATE TABLE phr (id INT REFERENCES users,'
                                 'ciphertext varchar (10000) NOT NULL);'
                                 )
cur.execute('DROP TABLE IF EXISTS inbox;')
cur.execute('CREATE TABLE inbox (id INT REFERENCES users, ciphertext varchar (10000) NOT NULL,'
                                'sender INT REFERENCES users);'
                                 )

conn.commit()

cur.close()
conn.close()
