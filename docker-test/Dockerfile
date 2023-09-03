# The official OpenJDK base image with Java 11
FROM openjdk:11-jre-slim

# Set the working directory in the container
WORKDIR /app

# Copy the JAR file into the container
COPY target/grahak-0.0.1.jar grahak.jar

# Expose the port your application will run on
EXPOSE 8080

# Command to run the Spring Boot application
CMD ["java", "-jar", "grahak.jar"]