#ifndef ADC_H_INCLUDED
#define ADC_H_INCLUDED

#include "../headers/utils.h"

/**
  * ######################################################
  * Initialization & Configuration of the ADC
  * ######################################################
  */

void ADC_init();
void ADC_config_init();
void ADC_interruption_init();

/**
  * ######################################################
  * Start an ADC conversion
  * ######################################################
  */

void ADC_start();

#endif // ADC_H_INCLUDED
