const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const backupDir = process.argv[2] || './backup'; // You can pass the backup directory as an argument

// Create backup directory if it doesn't exist
if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
}

const images = ['your-image1', 'your-image2']; // Replace with your Docker images
const volumes = ['your-volume1', 'your-volume2']; // Replace with your Docker volumes

// Backup Docker Images
images.forEach(image => {
    const imagePath = path.join(backupDir, `${image}.tar`);
    console.log(`Backing up Docker image: ${image}`);
    execSync(`docker save -o "${imagePath}" ${image}`);
});

// Backup Docker Volumes
volumes.forEach(volume => {
    const volumePath = path.join(backupDir, `${volume}.tar`);
    console.log(`Backing up Docker volume: ${volume}`);
    execSync(`docker run --rm -v ${volume}:/volume -v ${backupDir}:/backup alpine tar cvf /backup/${volume}.tar /volume`);
});

console.log('Backup completed successfully.');
