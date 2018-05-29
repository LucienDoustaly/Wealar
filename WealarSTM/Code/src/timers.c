#include "stm32l1xx_nucleo.h"
#include "../headers/timers.h"

extern bool g__data_end_bool;
extern bool g__digicode_tempo;

void timers_init() {
  timer_sensors_init();
  timer_digicode_init();
  timer_digicode_tempo_init();
  timer_tempo_init();
}

void timer_sensors_init() {
  timer_sensors_config();
  timer_sensors_interruption_init();
}

void timer_sensors_config()
{
  RCC->APB1ENR |= RCC_APB1ENR_TIM4EN;
  
  // Prescaler & Auto-reload: 1000*(16000/(15999+1)) (1 kHz -> 500 ms)
  TIM4->PSC = 15999;
  TIM4->ARR = 125;
  
  TIM4->CR1 |= TIM_CR1_ARPE;
  TIM4->CR1 &= ~TIM_CR1_CMS;
  TIM4->CR1 &= ~TIM_CR1_DIR;
}

void timer_sensors_interruption_init() {
  // Processor Interruption N°30 -> ISER[0] / bit 30
  NVIC->ISER[0] |= (1<<30);
  
  // Interruption Activation
  TIM4->DIER |= TIM_DIER_UIE;
}

void timer_sensors_stop() {
  TIM4->CR1 &= ~TIM_CR1_CEN;
  TIM4->SR &= ~TIM_SR_UIF;
  TIM4->CNT = 0;
}

void timer_digicode_init() {
  timer_digicode_config();
  timer_digicode_interruption_init();
  
  TIM6->CR1 |= TIM_CR1_CEN;
}

void timer_digicode_config() {
  RCC->APB1ENR |= RCC_APB1ENR_TIM6EN;
  
  // Prescaler & Auto-reload: 75*(16000000/(15999+1)) (~13 Hz -> 75 ms)
  TIM6->PSC = 15999;
  TIM6->ARR = 75;
  
  TIM6->CR1 |= TIM_CR1_ARPE;
  TIM6->CR1 &= ~TIM_CR1_CMS;
  TIM6->CR1 &= ~TIM_CR1_DIR;
}

void timer_digicode_interruption_init() {
  // Processor Interruption N°43 -> ISER[1] / bit 11
  NVIC->ISER[1] |= NVIC_ISER_SETENA_11;
  
  // Interruption Activation
  TIM6->DIER |= TIM_DIER_UIE;
}

void timer_digicode_tempo_init() {
  timer_digicode_tempo_config();
  timer_digicode_tempo_interruption_init();
}

void timer_digicode_tempo_config() {
  RCC->APB1ENR |= RCC_APB1ENR_TIM3EN;
  
  // Prescaler & Auto-reload: 250*(16000000/(15999+1)) (2 Hz -> 500 ms)
  TIM3->PSC = 15999;
  TIM3->ARR = 500;
  
  TIM3->CR1 |= TIM_CR1_ARPE;
  TIM3->CR1 &= ~TIM_CR1_CMS;
  TIM3->CR1 &= ~TIM_CR1_DIR;
}

void timer_digicode_tempo_interruption_init() {
  // Processor Interruption N°29 -> ISER[0] / bit 29
  NVIC->ISER[0] |= NVIC_ISER_SETENA_29;
  
  // Interruption Activation
  TIM3->DIER |= TIM_DIER_UIE;
}

void timer_digicode_tempo_start() {
  TIM3->CR1 |= TIM_CR1_CEN;
  g__digicode_tempo = true;
}

void timer_tempo_init() {
  RCC->APB1ENR |= RCC_APB1ENR_TIM2EN;
  
  // Prescaler & Auto-reload: 1000*(16000/(15+1)) (1 kHz -> 1 ms)
  TIM2->PSC = 15;
  TIM2->ARR = 1000;
  
  TIM2->CR1 |= TIM_CR1_ARPE;
  TIM2->CR1 &= ~TIM_CR1_CMS;
  TIM2->CR1 &= ~TIM_CR1_DIR;
}

void wait_t() { // Wait 1ms
  TIM2->CR1 |= TIM_CR1_CEN;
  
  // Takes 1ms to reach auto-reload
  while ((TIM2->SR&TIM_SR_UIF)==0);
  
  TIM2->CR1 &= ~TIM_CR1_CEN;
  
  TIM2->SR &= ~TIM_SR_UIF;
  TIM2->CNT = 0;
}

void pure_tempo(int32_t n) {
  // 1 loop per 1ms
  for (int32_t j = 0; j < n; j++)
    wait_t();
}

void wifi_tempo(int32_t n) {
  // 1 loop per 1ms
  for (int32_t i = 0; (i < n) && (!g__data_end_bool); i++)
    wait_t();
}
