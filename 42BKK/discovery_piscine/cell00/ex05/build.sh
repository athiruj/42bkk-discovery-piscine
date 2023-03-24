#!/bin/bash
chmod +x build.sh

for i in $@
	do 
		`mkdir "ex$i"`
	done
