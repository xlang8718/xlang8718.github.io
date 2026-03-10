# 容器镜像加速指南

> **在网络环境受限的情况下，使用镜像加速器可以显著提高 Docker 镜像的拉取速度。**
> 本文档汇总了当前主流的加速方案及常用镜像站。

---

## 🛠️ 配置 Docker 加速器 (推荐)

通过修改 `/etc/docker/daemon.json` 文件来配置加速地址。这是最常用且一劳永逸的方法。

```bash
cat > /etc/docker/daemon.json << EOF
{
  "exec-opts": ["native.cgroupdriver=systemd"],
  "registry-mirrors": [
    "https://docker.1ms.run",
    "https://hub1.nat.tf",
    "https://docker.1panel.live",
    "https://hub.rat.dev",
    "https://docker.amingg.com"
  ],
  "max-concurrent-downloads": 10,
  "log-driver": "json-file",
  "log-level": "warn",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "data-root": "/var/lib/docker"
}
EOF

# 重启 Docker 服务
systemctl daemon-reload
systemctl restart docker
```

---

## ⚡ DaoCloud 公开镜像加速

[DaoCloud 镜像加速项目](https://github.com/DaoCloud/public-image-mirror) 提供了稳定可靠的容器镜像服务。

### 1️⃣ 增加前缀 (推荐方式)
直接在镜像名称前增加加速地址前缀：

```bash
# 原始镜像
docker pull docker.io/library/busybox

# 加速镜像
docker pull m.daocloud.io/docker.io/library/busybox
```

### 2️⃣ 常用 Registry 替换规则
如果你不想修改代码或 YAML，可以使用前缀替换：

| 源站 | 替换为 | 备注 |
| :--- | :--- | :--- |
| `docker.io` | `docker.m.daocloud.io` | |
| `registry.k8s.io` | `k8s.m.daocloud.io` | |
| `gcr.io` | `gcr.m.daocloud.io` | |
| `ghcr.io` | `ghcr.m.daocloud.io` | |
| `quay.io` | `quay.m.daocloud.io` | |
| `mcr.microsoft.com` | `mcr.m.daocloud.io` | |
| `nvcr.io` | `nvcr.m.daocloud.io` | |
| `registry.ollama.ai` | `ollama.m.daocloud.io` | 加速 Ollama & DeepSeek |

---

## 🤖 Ollama & DeepSeek 加速 (实验性)

针对最近火热的 DeepSeek 模型，可以使用以下方式加速拉取：

```bash
# 使用加速源启动模型
docker exec -it ollama ollama run ollama.m.daocloud.io/library/deepseek-r1:1.5b
```

---

## 🔗 相关资源
- [DaoCloud 镜像加速 GitHub](https://github.com/DaoCloud/public-image-mirror)
- [Docker 官方文档 - 镜像仓库配置](https://docs.docker.com/engine/reference/commandline/pull/)
