# 生鲜商店

[[DEMO](https://fs.zinglix.xyz)] [[Docker Hub](https://hub.docker.com/r/zinglix/freshfoodstore-fe)] [[后端](https://github.com/ZingLix/FreshFoodStore)]

这是一个在线购物系统的后端部分，以生鲜作为主题，支持

- [x] 买家购物
- [x] 卖家库存管理
- [x] 卖家进货
- [x] 采买基地供货
- [x] 资金系统

## 如何安装

### npm

首先运行 `npm i` 安装所需依赖，之后如果需要运行开发使用的服务器运行

```
npm start
```

或者如果想要生成发布的文件运行

```
npm run build
```

### Docker

本项目还支持通过 Docker 构建。如下是 `docker-compose.yml` 示例

```
version: '3'   
services:
  frontend:    
    image: zinglix/freshfoodstore-fe:latest   
    container_name: freshfoodstore-fe  
    restart: always    
    ports:      # 映射端口
      - 80:80
```

之后运行 `docker-compose up -d` 就会运行于 80 端口上。如果你需要将前后端同时使用 Docker 构建，看[这里](https://github.com/ZingLix/FreshFoodStore/wiki/%E4%BD%BF%E7%94%A8-Docker-%E8%BF%90%E8%A1%8C%E6%95%B4%E4%B8%AA%E7%B3%BB%E7%BB%9F)。