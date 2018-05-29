#ifndef SENSORS_H_INCLUDED
#define SENSORS_H_INCLUDED

#include "../headers/utils.h"

void sensors_init();

void temperature_sensor_init();
void humidity_sensor_init();
void luminosity_sensor_init();

void presence_sensor_init();
void presence_sensor_GPIO_init();
void presence_sensor_interruption_init();

int8_t format_temperature(uint16_t ADC_temperature);
uint8_t format_humidity(uint16_t ADC_humidity, uint8_t temperature);
bool format_luminosity(uint16_t ADC_humidity);

#endif // SENSORS_H_INCLUDED
