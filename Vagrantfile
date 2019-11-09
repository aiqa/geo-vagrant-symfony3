Vagrant.configure("2") do |config|
  config.vm.box = "geo_v0.2.2"
  config.vm.box_url = "https://s3.eu-central-1.amazonaws.com/vm-box-storage/geo_v0.2.2.box"

  config.vm.provider "virtualbox" do |vb|
    vb.customize ["modifyvm", :id, "--memory", "4096"]
    vb.customize ["modifyvm", :id, "--cpus", "12"]
  end

  config.vm.hostname = "geography.lh"

  config.vm.network "private_network", ip: "10.0.0.120"

  config.vm.synced_folder ".", "/app", :nfs => true
  config.vm.synced_folder "../composer_cache", "/composer_cache", :nfs => true

  config.vm.provision "shell", inline: "cp /app/.bash_profile /home/vagrant"

  config.vm.provision "shell", inline: "/app/vm/vhost.sh", run: "always"
  config.vm.provision "shell", inline: "/app/backend-php/reload-fixtures.sh", run: "always"
  config.vm.provision "shell", inline: "/app/behat/install.sh", run: "always"
  config.vm.provision "shell", inline: "chown -R vagrant:vagrant /app-var && chmod -R 777 /app-var && chmod -R 777 /tmp && mkdir -p /tmp/behat_gherkin_cache && chmod -R 777 /tmp/behat_gherkin_cache", run: "always"
  config.vm.provision "shell", inline: "mkdir -p /home/vagrant/bin && curl -fsSL -o /home/vagrant/bin/aiqa https://vm-box-storage.s3.eu-central-1.amazonaws.com/aiqa && chmod u+x /home/vagrant/bin/aiqa && chown vagrant:vagrant /home/vagrant/bin/aiqa", run: "always"
end
