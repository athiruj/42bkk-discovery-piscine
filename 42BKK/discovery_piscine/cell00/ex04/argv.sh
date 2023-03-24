chmod +x argv.sh 

if [ -z $@ ]
then
	echo "No arguments supplied"
else
	echo "$1"
	echo "$2"
	echo "$3"
fi
