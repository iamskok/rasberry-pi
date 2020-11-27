# README.md

Boot up rasberry pi, open terminal and run `hostname -I`
to get an IP address. Update `hosts` file with an IP address.

Install `sshpass` on thу host machine `brew install hudochenkov/sshpass/sshpass`.

## Ansible

Install playbooks:

```sh
ansible-galaxy install viasite-ansible.zsh \
  fubarhouse.nodejs \
  ocha.yarn
```

Execure playbook:

```sh
ANSIBLE_HOST_KEY_CHECKING=false ansible-playbook -i hosts provision.yml
```
