# mongodb

## 启动

项目启动

```
npm run start
```

mongodb 默认使用的端口号是 27017

通过指定的配置文件进行启动

```bash
mongod --config /opt/mongodb/bin/etc/mongodb.conf(linux)
mongod --dbpath "$DBPATH"(windows)
//这里的$DAPATH需要指定为该项目中的db目录
```

## 查看是否启动

```bash
ss -tulnp |grep 27017(linux)
netstat -ano | findstr :27017 (windows)
```
