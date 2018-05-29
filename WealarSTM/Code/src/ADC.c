#include "stm32l1xx_nucleo.h"
#include "../headers/ADC.h"

void ADC_init() {
  ADC_config_init();
  ADC_interruption_init();
}

void ADC_config_init() {
  RCC->APB2ENR |= RCC_APB2ENR_ADC1EN;

  // Activation de l'horloge HSI Clock (divided by 4)
  RCC->CR |= RCC_CR_HSION;
  ADC->CCR |= ADC_CCR_ADCPRE_1;
  ADC->CCR &= ~ADC_CCR_ADCPRE_0;

  // Number of conversions (0001 -> 2 conversions)
  ADC1->SQR1 &= ~ADC_SQR1_L;
  ADC1->SQR1 |= ADC_SQR1_L_1;

  // 1st conversion: PC0 --> ADC_IN10 (Group 8 / CH10)
  ADC1->SQR5 &= ~ADC_SQR5_SQ1;
  ADC1->SQR5 |= (ADC_SQR5_SQ1_1 | ADC_SQR5_SQ1_3);
  RI->ASCR1 |= RI_ASCR1_CH_10;

  // 2nd conversion: PC1 --> ADC_IN11 (Group 8 / CH11)
  ADC1->SQR5 &= ~ADC_SQR5_SQ2;
  ADC1->SQR5 |= (ADC_SQR5_SQ2_0 | ADC_SQR5_SQ2_1 | ADC_SQR5_SQ2_3);
  RI->ASCR1 |= RI_ASCR1_CH_11;
  
  // 3nd conversion: PA0 --> ADC_IN0 (Group 1 / CH0)
  ADC1->SQR5 &= ~ADC_SQR5_SQ3;
  RI->ASCR1 |= RI_ASCR1_CH_0;

  // 10 bits resolution
  ADC1->CR1 |= ADC_CR1_RES_0;
  ADC1->CR1 &= ~ADC_CR1_RES_1;

  // Scans all the channels of a group, then stop
  ADC1->CR1 |= ADC_CR1_SCAN;
  ADC1->CR2 &= ~ADC_CR2_CONT;

  // Bank A of channels
  ADC1->CR2 &= ~ADC_CR2_CFG;

  // End of conversions reset
  ADC1->CR2 |= ADC_CR2_EOCS;

  // ADC Activation
  ADC1->CR2 |= ADC_CR2_ADON;
  while ((ADC1->SR & ADC_SR_ADONS) == 0);
}

void ADC_interruption_init() {
  // Processor Interruption N�18 -> ISER[0] / bit 18
  NVIC->ISER[0] |= (1<<18);

  // ADC activation of the end of conversion interruption
  ADC1->CR1 |= ADC_CR1_EOCIE;
}

void ADC_start() {
  // Start the sequence of conversions
  ADC1->CR2 |= ADC_CR2_SWSTART;
}
