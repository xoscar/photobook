echo `instaling global dependencies`;
yarn global pm2 grunt sails

echo `instaling dependencies`;

cd src && yarn;

echo `starting server`;

pm2 start app.js