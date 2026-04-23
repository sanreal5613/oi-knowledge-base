#!/bin/bash
# ==========================================
# 信奥知识库 - 服务器端部署脚本
# 适用于服务器资源有限，仅在服务器上部署不构建
# ==========================================

set -e

PROJECT_DIR="/var/www/oi-knowledge-base"

echo "=========================================="
echo "    信奥知识库 - 服务器部署脚本"
echo "=========================================="
echo ""

# 检查 dist 文件夹是否存在
if [ ! -d "$PROJECT_DIR/dist" ]; then
    echo "错误: dist 文件夹不存在！"
    echo "请先上传构建好的 dist 文件夹到 $PROJECT_DIR/"
    echo ""
    echo "本地执行: scp -r docs/.vitepress/dist root@你的服务器IP:$PROJECT_DIR/"
    exit 1
fi

cd $PROJECT_DIR

# 步骤1: 检查 Docker 是否运行
echo "[1/4] 检查 Docker 状态..."
if ! docker info > /dev/null 2>&1; then
    echo "Docker 未运行，正在启动..."
    systemctl start docker
fi
echo "Docker 运行正常"
echo ""

# 步骤2: 配置环境变量
echo "[2/4] 检查环境变量..."
if [ ! -f ".env" ]; then
    echo "创建 .env 文件..."
    cat > .env << 'EOF'
MEILI_MASTER_KEY=your-meili-master-key-change-this-in-production
POSTGRES_PASSWORD=your-postgres-password-change-this-in-production
JUDGE0_AUTH_TOKEN=your-judge0-auth-token-change-this-in-production
EOF
    echo "警告: 已创建默认 .env 文件，请在生产环境中修改密码！"
fi
echo "环境变量已配置"
echo ""

# 步骤3: 创建数据目录
echo "[3/4] 创建数据目录..."
mkdir -p data/meili_data data/postgres_data data/redis_data
echo "数据目录已创建"
echo ""

# 步骤4: 启动服务
echo "[4/4] 启动 Docker 服务..."
docker-compose up -d

echo ""
echo "=========================================="
echo "    部署成功！"
echo "=========================================="
echo ""
echo "服务状态:"
docker-compose ps
echo ""
echo "访问地址:"
echo "  - 网站: https://你的域名.com"
echo "  - Meilisearch: http://localhost:7700"
echo "  - Judge0: http://localhost:2358"
echo ""
echo "查看日志: docker-compose logs -f"