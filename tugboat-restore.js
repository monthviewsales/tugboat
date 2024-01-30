const { execSync } = require('child_process')
const path = require('path')
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('Enter Docker image names to restore (separated by a comma): ', (imageAnswer) => {
  const images = imageAnswer.split(',').map(img => img.trim()).filter(img => img)

  rl.question('Enter Docker volume names to restore (separated by a comma): ', (volumeAnswer) => {
    const volumes = volumeAnswer.split(',').map(vol => vol.trim()).filter(vol => vol)

    restoreDocker(images, volumes)
    rl.close()
  })
})

function restoreDocker (images, volumes) {
  console.log('Restoring images:', images)
  console.log('Restoring volumes:', volumes)

  const restoreDir = process.argv[2] || './backup' // You can pass the restore directory as an argument

  // Restore Docker Images
  images.forEach(image => {
    const imagePath = path.join(restoreDir, `${image}.tar`)
    console.log(`Restoring Docker image: ${image}`)
    try {
      execSync(`docker load -i "${imagePath}"`)
    } catch (error) {
      console.error(`Error restoring image ${image}:`, error)
    }
  })

  // Restore Docker Volumes
  volumes.forEach(volume => {
    console.log(`Restoring Docker volume: ${volume}`)
    try {
      execSync(`docker run --rm -v ${volume}:/volume -v ${restoreDir}:/backup alpine tar xvf /backup/${volume}.tar -C /volume`)
    } catch (error) {
      console.error(`Error restoring volume ${volume}:`, error)
    }
  })

  console.log('Restore completed successfully.')
}
