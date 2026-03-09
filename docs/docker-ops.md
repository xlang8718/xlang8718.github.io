# 🐳 Docker 日常运维命令
---

## 📦 容器生命周期管理

容器是 Docker 的核心，掌握其生命周期是基础中的基础。

```bash
# ✨ 创建并启动容器
docker run -d --name nginx -p 80:80 nginx:alpine

# ⏯️ 启动/停止/重启容器
docker start nginx
docker stop nginx
docker restart nginx

# ⏸️ 暂停/恢复容器进程
docker pause nginx
docker unpause nginx

# 🗑️ 删除容器
docker rm nginx                    # 删除已停止容器
docker rm -f nginx                  # 强制删除运行中容器
docker container prune              # 删除所有已停止容器

# 🏷️ 重命名容器
docker rename old_name new_name
```

---

## 🔍 查看与监控

实时掌握容器状态是运维的关键。

```bash
# 📋 查看容器列表
docker ps                           # 查看运行中容器
docker ps -a                        # 查看所有容器（含已停止）
docker ps -a --format "table {{.Names}}\t{{.Status}}\t{{.Image}}"

# 🕵️ 查看容器详情
docker inspect nginx                 # 查看容器详细信息
docker inspect -f '{{.NetworkSettings.IPAddress}}' nginx  # 查看IP
docker inspect nginx | grep -i ip    # 快速查找IP

# 📜 查看日志
docker logs nginx                    # 查看所有日志
docker logs -f nginx                  # 实时跟踪日志
docker logs --tail 100 -f nginx       # 查看最后100行并跟踪
docker logs --since 10m nginx          # 查看最近10分钟日志
docker logs -t nginx                   # 显示时间戳

# 📊 查看资源使用
docker stats                          # 实时查看所有容器资源
docker stats nginx db                  # 查看指定容器
docker stats --no-stream                # 查看一次后退出
docker top nginx                        # 查看容器内进程

# 🔌 查看端口映射
docker port nginx
docker port nginx 80
```

---

## 📁 容器内操作

有时你需要深入容器内部进行调试或配置。

```bash
# 🚪 进入容器
docker exec -it nginx bash          # 进入容器（适用于centos/ubuntu）
docker exec -it nginx sh             # 进入容器（适用于alpine）
docker exec -it nginx /bin/bash       # 完整写法

# 👤 以指定用户进入
docker exec -it -u root nginx bash

# ⚡ 在容器内执行命令
docker exec nginx ls -la /app
docker exec nginx cat /etc/nginx/nginx.conf

# 📂 文件复制
docker cp app.conf nginx:/etc/nginx/  # 从主机复制到容器
docker cp nginx:/var/log/nginx/access.log ./  # 从容器复制到主机

# 🔄 查看容器内文件变化
docker diff nginx
```

---

## 🖼️ 镜像管理

镜像是容器的基石，良好的镜像管理可以节省大量磁盘空间。

```bash
# 🖼️ 查看镜像
docker images
docker images | grep none            # 查找虚悬镜像
docker images --digests               # 显示摘要

# 📥 拉取/推送镜像
docker pull nginx:alpine
docker push myregistry.com/app:v1

# 🏗️ 构建镜像
docker build -t myapp:v1 .
docker build -t myapp:v1 -f Dockerfile.prod .

# 🗑️ 删除镜像
docker rmi nginx:alpine               # 删除指定镜像
docker rmi $(docker images -q)         # 删除所有镜像
docker image prune                     # 删除未使用镜像
docker image prune -a                   # 删除所有未使用镜像（谨慎）

# 🏷️ 镜像标签
docker tag myapp:v1 myapp:latest
docker tag myapp:v1 myregistry.com/app:v1

# 💾 保存/加载镜像（离线部署）
docker save -o nginx.tar nginx:alpine
docker load -i nginx.tar

# 🕰️ 查看镜像历史
docker history nginx:alpine --no-trunc
```

---

## 🌐 网络管理

容器间的通信离不开网络配置。

```bash
# 🌐 查看网络
docker network ls
docker network inspect bridge

# ➕ 创建网络
docker network create --driver bridge mynet
docker network create --subnet=172.20.0.0/16 mynet2

# 🔗 连接/断开网络
docker network connect mynet nginx
docker network disconnect mynet nginx

# ❌ 删除网络
docker network rm mynet
docker network prune                   # 删除未使用网络
```

---

## 💾 数据卷管理

数据卷用于持久化存储容器产生的数据。

```bash
# 💾 创建数据卷
docker volume create mydata

# 🔍 查看数据卷
docker volume ls
docker volume inspect mydata

# ❌ 删除数据卷
docker volume rm mydata
docker volume prune                    # 删除未使用数据卷

# 🗄️ 数据卷备份
docker run --rm -v mydata:/data -v $(pwd):/backup alpine tar czf /backup/mydata.tar.gz /data
```

---

## 🏷️ 标签与过滤

通过强大的过滤功能，快速定位目标容器或镜像。

```bash
# 🧪 按条件过滤容器
docker ps -a --filter "status=exited"
docker ps -a --filter "name=nginx"
docker ps -a --filter "label=com.example.version=1.0"

# 🔍 按条件过滤镜像
docker images --filter "dangling=true"
docker images --filter "before=nginx:alpine"
docker images --filter "since=nginx:alpine"

# 📋 格式化输出
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"
```

---

## 🔧 系统维护

保持 Docker 环境整洁，避免磁盘撑爆。

```bash
# ℹ️ 查看Docker系统信息
docker version
docker info
docker system df                      # 查看磁盘使用情况

# 🧹 清理磁盘空间
docker system prune                    # 清理未使用的容器、网络、镜像
docker system prune -a                  # 清理所有未使用的资源（谨慎）
docker system prune --volumes            # 清理包括数据卷

# 🔔 查看事件流
docker events                           # 实时监控Docker事件
docker events --since '5m'               # 查看最近5分钟事件

# 📖 查看守护进程日志
journalctl -u docker -f                  # systemd系统
tail -f /var/log/docker.log               # 传统系统
```

---

## 🚑 故障排查

当容器运行不正常时，这些命令是你的救星。

```bash
# ❓ 查看容器退出原因
docker ps -a --filter "status=exited"
docker logs exited_container

# 🧠 检查容器资源限制
docker inspect container_name | grep -A 5 -B 5 Memory

# 📌 查看容器挂载点
docker inspect -f '{{json .Mounts}}' container_name | python -m json.tool

# 📶 测试网络连通性
docker exec nginx ping db
docker exec nginx curl http://db:3306

# 📦 导出容器文件系统
docker export nginx -o nginx.tar
docker import nginx.tar mynginx:latest
```

---

## 📝 实用组合命令

这些“一键”操作能极大地提高你的工作效率。

```bash
# 🗑️ 删除所有已停止容器
docker rm $(docker ps -a -q)

# 🔥 删除所有容器（含运行中）
docker rm -f $(docker ps -a -q)

# 🖼️ 删除所有镜像
docker rmi $(docker images -q)

# 🛑 停止所有容器
docker stop $(docker ps -q)

# ⚠️ 清理所有资源（谨慎！）
docker system prune -a --volumes

# 📍 查看容器IP列表
docker ps -q | xargs -n 1 docker inspect -f '{{.Name}} - {{.NetworkSettings.IPAddress}}'

# 📂 批量导出日志
for c in $(docker ps -q); do
    docker logs $c > logs/$c.log
done

# 🔄 批量重启容器（根据状态）
docker restart $(docker ps -q --filter "status=running")
```

---

## 💡 日常运维小技巧

### 1. 别名配置（提升效率神器）

将以下内容添加到 `~/.bashrc` 或 `~/.zshrc` 中：

```bash
alias dps='docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"'
alias dim='docker images'
alias dstop='docker stop $(docker ps -q)'
alias dclean='docker system prune -f'
alias dlogs='docker logs -f --tail 100'
alias dexec='docker exec -it'
```

### 2. 快速进入容器脚本

```bash
# 保存为 /usr/local/bin/dsh
#!/bin/bash
docker exec -it "$1" sh -c "if [ -f /bin/bash ]; then bash; else sh; fi"
# 使用: dsh nginx
```

### 3. 监控容器重启次数

```bash
docker ps -a --format "table {{.Names}}\t{{.Status}}\t{{.RestartCount}}"
```

### 4. 查看容器资源使用排名

```bash
docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}" | sort -k 2 -r
```
