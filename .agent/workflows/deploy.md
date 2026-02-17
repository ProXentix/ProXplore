---
description: Deploy ProXplore app and backend
---

# Deploy ProXplore

Complete deployment workflow for ProXplore search engine.

## Backend Deployment

### 1. Prepare Backend

```bash
cd backend
pip install -r requirements.txt
python crawler.py
```

### 2. Test Backend Locally

```bash
python server.py
```

Test endpoint:
```bash
curl "http://localhost:8080/search?q=test"
```

### 3. Deploy Backend (Production)

For production deployment, use a WSGI server:

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:8080 server:app
```

## Mobile App Deployment

### 1. Update Backend URL

Edit your app's API configuration to point to production backend:
```javascript
const API_URL = 'https://your-backend-domain.com/search';
```

### 2. Build APK

// turbo
```bash
eas build --platform android --profile production
```

### 3. Download and Test APK

Once build completes, download and install on test device.

## Verification

1. **Backend**: Visit health endpoint `http://your-backend/health`
2. **Mobile App**: Test search functionality from app
3. **API**: Verify CORS works from mobile device

## Notes

- Backend must be accessible from internet for remote mobile access
- Consider using cloud hosting (Heroku, Railway, DigitalOcean)
- Enable HTTPS for production
