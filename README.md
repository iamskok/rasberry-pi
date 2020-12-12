# README.md

Boot up rasberry pi, open terminal and run `hostname -I`
to get an IP address. Update `hosts` file with an IP address.

Install `sshpass` on thу host machine `brew install hudochenkov/sshpass/sshpass`.

## Ansible

Install playbooks:

```sh
ansible-galaxy install viasite-ansible.zsh \
  fubarhouse.nodejs \
  ocha.yarn \
  geerlingguy.docker_arm \
  geerlingguy.pip \
  && ansible-galaxy collection install ansible.posix
```

Execure playbook:

```sh
ANSIBLE_HOST_KEY_CHECKING=false ansible-playbook -i hosts provision.yml
```

## Clone the SD Card

```sh
sudo dd if=/dev/disk2 of=/Users/skok/dev/raspberry-pi/images/provisioned-pi.img
```

To check the status of `dd` command type <kbd>CTRL</kbd>+<kbd>T</kbd> in the terminal running `dd`.

## Configure SSH alias

```sh
host pi1
  hostname 192.168.1.1
  user root
  port 22
  IdentityFile ~/.ssh/id_rsa
```

## Copy files and directories

```sh
scp -r dual-color-led root@192.168.1.78:/home/pi/Projects/SunFounder_johny5
```

## Sync local directory with Pi

```sh
brew install fswatch
```

Watch `/Users/skok/dev/raspberry-pi/sun-founder` directory and copy it over in
`/home/pi/Projects` directory of a remote host.

```sh
fswatch -o /Users/skok/dev/raspberry-pi/sun-founder | xargs -n1 -I{} scp -r /Users/skok/dev/raspberry-pi/sun-founder root@192.168.1.78:/home/pi/Projects
```

## Watch for changes in Pi

Run `yarn <example-name>` inside of the project root directory. It will listen for changes and rerun node.js script on change.

## SSH config

```sh
host pi
  hostname 192.168.86.41
  user root
  port 22
  IdentityFile ~/.ssh/id_rsa
```

## Network configs

* Router `192.168.1.254`
* Google Wi-Fi Router LAN `192.168.86.1`
* Google Wi-Fi DHCP Pool
  - Pi eth0 `192.168.86.40`
  - Pi wlan0 `192.168.86.41`
* Pi Hole DHCP Pool `192.168.86.50 - 192.168.86.150`

## Links

- [raspi-io](https://github.com/nebrius/raspi-io)
- [johnny-five](https://github.com/rwaldron/johnny-five)
- [RPi pinout](https://pinout.xyz/pinout)