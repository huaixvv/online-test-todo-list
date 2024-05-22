## First、前端项目： todo-list-frontend

1、安装依赖 ```npm i```

2、启动项目 ```npm run dev```


### Next、后端next项目： todo-list-server

1、安装依赖 ```npm i```

2、更改/lib/db.ts下的数据库配置

```
数据库脚本：

CREATE DATABASE todo_db;
create table if not exists todos
(
	id int auto_increment
		primary key,
	description varchar(255) not null,
	completed tinyint(1) default 0 not null
);

更改数据库配置
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'todo_db',
});
```

3、启动项目 ```npm run dev```

### Last、接口说明
```
1、获取todo列表： localhost:3000/api/todo/list
GET  请求


2、添加todo任务： localhost:3000/api/todo/add
POST 参数: {description: 'job desc'}


3、删除todo任务： localhost:3000/api/todo/delete
POST 参数: {id: 1}


4、完成todo任务： localhost:3000/api/todo/complete
POST 参数: {id: 1}
```