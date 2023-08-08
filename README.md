dev

```
git clone
npm i
npm run dev
```

build and run

```
npm run build
node build
```

daemon

```
[Unit]
Description=cthulhu-character-sheets
Wants=network-online.target
After=network-online.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/cthulhu-character-sheets
ExecStart=/usr/bin/node build
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

demo

[https://ccs.misalili.com](https://ccs.misalili.com)
