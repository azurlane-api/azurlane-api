import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    application
    kotlin("jvm") version "1.3.50"
}

group = "info.kurozeropb"
version = "2.0.0"

repositories {
    mavenCentral()
    jcenter()
}

application {
    mainClassName = "info.kurozeropb.azurlaneapi"
}

dependencies {
    implementation(kotlin("stdlib"))
    implementation("org.jsoup:jsoup:1.12.1")
    implementation("io.javalin:javalin:3.6.0")
    implementation("org.slf4j:slf4j-simple:1.8.0-beta4")
    implementation("com.fasterxml.jackson.core:jackson-databind:2.10.0")
    implementation("it.skrape:skrapeit-core:1.0.0-alpha1")
}

tasks {
    compileKotlin {
        kotlinOptions.jvmTarget = "1.8"
    }
    compileTestKotlin {
        kotlinOptions.jvmTarget = "1.8"
    }
}