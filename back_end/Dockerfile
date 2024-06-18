FROM mysql:8.0

# Set environment variables for MySQL
ENV MYSQL_ROOT_PASSWORD=ninofullhd4k1080
ENV MYSQL_DATABASE=feria

# Copy the initialization SQL script to the Docker container
COPY db/init.sql /docker-entrypoint-initdb.d/

# Expose the default MySQL port
EXPOSE 3306
