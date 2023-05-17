FROM openjdk:8u342-jre
COPY target/hotel-frontend-0.0.1-SNAPSHOT.jar hotel-frontend.jar
ENTRYPOINT ["java", "-jar", "hotel-frontend.jar"]