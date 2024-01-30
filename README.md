
# Tugboat

Tugboat is a collection of Docker utilities designed to simplify and automate various Docker operations, such as backing up and restoring images and volumes. This project aims to provide a set of tools that make working with Docker more efficient and user-friendly.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- Docker

### Installing

Clone the repository to your local machine:

\```bash
git clone https://github.com/[your-username]/Tugboat.git
cd Tugboat
\```

### Usage

#### Backup

To perform a backup of your Docker images and volumes:

\```bash
node backup.js
\```

Follow the prompts to enter the names of Docker images and volumes.

#### Restore

To restore your Docker images and volumes from a backup:

\```bash
node restore.js
\```

Again, follow the prompts to enter the names of Docker images and volumes.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your Changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the Branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## Future Plans

- Packaging as an NPM module for easier distribution and usage.
- Expanding the suite of tools to cover more aspects of Docker management.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- A big thank you to everyone who contributes to this project!
- Special thanks to my Mom Kim!
