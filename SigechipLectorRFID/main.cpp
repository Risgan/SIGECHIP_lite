#include "mbed.h"
#include "USBKeyboard.h"
#include <string>
#include <cstdio>
#include "MFRC522.h"

USBKeyboard keyboard;

#define INTERVALO 45ms

#define MF_RESET    PA_9
#define SPI_MOSI    PA_7
#define SPI_MISO    PA_6
#define SPI_SCK     PA_5
#define SPI_CS      PB_6

MFRC522 RfChip(SPI_MOSI, SPI_MISO, SPI_SCK, SPI_CS, MF_RESET);

uint8_t last_uid[10] = {0}; // UID de la última tarjeta detectada
uint8_t last_uid_size = 0;  

void enviar_mensaje(const char* mensaje) {
    while (*mensaje) {
        keyboard.putc(*mensaje);
        ThisThread::sleep_for(INTERVALO);
        mensaje++;
    }
}

bool esMismoUID(uint8_t* uid, uint8_t size) {
    if (size != last_uid_size) return false;
    for (uint8_t i = 0; i < size; i++) {
        if (uid[i] != last_uid[i]) return false;
    }
    return true;
}

void guardarUID(uint8_t* uid, uint8_t size) {
    last_uid_size = size;
    for (uint8_t i = 0; i < size; i++) {
        last_uid[i] = uid[i];
    }
}

int main() {
    RfChip.PCD_Init();

    while (true) {
        char buffer[50];

        // Esperar a que haya una nueva tarjeta
        while (!RfChip.PICC_IsNewCardPresent()) {
            ThisThread::sleep_for(100ms);
        }

        // Si no se puede leer el serial de la tarjeta, repetir el ciclo
        if (!RfChip.PICC_ReadCardSerial()) {
            continue;
        }

        // Si el UID es el mismo que el último leído, seguir esperando
        if (esMismoUID(RfChip.uid.uidByte, RfChip.uid.size)) {
            ThisThread::sleep_for(100ms);
            continue;
        }

        // Guardar nuevo UID y mostrarlo
        guardarUID(RfChip.uid.uidByte, RfChip.uid.size);
        // enviar_mensaje("Card UID ");
        for (uint8_t i = 0; i < RfChip.uid.size; i++) {
            sprintf(buffer, "%02X", RfChip.uid.uidByte[i]);
            enviar_mensaje(buffer);
        }
        enviar_mensaje("\n\r");

        // **Esperar hasta que la tarjeta sea retirada**
        while (RfChip.PICC_IsNewCardPresent()) {
            ThisThread::sleep_for(1000ms);
        }

        // enviar_mensaje("Tarjeta retirada\n");
        last_uid_size = 0; // Resetear UID al retirar la tarjeta
    }
}
