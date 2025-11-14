# 🚀 PM2 Process Manager Guide

Your bot is now running with PM2, which keeps it running forever!

## ✅ Current Status

Your bot is **RUNNING** and will:
- ✅ Restart automatically if it crashes
- ✅ Run in the background 24/7
- ✅ Keep logs of all activity
- ✅ Restart on system reboot (after setup)

## 📋 Useful PM2 Commands

### Check Bot Status
```bash
pm2 list
```

### View Live Logs
```bash
pm2 logs anachak-agriculture-bot
```

### View Last 50 Lines of Logs
```bash
pm2 logs anachak-agriculture-bot --lines 50 --nostream
```

### Restart Bot
```bash
pm2 restart anachak-agriculture-bot
```

### Stop Bot
```bash
pm2 stop anachak-agriculture-bot
```

### Start Bot (if stopped)
```bash
pm2 start anachak-agriculture-bot
```

### Delete Bot from PM2
```bash
pm2 delete anachak-agriculture-bot
```

### Monitor Bot Performance
```bash
pm2 monit
```

### Show Detailed Info
```bash
pm2 show anachak-agriculture-bot
```

## 🔄 Auto-Start on System Reboot

To make your bot start automatically when your computer reboots:

1. Run this command (copy the output from `pm2 startup`):
```bash
sudo env PATH=$PATH:/home/thounghacker/.config/nvm/versions/node/v24.11.0/bin /home/thounghacker/.config/nvm/versions/node/v24.11.0/lib/node_modules/pm2/bin/pm2 startup systemd -u thounghacker --hp /home/thounghacker
```

2. Save the current PM2 process list:
```bash
pm2 save
```

## 📊 Log Files Location

Your bot logs are stored in:
- **Output logs:** `logs/output-0.log`
- **Error logs:** `logs/error-0.log`
- **Combined logs:** `logs/combined-0.log`

## 🔧 Update Bot Code

When you make changes to your code:

```bash
# 1. Build the new code
npm run build

# 2. Restart the bot
pm2 restart anachak-agriculture-bot
```

## 🆘 Troubleshooting

### Bot not responding?
```bash
pm2 restart anachak-agriculture-bot
```

### Check for errors:
```bash
pm2 logs anachak-agriculture-bot --err
```

### Reset and restart:
```bash
pm2 delete anachak-agriculture-bot
pm2 start ecosystem.config.js
pm2 save
```

## 📱 Your Bot Info

- **Bot Name:** @cambochatAI_bot
- **Bot Title:** ទីប្រឹក្សាកសិកម្ម - Chatbot
- **Status:** Running 24/7 with PM2
- **Auto-restart:** Enabled
- **Memory Limit:** 1GB

## 🎯 Quick Start After Reboot

If you restart your computer and the bot doesn't auto-start:

```bash
cd /home/thounghacker/Desktop/Chatbot
pm2 start ecosystem.config.js
pm2 save
```

---

**Your bot is now running forever! 🚜🌾**
