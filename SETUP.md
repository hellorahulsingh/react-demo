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

Add the token generated above to your repo
1. go to repo
2. go to settings of the repo
3. left menu -> secrets and variabled -> actions
4. create new repository secret
4. fill the details
   TOKEN
   #### CHECK TEAMS ####

=================================================

Run the image after cicd pipeline has triggered and check the new image path in kubernetes/deployment.yml file
for locally running the docker ghcr image, use the following command
```
    docker run -d -p 1010:80 ghcr.io/hellorahulsingh/react-demo:sha-7a7901fb81ed1fde04b316600a22bfe10cd5a74b
    open browser: http://localhost:1010/
```

if you are getting unaithorized issue for the above docker run command, follow this
```
    Image visibility: If the image is private, then login is mandatory, and your GitHub user must have access to the repo that hosts the image.

    To make the image public, go to:
    GitHub > your repo > Packages > react-demo > Package settings
    → Set visibility to public
```
=================================================
