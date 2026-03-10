# Kubernetes 存储详解 (PV, PVC, StorageClass)

在 Kubernetes 中，存储卷的管理涉及三个核心概念：**PersistentVolume (PV)**、**PersistentVolumeClaim (PVC)** 和 **StorageClass**。

---

## 1. 💾 PersistentVolume (PV) - 持久化卷

PV 是集群中的一块存储，由管理员配置或使用 StorageClass 动态制备。它是集群资源，就像节点（Node）是集群资源一样。

- **📦 性质**：集群级资源，不属于任何命名空间（Namespace）。
- **⏳ 生命周期**：独立于使用它的 Pod。
- **⚙️ 关键参数**：
  - `capacity`: 存储容量。
  - `accessModes`: 访问模式（ReadWriteOnce, ReadOnlyMany, ReadWriteMany）。
  - `persistentVolumeReclaimPolicy`: 回收策略（Retain, Delete, Recycle）。


## 2. 📑 PersistentVolumeClaim (PVC) - 持久化卷声明

PVC 是用户对存储的请求。它类似于 Pod，Pod 消耗节点资源，而 PVC 消耗 PV 资源。

- **🏷️ 性质**：命名空间级资源。
- **🔗 绑定**：PVC 会寻找符合条件的 PV 进行绑定。
- **⚙️ 关键参数**：
  - `accessModes`: 必须与 PV 匹配。
  - `resources`: 请求的最小存储大小。
  - `storageClassName`: 指定绑定的 StorageClass。


## 3. 🏗️ StorageClass (SC) - 存储类

StorageClass 为管理员提供了一种描述存储“类”的方法。它实现了 **动态制备 (Dynamic Provisioning)**，即在 PVC 请求时自动创建 PV。

- **🎯 作用**：避免管理员手动创建大量的 PV。
- **⚙️ 关键参数**：
  - `provisioner`: 决定使用哪个卷插件制备 PV。
  - `parameters`: 后端存储的特定参数。
  - `reclaimPolicy`: 自动创建的 PV 的回收策略。


## 4. 🔄 三者的关系

1. **StorageClass** 是 PV 的模板。
2. **PVC** 是用户的需求单。
3. **PV** 是实际提供的存储资源。

**💡 流程图示：**
- **静态模式**：管理员手动创建 PV -> 用户创建 PVC -> 绑定。
- **动态模式**：用户创建 PVC (指定 SC) -> SC 自动创建 PV -> 绑定。


## 5. 🛠️ 常用运维命令

### 🔍 查看资源
```bash
# 查看所有 PV
kubectl get pv

# 查看特定命名空间的 PVC
kubectl get pvc -n <namespace>

# 查看存储类
kubectl get sc
```

### 描述资源详情
```bash
kubectl describe pv <pv-name>
kubectl describe pvc <pvc-name> -n <namespace>
```
