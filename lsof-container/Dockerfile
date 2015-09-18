FROM ubuntu:14.04

RUN apt-get -y update  
RUN useradd codesampler -m -d /home/codesampler
RUN apt-get install -y lsof curl screen tmux
RUN echo "codesampler ALL=(ALL) NOPASSWD: /usr/bin/lsof" > /etc/sudoers
USER codesampler
WORKDIR /home/codesampler
ADD ./webserver /home/codesampler/webserver 
RUN /home/codesampler/webserver &
RUN nc -l 8080 &
CMD /bin/bash
