# virtual host

sudo mkdir -p /app-var/cache
sudo mkdir -p /app-var/logs
rm -rf /app-var/cache/*
rm -rf /app-var/logs/*
sudo chown -R vagrant:vagrant /app-var
sudo chmod -R 777 /app-var

# ssl certs
sudo update-ca-trust force-enable
sudo mkdir -p /etc/ssl/certs
sudo mkdir -p /etc/ssl/private
sudo cp /app/vm/ssl-keys/acme.lh.cert.pem /etc/ssl/certs
sudo cp /app/vm/ssl-keys/acme.lh.key.pem /etc/ssl/private
sudo cp /app/vm/ssl-keys/acme.lh.cacert.pem /etc/pki/ca-trust/source/anchors
sudo update-ca-trust extract

service php-fpm restart
chmod 777 /var/run/php5-fpm-app.sock
chmod 1773 /var/lib/php/session

rm -rf /etc/nginx/conf.d/default.conf
cp /app/vm/etc/nginx/conf.d/*.conf /etc/nginx/conf.d
service nginx restart

cp /app/vm/etc/redis.conf /etc/redis.conf
service redis restart

cp /app/vm/etc/hosts /etc

service mysql stop
service mysql start
