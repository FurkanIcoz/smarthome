#include <Arduino.h>
#include <WiFi.h>
#include <FirebaseESP32.h>
#include <DHT.h>
#include <addons/TokenHelper.h>
#include <addons/RTDBHelper.h>


#define WIFI_SSID           "mertPC"
#define WIFI_PASSWORD       "xxfirexx321"
#define API_KEY             "AIzaSyDbOElab7hums6C-KBMvEQ-pTusiRW4n-A"
#define USER_EMAIL          "mert@gmail.com"
#define USER_PASSWORD       "1234567"
#define DATABASE_URL        "https://smart-home-7a23e-default-rtdb.firebaseio.com/"
#define DATABASE_SECRET     "DATABASE_SECRET"
#define DHTPIN              4 // DHT11 sensörünün bağlı olduğu GPIO pini
#define DHTTYPE             DHT11 // DHT11 sensörü tipi
#define MQ135PIN            36 // MQ-135 sensörünün bağlı olduğu analog pin

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;
DHT dht(DHTPIN, DHTTYPE);


void setup() {
    Serial.begin(115200);

    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print("Connecting to Wi-Fi");
    while (WiFi.status() != WL_CONNECTED) {
        Serial.print(".");
        delay(300);
    }
    Serial.println();
    Serial.print("Connected with IP: ");
    Serial.println(WiFi.localIP());
    Serial.println();

    Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);

    // Firebase Ayarları
    config.api_key = API_KEY;
    auth.user.email = USER_EMAIL;
    auth.user.password = USER_PASSWORD;
    config.database_url = DATABASE_URL;

    Firebase.reconnectNetwork(true);
    fbdo.setBSSLBufferSize(4096, 1024 );
    fbdo.setResponseSize(4096);

    config.token_status_callback = tokenStatusCallback;

    Firebase.begin(&config, &auth);

    dht.begin();
}

void loop() {
    if (Firebase.ready()) {
        float temperature = dht.readTemperature();
        float humidity = dht.readHumidity();

        if (isnan(temperature) || isnan(humidity)) {
            Serial.println("DHT11 sensöründen veri alınamadı!");
            return;
        }

        int airQualityValue = analogRead(MQ135PIN);

        String userId = "kXUMkx3RYAf8unFQDOsnEmgkUon1";
        String userPath = "users/" + userId + "/sensors/";

        if (Firebase.setFloat(fbdo, userPath + "Temperature", temperature)) {
            Serial.println("Sıcaklık verisi başarıyla gönderildi.");
        } else {
            Serial.println("HATA: " + fbdo.errorReason());
        }

        if (Firebase.setFloat(fbdo, userPath + "Humidity", humidity)) {
            Serial.println("Nem verisi başarıyla gönderildi.");
        } else {
            Serial.println("HATA: " + fbdo.errorReason());
        }

        if (Firebase.setInt(fbdo, userPath + "Hava Kalitesi Değeri: ", airQualityValue)) {
            Serial.println("Hava kalitesi verisi başarıyla gönderildi.");
        } else {
            Serial.println("HATA: " + fbdo.errorReason());
        }

        Serial.print("Sıcaklık: ");
        Serial.print(temperature);
        Serial.println(" °C");

        Serial.print("Nem: ");
        Serial.print(humidity);
        Serial.println(" %");

        Serial.print("Hava Kalitesi: ");
        Serial.println(airQualityValue);

        String airQualityMessage;
        if (airQualityValue > 2000) {
            airQualityMessage = "Havalandırma gerekli!";
            Serial.println(airQualityMessage);
        } else {
            airQualityMessage = "Hava kalitesi stabil.";
            Serial.println(airQualityMessage);
        }

        if (Firebase.setString(fbdo, userPath + "Hava Kalitesi Mesajı: ", airQualityMessage)) {
            Serial.println("Hava kalitesi mesajı başarıyla gönderildi.");
        } else {
            Serial.println("HATA: " + fbdo.errorReason());
        }

        delay(10000);
    }
}
