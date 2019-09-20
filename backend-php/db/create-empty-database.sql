drop schema if exists acme_db;
create schema acme_db default character set utf8 collate utf8_bin;
grant all on acme_db.* to acme_db_adm@localhost identified by 'someSpecialPASS1199';
grant all on acme_db.* to 'acme_db_adm'@ identified by 'someSpecialPASS1199';
grant all on acme_db.* to 'acme_db_adm'@'10.0.2.2' identified by 'someSpecialPASS1199';

grant all on *.* to 'root'@'%';

set @@GLOBAL.general_log = 0;

flush privileges;
