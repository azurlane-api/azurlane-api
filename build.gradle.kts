import org.jetbrains.kotlin.gradle.tasks.KotlinCompile
import com.github.jengelman.gradle.plugins.shadow.tasks.ShadowJar

group = "info.kurozeropb.azurlane"
version = "2.0.0"

plugins {
    java
    application
    kotlin("jvm") version "1.3.50"
    id("com.github.johnrengelman.shadow") version "5.1.0"
}

buildscript {
    repositories {
        mavenCentral()
        jcenter()
    }

    dependencies {
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:1.3.50")
    }
}

application {
    mainClassName = "${group}.API"
}

defaultTasks("run")

repositories {
    mavenCentral()
    jcenter()
}

dependencies {
    implementation(kotlin("stdlib"))
    implementation("org.jsoup:jsoup:1.12.1")
    implementation("io.javalin:javalin:3.6.0")
    implementation("org.slf4j:slf4j-simple:1.8.0-beta4")
    implementation("com.fasterxml.jackson.core:jackson-databind:2.10.0")
    implementation("it.skrape:skrapeit-core:1.0.0-alpha1")
}

tasks.withType<KotlinCompile> {
    kotlinOptions.jvmTarget = "1.8"
}

tasks.withType<ShadowJar> {
    baseName = "azurlane-api"
    classifier = ""
    version = version
    destinationDir = file("build/libs")
}