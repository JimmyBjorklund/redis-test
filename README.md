# redis-test


Copy the config-template.js and edit the information to match your environment.

```
cp config/config-template.js config/config.js
```
Then deploy the configuration to your secrets.
```
kubectl create secret generic --from-file=./config/config.js redis-test.conf
```

Deploy the latest build
```
kubectl apply -f k8s/deployment.yaml
```