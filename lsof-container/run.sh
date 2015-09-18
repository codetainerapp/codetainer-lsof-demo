#!/bin/bash
nohup /home/codesampler/webserver &
nohup nc -l 8080 &
/bin/bash
