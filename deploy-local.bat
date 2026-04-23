@echo off
chcp 65001 >nul
echo ==========================================
echo    信奥知识库 - 本地构建部署脚本
echo ==========================================
echo.

:: 配置服务器信息
set SERVER_USER=root
set SERVER_HOST=你的服务器IP
set SERVER_PATH=/var/www/oi-knowledge-base

:: 步骤1: 本地构建
echo [1/4] 正在本地构建项目...
npm run docs:build
if errorlevel 1 (
    echo 构建失败！
    pause
    exit /b 1
)
echo 构建完成！
echo.

:: 步骤2: 打包
echo [2/4] 正在打包构建文件...
cd docs\.vitepress
tar -czf ..\..\dist.tar.gz dist
cd ..\..
echo 打包完成！
echo.

:: 步骤3: 上传到服务器
echo [3/4] 正在上传到服务器...
scp dist.tar.gz %SERVER_USER%@%SERVER_HOST%:%SERVER_PATH%/
if errorlevel 1 (
    echo 上传失败！请检查 SSH 连接。
    pause
    exit /b 1
)
echo 上传完成！
echo.

:: 步骤4: 在服务器上解压并重启
echo [4/4] 正在服务器上部署...
ssh %SERVER_USER%@%SERVER_HOST% "cd %SERVER_PATH% && tar -xzf dist.tar.gz && mv dist/.vitepress/dist dist.new 2>/dev/null || mv dist dist.new && rm -rf dist && mv dist.new dist && rm -f dist.tar.gz && docker-compose restart nginx"
if errorlevel 1 (
    echo 部署失败！
    pause
    exit /b 1
)
echo 部署完成！
echo.

:: 清理本地临时文件
del dist.tar.gz

echo ==========================================
echo    部署成功！
echo    访问地址: https://你的域名.com
echo ==========================================
pause