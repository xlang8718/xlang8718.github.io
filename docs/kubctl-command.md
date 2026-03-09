# ☸️ kubectl 日常命令

> **kubectl 常用操作命令速查表。**
> 涵盖了从集群信息、资源查看、变更操作到故障排查的高频命令。🚀

---

## 🔍 查看资源信息

### 🖥️ 节点 (Nodes)
*缩写: `no`*

```bash
# 📋 显示所有节点信息
kubectl get no

# 📊 显示所有节点的更多信息 (含 IP、内核版本等)
kubectl get no -o wide

# 🕵️ 显示节点详情
kubectl describe no

# 📄 以 YAML 格式显示节点详情
kubectl get no -o yaml

# 🧪 筛选指定标签的节点
kubectl get node --selector=[label_name]

# 📊 显示节点 (CPU/内存/存储) 实时使用情况
kubectl top node [node_name]
```

---

### 📦 容器组 (Pods)
*缩写: `po`*

```bash
# 📋 显示所有容器组信息
kubectl get po

# 📊 显示更多信息 (含 IP、所在节点)
kubectl get po -o wide

# 🕵️ 显示 Pod 详情
kubectl describe po

# 🏷️ 查看容器组的 Labels
kubectl get po --show-labels

# 🧪 按标签筛选
kubectl get po -l app=nginx

# 📄 以 YAML 格式导出
kubectl get po [pod_name] -o yaml

# 🏃 筛选运行中的 Pod
kubectl get pods --field-selector status.phase=Running
```

---

### 📂 命名空间 (Namespaces)
*缩写: `ns`*

```bash
# 📋 查看所有命名空间
kubectl get ns

# 🕵️ 查看命名空间详情
kubectl describe ns
```

---

### 🚀 无状态应用 (Deployments)
*缩写: `deploy`*

```bash
# 📋 查看所有 Deployment
kubectl get deploy

# 🕵️ 查看详情
kubectl describe deploy

# 📄 以 YAML 格式输出
kubectl get deploy -o yaml
```

---

### 🔌 服务 (Services)
*缩写: `svc`*

```bash
# 📋 查看所有 Service
kubectl get svc

# 🕵️ 查看详情
kubectl describe svc

# 🏷️ 查看标签
kubectl get svc --show-labels
```

---

### 👹 守护进程集 (DaemonSets)
*缩写: `ds`*

```bash
# 📋 查看所有 DaemonSet
kubectl get ds

# 🕵️ 查看所有命名空间下的 DaemonSet 详情
kubectl describe ds --all-namespaces
```

---

### 🔔 事件 (Events)
*缩写: `ev`*

```bash
# 📋 查看事件
kubectl get events

# ⏱️ 实时监控事件流
kubectl get events -w
```

---

### 👤 服务帐户 (ServiceAccounts)
*缩写: `sa`*

```bash
# 📋 查看所有 ServiceAccount
kubectl get sa

# 📄 导出 YAML
kubectl get sa default -o yaml > sa.yaml
```

---

### 📜 日志 (Logs)

```bash
# 📖 查看 Pod 日志
kubectl logs [pod_name]

# ⏱️ 查看最近 1 小时的日志
kubectl logs --since=1h [pod_name]

# 📏 查看最后 20 行日志
kubectl logs --tail=20 [pod_name]

# 🔄 实时跟踪日志
kubectl logs -f [pod_name]

# 📦 查看多容器 Pod 中指定容器的日志
kubectl logs -f -c [container_name] [pod_name]
```

---

### 🗃️ 持久化存储

- **持久卷 (PV)**: `kubectl get pv`
- **持久卷声明 (PVC)**: `kubectl get pvc`
- **存储类 (SC)**: `kubectl get sc`

---

## 🛠️ 变更资源属性

### 🏷️ 标签与污点

```bash
# 🏷️ 增加标签
kubectl label nodes <node-name> <label-key>=<label-value>

# ❌ 删除标签
kubectl label nodes <node-name> <label-key>-

# 🧪 添加污点
kubectl taint nodes [node_name] key=value:NoSchedule
```

---

### 🏗️ 维护与调度

```bash
# 🚫 节点维护 (设为不可调度)
kubectl cordon [node_name]

# ✅ 恢复节点调度
kubectl uncordon [node_name]

# 🧹 清空节点上的 Pod
kubectl drain [node_name] --ignore-daemonsets
```

---

### 🗑️ 删除与编辑

```bash
# ✏️ 编辑资源
kubectl edit pod [pod_name]

# 🗑️ 删除资源
kubectl delete pod [pod_name]
kubectl delete deploy [deploy_name]

# 📈 扩缩容
kubectl scale deploy [deploy_name] --replicas=5
```

---

## ➕ 添加资源

```bash
# 📄 从文件创建
kubectl apply -f [filename].yaml

# 🏃 快速运行一个 Pod
kubectl run nginx --image=nginx --restart=Never

# 🔌 暴露服务
kubectl expose deploy [name] --port=80 --type=NodePort

# 📄 预检并生成 YAML 文件
kubectl create deploy my-deploy --image=nginx --dry-run=client -o yaml > deploy.yaml
```

---

## 🌐 请求与集群信息

```bash
# ℹ️ 查看集群信息
kubectl cluster-info

# 🛠️ 查看配置上下文
kubectl config get-contexts

# 💓 查看组件状态
kubectl get componentstatus
```

---

## 🔗 另见

- [Kubernetes 官方参考文档](https://kubernetes.io/zh-cn/docs/reference/kubectl/)
