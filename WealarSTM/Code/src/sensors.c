#include "stm32l1xx_nucleo.h"
#include "../headers/sensors.h"

extern Weather g__weather;

void sensors_init() {
  temperature_sensor_init();
  humidity_sensor_init();
  presence_sensor_init();
  luminosity_sensor_init();
}

void temperature_sensor_init() {
  RCC->AHBENR |= RCC_AHBENR_GPIOCEN;
  
  // PC0 in Analogic Mode
  GPIOC->MODER |= GPIO_MODER_MODER0;
  
  // No_Pull-up_Pull-down
  GPIOC->PUPDR &= ~GPIO_PUPDR_PUPDR0;
}

void humidity_sensor_init() {
  RCC->AHBENR |= RCC_AHBENR_GPIOCEN;
  
  // PC1 in Analogic Mode
  GPIOC->MODER |= GPIO_MODER_MODER1;
  
  // No_Pull-up_Pull-down
  GPIOC->PUPDR &= ~GPIO_PUPDR_PUPDR1;
}

void luminosity_sensor_init() {
  RCC->AHBENR |= RCC_AHBENR_GPIOAEN;
  
  // PA0 in Analogic Mode
  GPIOA->MODER |= GPIO_MODER_MODER0;
  
  // No_Pull-up_Pull-down
  GPIOA->PUPDR &= ~GPIO_PUPDR_PUPDR0;
}

void presence_sensor_init() {
  presence_sensor_GPIO_init();
  presence_sensor_interruption_init();
}

void presence_sensor_GPIO_init() {
  RCC->AHBENR |= RCC_AHBENR_GPIOCEN;
  
  // PC2 in Input Mode
  GPIOC->MODER &= ~GPIO_MODER_MODER2;
  
  // Push-Pull & No_Pull-up_Pull-down
  GPIOC->OTYPER &= ~GPIO_OTYPER_OT_2;
  GPIOC->PUPDR &= ~GPIO_PUPDR_PUPDR2;
}

void presence_sensor_interruption_init() {
  RCC->APB2ENR |= RCC_APB2ENR_SYSCFGEN;
  
  // Specific Interrupt Number: EXTI Line2 Interrupt --> 8
  NVIC->ISER[0] |= NVIC_ISER_SETENA_8;
  SYSCFG->EXTICR[0] |= SYSCFG_EXTICR1_EXTI2_PC;
  
  // Request interruption on line 2 / Rising-Edge
  EXTI->IMR |= EXTI_IMR_MR2;
  EXTI->RTSR |= EXTI_RTSR_TR2;
  EXTI->PR |= EXTI_PR_PR2;
}

int8_t format_temperature(uint16_t ADC_temperature) {
  uint32_t voltage_mv = (uint32_t) (ADC_temperature * (3300.0/1024.0));
  int8_t temperature = (voltage_mv-500) / 10;
  
  return (temperature < TEMPERATURE_MIN) ? TEMPERATURE_MIN : (temperature > TEMPERATURE_MAX) ? TEMPERATURE_MAX : temperature;
}

uint8_t format_humidity(uint16_t ADC_humidity, uint8_t temperature) {
  int32_t rh_value = (int32_t) (((ADC_humidity/1024.0) - 0.1515) / 0.00636);
  int8_t true_rh_value = (int8_t) (rh_value / (1.0546 - (0.00216 * temperature)));
  //int32_t rh_value = ((g__weather.humidity/1024) - (1515/10000)) / (636/100000);
  //int8_t true_rh_value = rh_value / ((10546/100000) - ((216/100000) * format_temperature()));
  return true_rh_value;
  //return (true_rh_value < HUMIDITY_MIN) ? HUMIDITY_MIN : (true_rh_value > HUMIDITY_MAX) ? HUMIDITY_MAX : true_rh_value;
}

bool format_luminosity(uint16_t ADC_humidity) {
  return (ADC_humidity < LUMINOSITY_MAX);
}