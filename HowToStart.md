#back

cd back

gradlew build

docker build . -t back:0.1

#docker run -it -d -p 8080:8080 --rm back:0.1

#컨테이너와 aws의 /home/ubuntu/uploads 와 데이터 공유

docker run -it --name=back -d -v ~/uploads:/uploads -p 8080:8080 --rm back:0.1



#front

cd front

docker build -t front:0.1 .

docker run -d -v ~/uploads:/uploads -p 80:80 front:0.1



#실행이후 다음과 같은 명령어를 통해 컨테이너에 접속

docker exec -it [container_ID] /bin/bash

#이미지에 접근할 수 있도록 forward설정

```bash
server {
	listen 80;
	location / {
		root /user/share/nginx/html;
		index index.html index.html;
		try_files $uri $uri/ /index.html =404;
	}
	#이부분만 수정함
	loaction /images{
		alias /uploads;
	}
	#
	include /etc/nginx/extra-conf.d/*.conf;
}
```

이후 docker restart [Container_ID] 를통해 nginx를 재시작할수 있도록함.





