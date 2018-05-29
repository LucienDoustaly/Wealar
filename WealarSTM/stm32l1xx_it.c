/**
  ******************************************************************************
  * @file    Project/STM32L1xx_StdPeriph_Templates/stm32l1xx_it.c 
  * @author  MCD Application Team
  * @version V1.2.0
  * @date    16-May-2014
  * @brief   Main Interrupt Service Routines.
  *          This file provides template for all exceptions handler and 
  *          peripherals interrupt service routine.
  ******************************************************************************
  * @attention
  *
  * <h2><center>&copy; COPYRIGHT 2014 STMicroelectronics</center></h2>
  *
  * Licensed under MCD-ST Liberty SW License Agreement V2, (the "License");
  * You may not use this file except in compliance with the License.
  * You may obtain a copy of the License at:
  *
  *        http://www.st.com/software_license_agreement_liberty_v2
  *
  * Unless required by applicable law or agreed to in writing, software 
  * distributed under the License is distributed on an "AS IS" BASIS, 
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  ******************************************************************************
  */

/* Includes ------------------------------------------------------------------*/
#include "stm32l1xx_it.h"
#include "./Code/headers/timers.h"
#include "./Code/headers/sensors.h"
#include "./Code/headers/digicode.h"

extern bool need_tcp_connection;

extern bool g__alarm;

extern uint8_t g__digicode_line;
extern bool g__digicode_tempo;

extern bool g__alert_presence;

extern bool g__collecting_data;
extern Weather g__weather[WEATHER_SIZE];
extern uint16_t g__weather_index;

extern bool g__data_end_bool;
extern bool g__buffer_rst_bool;
extern char g__buffer[BUFFER_SIZE];
extern char g__DATA_OK[DATA_END_SIZE];
extern char g__DATA_DONE[DATA_END_SIZE];
extern char g__DATA_CLOSED[DATA_END_SIZE];

/** @addtogroup Template_Project
  * @{
  */

/* Private typedef -----------------------------------------------------------*/
/* Private define ------------------------------------------------------------*/
/* Private macro -------------------------------------------------------------*/
/* Private variables ---------------------------------------------------------*/
/* Private function prototypes -----------------------------------------------*/
/* Private functions ---------------------------------------------------------*/

/******************************************************************************/
/*            Cortex-M3 Processor Exceptions Handlers                         */
/******************************************************************************/

/**
  * @brief  This function handles NMI exception.
  * @param  None
  * @retval None
  */
void NMI_Handler(void)
{
}

/**
  * @brief  This function handles Hard Fault exception.
  * @param  None
  * @retval None
  */
void HardFault_Handler(void)
{
  /* Go to infinite loop when Hard Fault exception occurs */
  while (1)
  {
    
  }
}

/**
  * @brief  This function handles Memory Manage exception.
  * @param  None
  * @retval None
  */
void MemManage_Handler(void)
{
  /* Go to infinite loop when Memory Manage exception occurs */
  while (1)
  {
  }
}

/**
  * @brief  This function handles Bus Fault exception.
  * @param  None
  * @retval None
  */
void BusFault_Handler(void)
{
  /* Go to infinite loop when Bus Fault exception occurs */
  while (1)
  {
  }
}

/**
  * @brief  This function handles Usage Fault exception.
  * @param  None
  * @retval None
  */
void UsageFault_Handler(void)
{
  /* Go to infinite loop when Usage Fault exception occurs */
  while (1)
  {
  }
}

/**
  * @brief  This function handles SVCall exception.
  * @param  None
  * @retval None
  */
void SVC_Handler(void)
{
}

/**
  * @brief  This function handles Debug Monitor exception.
  * @param  None
  * @retval None
  */
void DebugMon_Handler(void)
{
}

/**
  * @brief  This function handles PendSVC exception.
  * @param  None
  * @retval None
  */
void PendSV_Handler(void)
{
}

/**
  * @brief  This function handles SysTick Handler.
  * @param  None
  * @retval None
  */
void SysTick_Handler(void)
{
}

/******************************************************************************/
/*                 STM32L1xx Peripherals Interrupt Handlers                   */
/*  Add here the Interrupt Handler for the used peripheral(s) (PPP), for the  */
/*  available peripheral interrupt handler's name please refer to the startup */
/*  file (startup_stm32l1xx_xx.s).                                            */
/******************************************************************************/

/**
  * @brief  This function handles PPP interrupt request.
  * @param  None
  * @retval None
  */
/*void PPP_IRQHandler(void)
{
}*/

void TIM3_IRQHandler()
{
  TIM3->CR1 &= ~TIM_CR1_CEN;
  TIM3->SR &= ~TIM_SR_UIF;
  TIM3->CNT = 0;
  
  g__digicode_tempo = false;
}

void TIM4_IRQHandler()
{
  timer_sensors_stop();
  
  // Restart the data collection
  ADC1->CR2 |= ADC_CR2_SWSTART;
}

void TIM6_IRQHandler()
{
  TIM6->SR &= ~TIM_SR_UIF;
  
  g__digicode_line = (g__digicode_line + 1)%DIGICODE_NB_LINES;
  digicode_set_line();
}

void EXTI2_IRQHandler() {
  EXTI->PR |= EXTI_PR_PR2;
  
  // Alert Presence
  g__alert_presence = g__alarm;
}

void EXTI9_5_IRQHandler() {
  uint8_t interrupt_line = (CHECK_BIT(EXTI->PR, 7)) ? 0 : ((CHECK_BIT(EXTI->PR, 6)) ? 1 : ((CHECK_BIT(EXTI->PR, 5)) ? 2 : 3));
  
  if (!g__digicode_tempo && (interrupt_line != 3)) {
    timer_digicode_tempo_start();
    digicode_set_char(g__digicode_line, interrupt_line);
  }
  
  digicode_columns_rst();
}

void ADC1_IRQHandler() {
  static WeatherData s__weather_data = TEMPERATURE;
  uint16_t value = ADC1->DR;
  
  if (g__collecting_data) {
    if ((g__weather_index == 0) && (g__weather[g__weather_index].temperature == TEMPERATURE_INIT))
      s__weather_data = TEMPERATURE;
    
    switch (s__weather_data) {
      case TEMPERATURE:
        weather_set_temperature(format_temperature(value));
        s__weather_data = HUMIDITY;
        break;
        
      case HUMIDITY:
        weather_set_humidity(format_humidity(value, g__weather[g__weather_index].temperature));
        s__weather_data = LUMINOSITY;
        break;
        
      default:
        weather_set_luminosity(format_luminosity(value));
        
        if (g__weather_index == WEATHER_SIZE-1) {
          g__weather_index = 0;
          g__collecting_data = false;
        }
        else {
          g__weather_index++;
          // Tempo before continuing data collection
          TIM4->CR1 |= TIM_CR1_CEN;
        }
        
        s__weather_data = TEMPERATURE;
        break;
    }
  }
}

void USART1_IRQHandler(void) {
  static char s__verif_data_ok[DATA_END_SIZE] = {0};
  static uint16_t s__j = 0;
  char received_data = USART1->DR;
  
  if (g__buffer_rst_bool) {
    g__buffer_rst_bool = false;
    s__j = 0;
  }
  
  for (uint8_t i = 0; i < DATA_END_SIZE-1; i++)
    s__verif_data_ok[i] = s__verif_data_ok[i+1];

  g__buffer[s__j] = received_data;
  s__verif_data_ok[DATA_END_SIZE-2] = received_data;
  
  if ((strcmp(s__verif_data_ok, g__DATA_OK) == 0) || (strcmp(s__verif_data_ok, g__DATA_DONE) == 0)) {
    g__data_end_bool = true;
    string_rst(s__verif_data_ok, DATA_END_SIZE);
    s__j = 0;
  }
  else if (strcmp(s__verif_data_ok, g__DATA_CLOSED) == 0)
    need_tcp_connection = true;
  else
    s__j++;

  if (s__j >= BUFFER_SIZE)
    s__j = BUFFER_SIZE-1;
}


/**
  * @}
  */ 


/************************ (C) COPYRIGHT STMicroelectronics *****END OF FILE****/
