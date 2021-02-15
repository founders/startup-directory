# Startup Directory

A startup directory built by [Founders](https://founders.illiois.edu) at the University of Illinois at Urbana-Champaign. Built on top of Next.js and Flask with MongoDB.

## Getting Started

Make sure you have [Docker Desktop](https://www.docker.com/products/docker-desktop) installed on your computer and proceed through the following steps:

### 1. Clone The Repository

```bash
git clone https://github.com/founders/startup-directory.git
```

### 2. Startup The Development Environment

```bash
docker-compose up
```

### 3. Create A New Branch

When building out a new feature or fixing an existing issue make sure to check into a new branch. Name your branch after a concise description of the ticket you are working on (e.g. `add responsive card`, `add /users endpoint`, etc)

```bash
git checkout -b <branch-name>
```

### 4. Commit Your Changes

```bash
git commit -m 'A Descriptive Message'
```

### 5. Push A Remote Branch

```bash
git push --set-upstream origin <branch-name>
# or simply
git push
```

### 6. Open a Pull Request

Open a Pull Request on Github, assign yourself to it and tag @SirajChokshi for a review.
