#ifndef SENSORS_H_INCLUDED
#define SENSORS_H_INCLUDED

#include "../headers/utils.h"

/**
  * ######################################################
  * Initialization of all sensors
  * ######################################################
  */

void sensors_init();

/**
  * ######################################################
  * Initialization of weather sensors
  * ######################################################
  */

void temperature_sensor_init();
void humidity_sensor_init();
void luminosity_sensor_init();

/**
  * ######################################################
  * Initialization of presence sensor
  * ######################################################
  */

void presence_sensor_init();
void presence_sensor_GPIO_init();
void presence_sensor_interruption_init();

/**
  * ######################################################
  * Format functions for readable weather data
  * ######################################################
  */

int8_t format_temperature(uint16_t ADC_temperature);
uint8_t format_humidity(uint16_t ADC_humidity, uint8_t temperature);
bool format_luminosity(uint16_t ADC_humidity);

#endif // SENSORS_H_INCLUDED
