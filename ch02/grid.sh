#!/bin/bash

#  https://github.com/SeleniumHQ/docker-selenium/tree/selenium-3

NETWORK_NAME=selenium-grid
SELENIUM_VERSION=3.141.59-20210804

shopt -s nocasematch
if [[ $1 == "start" ]] ; then
    echo "Starting..."
    docker network create $NETWORK_NAME
    docker run --rm -d -p 4444:4444 --net $NETWORK_NAME --name selenium-hub selenium/hub:$SELENIUM_VERSION
    sleep 2
    docker run --rm -d --net $NETWORK_NAME --name selenium-node-1 -e HUB_HOST=selenium-hub -v /dev/shm:/dev/shm selenium/node-chrome:$SELENIUM_VERSION
    docker run --rm -d --net $NETWORK_NAME --name selenium-node-2 -e HUB_HOST=selenium-hub -v /dev/shm:/dev/shm selenium/node-firefox:$SELENIUM_VERSION
    sleep 2
    open http://127.0.0.1:4444/grid/console
    # docker logs -f selenium-hub
    # docker logs -f selenium-node-2
elif [[ $1 == "stop" ]] ; then
    echo "Stopping..."
    docker stop selenium-node-2
    docker stop selenium-node-1
    docker stop selenium-hub
    docker network rm $NETWORK_NAME
else
    echo "Please specify start or stop."
fi


