# mongodb

## 启动
默认使用的端口号是27017

通过指定的配置文件进行启动
```txt
mongod --config /opt/mongodb/bin/etc/mongodb.conf
```

## 查看是否启动
```bash
 ss -tulnp |grep 27017
```