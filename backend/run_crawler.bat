@echo off
REM ProXplore Backend - Run Crawler
echo ================================================
echo ProXplore Crawler
echo ================================================
echo.
echo This will crawl 50+ websites and create index.json
echo This may take several minutes...
echo.
pause

python crawler.py

echo.
echo ================================================
echo Crawler finished!
echo ================================================
pause
