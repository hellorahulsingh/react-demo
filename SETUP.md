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
    docker run -d -p 1010:80 ghcr.io/hellorahulsingh/react-demo:sha-b83daff25f31e668ffe44be6b376f3f8a71005b9
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

If things are not working locally. then spin up a t2-medium instance on ec2 with the name argocd and use. ssh to access the server
```
    chmod 400 ~/Documents/devsecops/rahul-argocd-setup.pem
    sudo ssh -i ~/Documents/devsecops/rahul-argocd-setup.pem ubuntu@3.16.130.18
    sudo apt update
    sudo apt install docker.io -y
    clear
    sudo usermod -aG docker ubuntu
    docker ps
```

=================================================

Run the app using docker and check in the browser
```
    sudo ssh -i ~/Documents/devsecops/rahul-argocd-setup.pem ubuntu@3.16.130.18
    docker ps
    docker login -u rahulsingh
    #### CHECK TEAMS ####
    docker run -d -p 80:80 ghcr.io/hellorahulsingh/react-demo:sha-b83daff25f31e668ffe44be6b376f3f8a71005b9
    open browser: http://3.16.130.18:80/
```

=================================================

Setup KIND-KUBERNETES
We are using kind kubernetes instead of minikube for cluster setup as it is light weight
Copy linux command & install for linux
```
    download kind kubernetes cluster: https://kind.sigs.k8s.io/docs/user/quick-start/
```

Create cluster
```
    kind create cluster --name=react-demo-cluster
```

=================================================

Install KUBECTL
https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/
Make sure that you run the download command
```
    curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl.sha256"
```
then you run the install command
```
    sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```
verify kubectl setup
```
    kubectl config current-context
    kubectl get nodes
```
=================================================

Install ARGOCD
https://argo-cd.readthedocs.io/en/stable/getting_started/

Run the following commands
```
    kubectl create namespace argocd
    kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```
verify argocd
```
    kubectl get pods -n argocd -w
```

=================================================

Delete the running docker image
```
    docker ps
    docker rm -f e3bf3e181b9f
    lsof -i :80
```

=================================================

Run ARGOCD

Port forwarding
```
    kubectl get svc -n argocd
    kubectl port-forward svc/argocd-server 9000:80 -n argocd --address 0.0.0.0
    open argocd in browser: http://3.16.130.18:9000/
```

You will not be able to access the page. This is because of inbound rules
Fix:
```
    1. Go to the instance
    2. open the instance in the browser
    3. go to security
    4. click on the security group of the instance
    5. edit inbound
    6. Include: Type(All traffic) + Source(Custom TCP)
    7. Save
    8. Try accessing: http://3.16.130.18:9000/
```

Now enter into argo cd
```
    username: admin
    password: <<<<<CHECK NEXT STEPS>>>> 
```

Access password
Open a new terminal
```
    ssh into the server: sudo ssh -i ~/Documents/devsecops/rahul-argocd-setup.pem ubuntu@3.129.42.188
    kubectl get secrets -n argocd
    kubectl edit secret argocd-initial-admin-secret -n argocd
```

You will see something like this
```
    apiVersion: v1
    data:
    password: dasdasdasdasdasda==
....
```

Run in the terminal
```
    echo dasdasdasdasdasda== | base64 --decode
```
Copy the password and paste in the argocd password input box

=================================================

Create the app manually inside argocd

=================================================

```
    kubectl get pods
    kubectl port-forward simple-react-app-7cff775786-2tndl 3700:80 --address 0.0.0.0
    Try accessing: http://3.16.130.18:3700/
```

=================================================

After every change
once the ghcr has run successfully
Do the synchronisation in argocd manually
```
    kubectl port-forward svc/argocd-server 9000:80 -n argocd --address 0.0.0.0
```

Run the cluster again
```
    kubectl get pods
    kubectl port-forward simple-react-app-<................> 3700:80 --address 0.0.0.0
```

PLEAE NOTE WE ARE NOT RUNNING ARGOCD AND CLUSTER TOGETHER HENCE THE SYNCING HAS TO BE DONE MANUALLY