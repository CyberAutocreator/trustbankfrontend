@echo off
REM === TrustBank Frontend Setup Script ===

echo Cloning GitHub repo...
git clone https://github.com/your-username/your-repo-name.git

cd your-repo-name

echo Installing dependencies...
npm install

echo Starting local development server...
npm start

echo Building production files...
npm run build

echo Staging all files...
git add .

echo Committing changes...
git commit -m "Finalize TrustBank frontend with layout, routing, and dashboard"

echo Pushing to GitHub main branch...
git push origin main

echo Done! Your project is running locally and deployed via Vercel.
pause
