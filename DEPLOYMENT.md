# 部署指南

本文档详细说明如何将信奥知识库部署到你的 Ubuntu 服务器。

## 前置要求

### 服务器配置

- **操作系统**: Ubuntu 18.04+ / Debian 10+
- **内存**: 至少 4GB RAM
- **存储**: 至少 20GB 可用空间
- **CPU**: 2 核心以上

### 软件要求

- Docker 20.10+
- Docker Compose 1.29+
- Git
- Nginx (可选，如果不使用 Docker 中的 Nginx)

## 一、服务器环境准备

### 1. 更新系统

```bash
sudo apt update
sudo apt upgrade -y
```

### 2. 安装 Docker

```bash
# 安装依赖
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# 添加 Docker 官方 GPG 密钥
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# 添加 Docker 仓库
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

# 安装 Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

# 启动 Docker
sudo systemctl start docker
sudo systemctl enable docker

# 验证安装
docker --version
```

### 3. 安装 Docker Compose

```bash
# 下载 Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# 添加执行权限
sudo chmod +x /usr/local/bin/docker-compose

# 验证安装
docker-compose --version
```

### 4. 配置 Docker 用户组（可选）

```bash
# 将当前用户添加到 docker 组
sudo usermod -aG docker $USER

# 重新登录使配置生效
```

## 二、部署项目

### 1. 克隆仓库

```bash
cd /var/www
sudo git clone https://github.com/yourusername/oi-knowledge-base.git
cd oi-knowledge-base
```

### 2. 配置环境变量

```bash
# 复制环境变量模板
cp .env.example .env

# 编辑环境变量
nano .env
```

修改以下内容：

```env
# 生成强密码
MEILI_MASTER_KEY=$(openssl rand -base64 32)
POSTGRES_PASSWORD=$(openssl rand -base64 32)
JUDGE0_AUTH_TOKEN=$(openssl rand -base64 32)
```

### 3. 配置 Nginx

编辑 `nginx/conf.d/default.conf`，修改域名：

```nginx
server_name your-domain.com www.your-domain.com;
```

### 4. 配置 SSL 证书

#### 使用 Let's Encrypt（推荐）

```bash
# 安装 Certbot
sudo apt install -y certbot

# 获取证书
sudo certbot certonly --standalone -d your-domain.com -d www.your-domain.com

# 复制证书到项目目录
sudo mkdir -p nginx/ssl
sudo cp /etc/letsencrypt/live/your-domain.com/fullchain.pem nginx/ssl/
sudo cp /etc/letsencrypt/live/your-domain.com/privkey.pem nginx/ssl/
```

#### 自动续期

```bash
# 添加定时任务
sudo crontab -e

# 添加以下行（每天凌晨 2 点检查并续期）
0 2 * * * certbot renew --quiet && cp /etc/letsencrypt/live/your-domain.com/*.pem /var/www/oi-knowledge-base/nginx/ssl/ && docker-compose restart nginx
```

### 5. 创建数据目录

```bash
sudo mkdir -p data/meili_data data/postgres_data data/redis_data
sudo chown -R $USER:$USER data
```

### 6. 启动服务

```bash
# 启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f
```

## 三、初始化搜索引擎

### 1. 配置 Meilisearch

```bash
# 进入 Meilisearch 容器
docker exec -it oi-meilisearch sh

# 或使用 API 配置
curl -X POST 'http://localhost:7700/indexes' \
  -H 'Authorization: Bearer YOUR_MEILI_MASTER_KEY' \
  -H 'Content-Type: application/json' \
  --data-binary '{
    "uid": "docs",
    "primaryKey": "id"
  }'
```

### 2. 索引文档内容

创建索引脚本 `scripts/index-docs.js`:

```javascript
const MeiliSearch = require('meilisearch')
const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const client = new MeiliSearch({
  host: 'http://localhost:7700',
  apiKey: process.env.MEILI_MASTER_KEY
})

async function indexDocs() {
  const index = client.index('docs')
  const docs = []
  
  // 递归读取所有 .md 文件
  function readDocs(dir) {
    const files = fs.readdirSync(dir)
    files.forEach(file => {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)
      
      if (stat.isDirectory()) {
        readDocs(filePath)
      } else if (file.endsWith('.md')) {
        const content = fs.readFileSync(filePath, 'utf-8')
        const { data, content: body } = matter(content)
        
        docs.push({
          id: filePath.replace(/\\/g, '/'),
          title: data.title || file.replace('.md', ''),
          content: body,
          path: filePath.replace('docs/', '/').replace('.md', '')
        })
      }
    })
  }
  
  readDocs('./docs')
  
  await index.addDocuments(docs)
  console.log(`Indexed ${docs.length} documents`)
}

indexDocs()
```

运行索引：

```bash
npm install meilisearch gray-matter
node scripts/index-docs.js
```

## 四、配置 GitHub Actions 自动部署

### 1. 生成 SSH 密钥

在本地电脑上：

```bash
ssh-keygen -t rsa -b 4096 -C "github-actions"
```

### 2. 配置服务器

将公钥添加到服务器：

```bash
# 在服务器上
cat >> ~/.ssh/authorized_keys << EOF
your-public-key-here
EOF
```

### 3. 配置 GitHub Secrets

在 GitHub 仓库设置中添加以下 Secrets：

- `SSH_PRIVATE_KEY`: SSH 私钥内容
- `REMOTE_HOST`: 服务器 IP 地址
- `REMOTE_USER`: SSH 用户名（通常是 root 或 ubuntu）
- `REMOTE_TARGET`: 部署目标路径（如 `/var/www/oi-knowledge-base/dist`）

### 4. 推送代码触发部署

```bash
git add .
git commit -m "Initial deployment"
git push origin main
```

## 五、验证部署

### 1. 检查服务状态

```bash
# 查看所有容器状态
docker-compose ps

# 应该看到所有服务都是 Up 状态
```

### 2. 测试网站访问

```bash
# 测试 HTTP
curl http://your-domain.com

# 测试 HTTPS
curl https://your-domain.com
```

### 3. 测试搜索功能

```bash
curl -X POST 'https://your-domain.com/api/search/indexes/docs/search' \
  -H 'Content-Type: application/json' \
  --data-binary '{"q": "二分查找"}'
```

### 4. 测试代码执行

```bash
curl -X POST 'https://your-domain.com/api/execute/submissions' \
  -H 'Content-Type: application/json' \
  --data-binary '{
    "source_code": "#include <iostream>\nusing namespace std;\nint main() { cout << \"Hello\" << endl; return 0; }",
    "language_id": 54,
    "stdin": ""
  }'
```

## 六、日常维护

### 更新代码

```bash
cd /var/www/oi-knowledge-base
git pull origin main
npm run docs:build
docker-compose restart nginx
```

### 查看日志

```bash
# 查看所有服务日志
docker-compose logs -f

# 查看特定服务日志
docker-compose logs -f nginx
docker-compose logs -f meilisearch
docker-compose logs -f judge0-server
```

### 备份数据

```bash
# 备份脚本
#!/bin/bash
BACKUP_DIR="/backup/oi-knowledge-base"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# 备份数据库
docker exec oi-judge0-db pg_dump -U judge0 judge0 > $BACKUP_DIR/postgres_$DATE.sql

# 备份 Meilisearch 数据
tar -czf $BACKUP_DIR/meili_$DATE.tar.gz data/meili_data

# 保留最近 7 天的备份
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
```

### 重启服务

```bash
# 重启所有服务
docker-compose restart

# 重启特定服务
docker-compose restart nginx
```

### 停止服务

```bash
# 停止所有服务
docker-compose down

# 停止并删除数据
docker-compose down -v
```

## 七、性能优化

### 1. 启用 HTTP/2

已在 Nginx 配置中启用。

### 2. 配置 CDN

建议使用 Cloudflare 或其他 CDN 服务加速静态资源。

### 3. 数据库优化

编辑 `docker-compose.yml`，增加 PostgreSQL 配置：

```yaml
judge0-db:
  environment:
    - POSTGRES_SHARED_BUFFERS=256MB
    - POSTGRES_EFFECTIVE_CACHE_SIZE=1GB
```

### 4. 监控配置

安装 Prometheus + Grafana 监控：

```bash
# 添加到 docker-compose.yml
prometheus:
  image: prom/prometheus
  volumes:
    - ./prometheus.yml:/etc/prometheus/prometheus.yml
  ports:
    - "9090:9090"

grafana:
  image: grafana/grafana
  ports:
    - "3000:3000"
```

## 八、故障排查

### 问题 1: 容器无法启动

```bash
# 查看详细日志
docker-compose logs [service-name]

# 检查端口占用
sudo netstat -tulpn | grep [port]
```

### 问题 2: 搜索功能不工作

```bash
# 检查 Meilisearch 状态
curl http://localhost:7700/health

# 重新索引
node scripts/index-docs.js
```

### 问题 3: 代码执行超时

编辑 `nginx/conf.d/default.conf`，增加超时时间：

```nginx
proxy_read_timeout 120s;
```

### 问题 4: SSL 证书问题

```bash
# 检查证书有效期
sudo certbot certificates

# 手动续期
sudo certbot renew
```

## 九、安全建议

1. **定期更新系统和 Docker 镜像**
2. **使用强密码**
3. **配置防火墙**
4. **限制 SSH 访问**
5. **启用日志审计**
6. **定期备份数据**

## 十、联系支持

如果遇到问题，可以：

- 查看 [GitHub Issues](https://github.com/yourusername/oi-knowledge-base/issues)
- 加入 QQ 群: 123456789
- 发送邮件: support@example.com

---

祝部署顺利！🚀
