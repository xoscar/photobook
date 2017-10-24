echo 'installing global dependencies';
yarn global add pm2 grunt sails

echo 'instaling dependencies';

cd src && yarn;

echo 'starting server';

pm2 start app.js