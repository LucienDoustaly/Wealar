#ifndef TIMERS_H_INCLUDED
#define TIMERS_H_INCLUDED

#include "../headers/utils.h"

void timers_init();

void timer_sensors_init();
void timer_sensors_config();
void timer_sensors_interruption_init();
void timer_sensors_stop();

void timer_digicode_init();
void timer_digicode_config();
void timer_digicode_interruption_init();

void timer_digicode_tempo_init();
void timer_digicode_tempo_config();
void timer_digicode_tempo_interruption_init();
void timer_digicode_tempo_start();

void timer_tempo_init();
void wait_t();
void pure_tempo(int32_t n);
void wifi_tempo(int32_t n);

#endif // TIMERS_H_INCLUDED
