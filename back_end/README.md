### Database Setup

1. **Build the Docker Image**:

   The `docker build` command builds a Docker image from the Dockerfile in the `./back_end` directory and tags it as `mysql-img`.

   In the `./back_end` directory execute:

   ```bash
   docker build -t mysql-img ./
   ```

2. **Run the Docker Container**:

   The `docker run` command runs a container from the `mysql-img` image, names the container `mysql-cont`, maps port 3333 on your host to port 3306 in the container, and runs it in detached mode (`-d`).

   ```bash
   docker run -d -p 3333:3306 --name mysql-cont mysql-img
   ```

### Backend Setup

1. **Install Dependencies:**

   ```bash
   cd back_end
   npm install
   ```

2. **Start Server:**
   ```bash
   npm run dev
   ```
