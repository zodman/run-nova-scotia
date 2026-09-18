const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'images');
fs.mkdirSync(targetDir, { recursive: true });

const downloads = [
  {
    url: 'https://runnovascotia.ca/wp-content/uploads/2023/02/run-nova-scotia-logo-01.png',
    dest: path.join(targetDir, 'rns-logo.png')
  },
  {
    url: 'https://runnovascotia.ca/wp-content/uploads/2023/02/run-nova-scotia-logo-02.png',
    dest: path.join(targetDir, 'rns-logo-white.png')
  },
  {
    url: 'https://zunzoreact.vercel.app/images/about/graphic-box.png',
    dest: path.join(targetDir, 'graphic-box.png')
  }
];

downloads.forEach(item => {
  const file = fs.createWriteStream(item.dest);
  https.get(item.url, res => {
    if (res.statusCode === 200) {
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log('Downloaded:', path.basename(item.dest));
      });
    } else {
      console.log('Failed:', item.url, res.statusCode);
    }
  }).on('error', err => {
    console.error('Error on', item.url, err.message);
  });
});
