#back

cd back

gradlew build

docker build . -t back:0.1

docker run -it -d -p 8080:8080 --rm back:0.1



#front

cd front

docker build -t front:0.1 .

docker run -d -p 80:80 front:0.1

