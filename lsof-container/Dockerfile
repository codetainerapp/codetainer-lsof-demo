FROM ubuntu:14.04

RUN apt-get -y update  
# Create a codesampler user
RUN useradd codesampler -m -d /home/codesampler

# install lsof and some other tools
RUN apt-get install -y lsof curl screen tmux 

# allow codesampler to run lsof as root
RUN echo "codesampler ALL=(ALL) NOPASSWD: /usr/bin/lsof" > /etc/sudoers

USER codesampler
WORKDIR /home/codesampler

# start a webserver and netcat by default
ADD ./webserver /home/codesampler/webserver 
ADD ./run.sh /run.sh
CMD /run.sh
