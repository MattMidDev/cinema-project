# Usa un'immagine Java come base
FROM openjdk:17-jdk-slim

# Crea una cartella dentro il container
WORKDIR /app

# Copia il JAR compilato
COPY target/*.jar app.jar

# Espone la porta 8080
EXPOSE 8080

# Comando per eseguire Spring Boot
ENTRYPOINT ["java", "-jar", "app.jar"]
