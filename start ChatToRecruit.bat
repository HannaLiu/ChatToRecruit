echo "Starting ChatToRecruit app..."
c:
cd "C:/MongoDB/bin"
start mongod --dbpath C:/MongoDB/data/db
c:
cd "C:\Huan\GitHub\ChatToRecruit"
cd  server 
start nodemon server.js
cd ../src
start npm start