#include "stm32l1xx_nucleo.h"
#include "../headers/timers.h"

// Global variables (defined in utils.c)
extern bool g__data_end_bool;
extern bool g__digicode_tempo;

/**
  * ######################################################
  * Initialization of all timers
  * ######################################################
  */

void timers_init() {
  timer_sensors_init();
  timer_digicode_init();
  timer_digicode_tempo_init();
  timer_tempo_init();
}

/**
  * ######################################################
  * Initialization of the timer used for weather sensors (TIM4)
  * ######################################################
  */

void timer_sensors_init() {
  timer_sensors_config();
  timer_sensors_interruption_init();
}

// Initialization of TIM4
void timer_sensors_config() {
  RCC->APB1ENR |= RCC_APB1ENR_TIM4EN;

  // Prescaler & Auto-reload: 125*((15999+1)/16000000) (125 ms -> 8 Hz)
  TIM4->PSC = 15999;
  TIM4->ARR = 125;

  // Edge-aligned, Up-counter, Auto-reload buffered
  TIM4->CR1 |= TIM_CR1_ARPE;
  TIM4->CR1 &= ~TIM_CR1_CMS;
  TIM4->CR1 &= ~TIM_CR1_DIR;
}

// Interruption init for TIM4
void timer_sensors_interruption_init() {
  // Processor Interruption N�30 -> ISER[0] / bit 30
  NVIC->ISER[0] |= (1<<30);

  // Interruption Activation
  TIM4->DIER |= TIM_DIER_UIE;
}

// Stops the timer TIM4 completly
void timer_sensors_stop() {
  TIM4->CR1 &= ~TIM_CR1_CEN; // Stop counter
  TIM4->SR &= ~TIM_SR_UIF; // Reset interruption flag on Auto-reload
  TIM4->CNT = 0; // Reset counter value
}

/**
  * ######################################################
  * Initialization of the timer used for supply scanning on the 4 digicode lines (TIM6)
  * ######################################################
  */

void timer_digicode_init() {
  timer_digicode_config();
  timer_digicode_interruption_init();

  TIM6->CR1 |= TIM_CR1_CEN; // Start the clock of the timer (TIM6)
}

// Initialization of TIM6
void timer_digicode_config() {
  RCC->APB1ENR |= RCC_APB1ENR_TIM6EN;

  // Prescaler & Auto-reload: 75*((15999+1)/16000000) (75 ms -> ~13 Hz)
  TIM6->PSC = 15999;
  TIM6->ARR = 75;

  // Edge-aligned, Up-counter, Auto-reload buffered
  TIM6->CR1 |= TIM_CR1_ARPE;
  TIM6->CR1 &= ~TIM_CR1_CMS;
  TIM6->CR1 &= ~TIM_CR1_DIR;
}

// Interruption init for TIM6
void timer_digicode_interruption_init() {
  // Processor Interruption N�43 -> ISER[1] / bit 11
  NVIC->ISER[1] |= NVIC_ISER_SETENA_11;

  // Interruption Activation
  TIM6->DIER |= TIM_DIER_UIE;
}

/**
  * ######################################################
  * Initialization of the timer used as temporization for digicode inputs, to avoid duplicate input in a very short amount of time (500 ms) (TIM3)
  * ######################################################
  */

void timer_digicode_tempo_init() {
  timer_digicode_tempo_config();
  timer_digicode_tempo_interruption_init();
}

// Initialization of TIM3
void timer_digicode_tempo_config() {
  RCC->APB1ENR |= RCC_APB1ENR_TIM3EN;

  // Prescaler & Auto-reload: 250*((15999+1)/16000000) (500 ms -> 2 Hz)
  TIM3->PSC = 15999;
  TIM3->ARR = 500;

  // Edge-aligned, Up-counter, Auto-reload buffered
  TIM3->CR1 |= TIM_CR1_ARPE;
  TIM3->CR1 &= ~TIM_CR1_CMS;
  TIM3->CR1 &= ~TIM_CR1_DIR;
}

// Interruption init for TIM3
void timer_digicode_tempo_interruption_init() {
  // Processor Interruption N�29 -> ISER[0] / bit 29
  NVIC->ISER[0] |= NVIC_ISER_SETENA_29;

  // Interruption Activation
  TIM3->DIER |= TIM_DIER_UIE;
}

// Start the clock of the timer (TIM3)
void timer_digicode_tempo_start() {
  TIM3->CR1 |= TIM_CR1_CEN;
  g__digicode_tempo = true;
}

/**
  * ######################################################
  * Initialization of the timer used for Wifi / program temporization (TIM2)  -  Functions of temporization
  * ######################################################
  */

// Initialization of TIM2
void timer_tempo_init() {
  RCC->APB1ENR |= RCC_APB1ENR_TIM2EN;

  // Prescaler & Auto-reload: 1000*((15+1)/16000000) (1 ms -> 1 kHz)
  TIM2->PSC = 15;
  TIM2->ARR = 1000;

  // Edge-aligned, Up-counter, Auto-reload buffered
  TIM2->CR1 |= TIM_CR1_ARPE;
  TIM2->CR1 &= ~TIM_CR1_CMS;
  TIM2->CR1 &= ~TIM_CR1_DIR;
}

// Function wait 1 ms (freeze the program while waiting)
void wait_t() {
  TIM2->CR1 |= TIM_CR1_CEN;

  // Takes 1ms to reach auto-reload
  while ((TIM2->SR&TIM_SR_UIF)==0);

  TIM2->CR1 &= ~TIM_CR1_CEN;

  TIM2->SR &= ~TIM_SR_UIF;
  TIM2->CNT = 0;
}

// Function wait n ms (freeze the program while waiting)
void pure_tempo(int32_t n) {
  // 1 loop per 1ms
  for (int32_t j = 0; j < n; j++)
    wait_t();
}

// Function wait 1 ms (freeze the program while waiting)
// Stop waiting if the Wifi module sent a response "OK" for success command or if the Wealar API Server sent a response "Done" from a request
void wifi_tempo(int32_t n) {
  // 1 loop per 1ms
  for (int32_t i = 0; (i < n) && (!g__data_end_bool); i++)
    wait_t();
}
