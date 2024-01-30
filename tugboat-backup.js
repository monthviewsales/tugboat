const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('Enter Docker image names (separated by a comma): ', (imageAnswer) => {
  const images = imageAnswer.split(',').map(img => img.trim()).filter(img => img)

  rl.question('Enter Docker volume names (separated by a comma): ', (volumeAnswer) => {
    const volumes = volumeAnswer.split(',').map(vol => vol.trim()).filter(vol => vol)

    backupDocker(images, volumes)
    rl.close()
  })
})

function backupDocker (images, volumes) {
  console.log('Backing up images:', images)
  console.log('Backing up volumes:', volumes)

  const backupDir = process.argv[2] || './backup' // You can pass the backup directory as an argument

  // Create backup directory if it doesn't exist
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true })
  }

  // Backup Docker Images
  images.forEach(image => {
    const imagePath = path.join(backupDir, `${image}.tar`)
    console.log(`Backing up Docker image: ${image}`)
    try {
      execSync(`docker save -o "${imagePath}" ${image}`)
    } catch (error) {
      console.error(`Error backing up image ${image}:`, error)
    }
  })

  // Backup Docker Volumes
  volumes.forEach(volume => {
    console.log(`Backing up Docker volume: ${volume}`)
    try {
      execSync(`docker run --rm -v ${volume}:/volume -v ${backupDir}:/backup alpine tar cvf /backup/${volume}.tar /volume`)
    } catch (error) {
      console.error(`Error backing up volume ${volume}:`, error)
    }
  })

  console.log('Backup completed successfully.')
}
