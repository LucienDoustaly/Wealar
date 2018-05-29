#ifndef TIMERS_H_INCLUDED
#define TIMERS_H_INCLUDED

#include "../headers/utils.h"

/**
  * ######################################################
  * Initialization of all timers
  * ######################################################
  */

void timers_init();

/**
  * ######################################################
  * Initialization of the timer used for weather sensors (TIM4)
  * ######################################################
  */

void timer_sensors_init();
void timer_sensors_config();
void timer_sensors_interruption_init();
void timer_sensors_stop();

/**
  * ######################################################
  * Initialization of the timer used for supply scanning on the 4 digicode lines (TIM6)
  * ######################################################
  */

void timer_digicode_init();
void timer_digicode_config();
void timer_digicode_interruption_init();

/**
  * ######################################################
  * Initialization of the timer used as temporization for digicode inputs, to avoid duplicate input in a very short amount of time (500 ms) (TIM3)
  * ######################################################
  */

void timer_digicode_tempo_init();
void timer_digicode_tempo_config();
void timer_digicode_tempo_interruption_init();
void timer_digicode_tempo_start();

/**
  * ######################################################
  * Initialization of the timer used for Wifi / program temporization (TIM2)  -  Functions of temporization
  * ######################################################
  */

void timer_tempo_init();

void wait_t();
void pure_tempo(int32_t n);
void wifi_tempo(int32_t n);

#endif // TIMERS_H_INCLUDED
