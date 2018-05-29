#ifndef DIGICODE_H_INCLUDED
#define DIGICODE_H_INCLUDED

#include "../headers/utils.h"

void digicode_init();
void digicode_lines_init();
void digicode_columns_init();
void digicode_interruption_init();

void digicode_rst();
void digicode_lines_rst();
void digicode_columns_rst();
void digicode_set_line();
void digicode_set_char(uint8_t line, uint8_t column);

#endif // DIGICODE_H_INCLUDED
