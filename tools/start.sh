echo `instaling dependencies`;

cd src && yarn;

echo `starting server`;

pm2 start app.js