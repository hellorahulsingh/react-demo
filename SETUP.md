=================================================

Project Setup (from scratch)

```
    nvm use 20.12.1
    npx create-react-app react-demo
```

Run project
```
   cd react-demo
   npm start
   open browser: http://localhost:3000
```
=================================================

Build project

```
   cd react-demo
   npm run build
```

Run the builded app (runs the build directory)
```
    npm install -g serve
    serve -s build
    open browser: http://localhost:3000
```

=================================================

Build docker locally
```
docker build -t react-demo:v1 .
```

Run docker locally and test it
```
    docker run -d -p 9099:80 react-demo:v1
    open browser: http://localhost:9099/
```

=================================================

Github for container registry: https://ghcr.io [WE WILL BE USING THIS]
Docker for container registry: dockerhub
AWS for container registry: AWS ECR

=================================================

Create access token in github, so that you can access ghcr.io using access token(check ci-cd.yml: line 103)
https://youtu.be/Ke_Wr5zPE0A?t=3279

=================================================