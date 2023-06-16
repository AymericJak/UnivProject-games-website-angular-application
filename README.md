# Application Angular - Ludothèque

## Mise en route sans Docker

```shell
npm install -g @angular/cli
npm install
ng s
```

## Mise en route avec Docker en développement

```shell
docker build . -t angular-app -f Dockerfile-dev
docker run -p 4200:4200 angular-app
```
