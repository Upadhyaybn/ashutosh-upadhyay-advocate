FROM eclipse-temurin:25-jdk AS build

WORKDIR /app

COPY .mvn/ .mvn/
COPY mvnw mvnw
COPY mvnw.cmd mvnw.cmd
COPY pom.xml pom.xml

COPY src src

RUN chmod +x mvnw \
    && ./mvnw -DskipTests clean package


FROM eclipse-temurin:25-jre

WORKDIR /app

RUN addgroup --system spring \
    && adduser --system --ingroup spring spring

COPY --from=build \
    /app/target/advocate-api-0.0.1-SNAPSHOT.jar \
    app.jar

USER spring:spring

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]