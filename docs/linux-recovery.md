# 恢复误删除的 /usr 目录指南

> **危险动作，请勿模仿！** 如果你不小心执行了 `rm -rf /usr`，这份指南可能是你的“救命稻草”。🚀
> 参考来源：[CSDN - 误删/usr后的系统恢复指南](https://blog.csdn.net/chinese_tiger/article/details/8238144)

---

## 🧠 预备知识

RPM 包的各种信息（包括包名、安装日期、文件的 MD5 校验信息等）都存放在 `/var/lib/rpm` 的数据库文件中。
只要这个目录没有被删除，我们就可以从中读取所需信息，从而恢复被误删的文件。

---

## 🛠️ 恢复步骤 (救援模式)

请使用安装光盘或启动 U 盘进入 **Rescue Mode**（救援模式）。

```bash
# 1️⃣ 校验系统中的所有安装包，找出丢失的文件
rpm -qaV --root /mnt/sysimage > /tmp/rpm_qaV.log

# 2️⃣ 提取所有校验结果为 "missing" 的文件路径
grep missing /tmp/rpm_qaV.log | awk '{print $NF}' > /tmp/missing_file

# 3️⃣ 查询每个被删除文件所属的 RPM 包名
for line in `cat /tmp/missing_file`; do 
    rpm -qf $line --root /mnt/sysimage >> /tmp/missing_rpm
done

# 4️⃣ 去重并生成需要重装的 RPM 列表
sort /tmp/missing_rpm | sort -u > /tmp/rpm_reinstall
cp /tmp/rpm_reinstall /mnt/sysimage/tmp

# 5️⃣ 挂载光盘并拷贝所需的 RPM 包到硬盘
mkdir -p /mnt/sysimage/tmp/rpms
mkdir -p /mnt/cdrom
mount /dev/cdrom /mnt/cdrom

for line in `cat /tmp/rpm_reinstall`; do  
    # 从光盘 Packages 目录查找并拷贝
    cp /mnt/cdrom/Packages/$line* /mnt/sysimage/tmp/rpms/
done
```

---

## 🌐 联网下载 RPM (可选)

如果你无法使用光盘，但环境支持联网，可以尝试使用 `yumdownloader`：

```bash
# 📥 准备联网下载环境
yum install yum-utils -y

# 🚀 批量下载缺失的 RPM 包及其依赖
for line in `cat /tmp/rpm_reinstall`; do  
    yumdownloader --resolve --destdir /tmp/rpms $line
done
```

---

## 🏗️ 重新安装与清理

现在我们已经得到了所有缺失文件所在的 RPM 包，最后一步是执行强制重装。

```bash
# 📂 进入救援系统的根挂载点
cd /mnt/sysimage

# ⚡ 强制重新安装 RPM 包（忽略依赖和冲突）
rpm -ivh /mnt/sysimage/tmp/rpms/* --root /mnt/sysimage --nodeps --force

# 🛡️ 如果开启了 SELinux，建议打上重标记标签
touch /.autorelabel
```

> **💡 提示：** 忽略安装过程中的各种警告信息。完成后重启系统，如果一切正常，恭喜你成功“起死回生”！☕
