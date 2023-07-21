FROM openjdk:17
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} pregunta-service-1.jar
ENTRYPOINT ["java", "-jar", "pregunta-service-1.jar"]