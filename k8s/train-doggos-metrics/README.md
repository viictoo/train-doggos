powershell commands
INSTALL choco in admin session
```
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor  3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
```

easy install helm using choco
```
 choco install kubernetes-helm
 ```

confirm install 
```
helm -version
```

create utf-8 yaml(compatible with helm)
opt 1(general)
```
kubectl create deployment nginx --image=nginx --dry-run=client --output=yaml > .\ourchart\templates\deployment.yaml
```
opt 2 (powershell specific for utf-8 compatible file)
```
kubectl create deployment nest-doggos-metrics --image viictoo/train-doggos --port 3000 --dry-run=client --output=yaml | Out-File .\deployment.yaml -Encoding UTF8
```

update dependencies
```
helm dependency update
```

install nestjs-metrics
```
helm install nestjs-metrics .
```

debugger( error cannot use same name )
fix [invalid leading UTF-8 octet](https://blog.kaniski.eu/2020/09/having-fun-with-helm-and-file-encoding/)

1. list all namespaces
opt 1
```
kubectl get secrets --all-namespaces
```
opt 2
```
helm list
```

2. mod the duplicate/existing namespace
```
helm delete <namespace>
```
```
helm upgrade -i <namespace> .
```
[stack overflow](https://stackoverflow.com/questions/70464815/cannot-install-kubernetes-helm-chart-error-cannot-re-use-a-name-that-is-still-i)


get pods
```
kubectl get pods
```
get logger logs

```
kubectl logs nest-doggos-metrics-6ff778bd94-4nwqq --follow
```

get running services and port mappings
```
kubectl get svc
```

here we see grafana on port 30179
```
nestjs-metrics-grafana                    NodePort    10.99.8.149      <none>        80:30179/TCP
```

get grafana login pass to access from browser on port 30179
```
kubectl get secret nestjs-metrics-grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo
```

11159

