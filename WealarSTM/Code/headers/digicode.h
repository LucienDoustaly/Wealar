#ifndef DIGICODE_H_INCLUDED
#define DIGICODE_H_INCLUDED

#include "../headers/utils.h"

/**
  * ######################################################
  * Initialization of all GPIOs & Interruptions needed for the digicode
  * ######################################################
  */

void digicode_init();

/**
  * ######################################################
  * Initialization on digicode lines
  * ######################################################
  */

void digicode_lines_init();

/**
  * ######################################################
  * Initialization on digicode columns
  * ######################################################
  */

void digicode_columns_init();
void digicode_interruption_init();

/**
  * ######################################################
  * Reset functions on digicode, lines & columns
  * ######################################################
  */

void digicode_rst();
void digicode_lines_rst();
void digicode_columns_rst();

/**
  * ######################################################
  * Set supplied line of the digicode
  * ######################################################
  */

void digicode_set_line();

/**
  * ######################################################
  * Mapping of the digicode to read the input
  * ######################################################
  */

void digicode_set_char(uint8_t line, uint8_t column);

#endif // DIGICODE_H_INCLUDED
