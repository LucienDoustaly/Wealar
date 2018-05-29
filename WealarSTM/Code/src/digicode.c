#include "stm32l1xx_nucleo.h"
#include "../headers/digicode.h"

// Global variables (defined in utils.c)
extern bool g__alarm;
extern bool g__alarm_activated;
extern bool g__alarm_desactivated;
extern char g__alarm_mode;

extern uint8_t g__digicode_index;
extern uint8_t g__digicode_line;
extern char g__digicode_code[DIGICODE_SIZE];
extern char g__CODE[DIGICODE_SIZE-2];
extern char g__DIGICODE_TABLE_VALUES[DIGICODE_NB_LINES][DIGICODE_NB_COLUMNS];

extern bool g__alert_presence;

/**
  * ######################################################
  * Initialization of all GPIOs & Interruptions needed for the digicode
  * ######################################################
  */

void digicode_init() {
  digicode_lines_init();
  digicode_columns_init();
  digicode_interruption_init();
  digicode_rst();
}

/**
  * ######################################################
  * Initialization on digicode lines
  * ######################################################
  */

void digicode_lines_init()
{
  RCC->AHBENR |= RCC_AHBENR_GPIOBEN;

  // Output Mode
  GPIOB->MODER &= ~(GPIO_MODER_MODER1
                      |GPIO_MODER_MODER2
                      |GPIO_MODER_MODER10
                      |GPIO_MODER_MODER11);
  GPIOB->MODER |= (GPIO_MODER_MODER1_0
                      |GPIO_MODER_MODER2_0
                      |GPIO_MODER_MODER10_0
                      |GPIO_MODER_MODER11_0);

  // Speed Mode: HIGH SPEED
  GPIOB->OSPEEDR |= (GPIO_OSPEEDER_OSPEEDR1
                      |GPIO_OSPEEDER_OSPEEDR2
                      |GPIO_OSPEEDER_OSPEEDR10
                      |GPIO_OSPEEDER_OSPEEDR11);

  // Push-Pull & No_Pull-up_Pull-down
  GPIOB->OTYPER &= ~(GPIO_OTYPER_OT_1
                      |GPIO_OTYPER_OT_2
                      |GPIO_OTYPER_OT_10
                      |GPIO_OTYPER_OT_11);
  GPIOB->PUPDR |= ~(GPIO_PUPDR_PUPDR1
                      |GPIO_PUPDR_PUPDR2
                      |GPIO_PUPDR_PUPDR10
                      |GPIO_PUPDR_PUPDR11);
}

/**
  * ######################################################
  * Initialization on digicode columns
  * ######################################################
  */

void digicode_columns_init() {
  RCC->AHBENR |= RCC_AHBENR_GPIOAEN;

  // Input Mode
  GPIOA->MODER &= ~(GPIO_MODER_MODER7
                      |GPIO_MODER_MODER6
                      |GPIO_MODER_MODER5);

  // Pull-down
  GPIOA->PUPDR &= ~(GPIO_PUPDR_PUPDR7
                      |GPIO_PUPDR_PUPDR6
                      |GPIO_PUPDR_PUPDR5);
  GPIOA->PUPDR |= (GPIO_PUPDR_PUPDR7_1
                      |GPIO_PUPDR_PUPDR6_1
                      |GPIO_PUPDR_PUPDR5_1);
}

void digicode_interruption_init() {
  RCC->APB2ENR |= RCC_APB2ENR_SYSCFGEN;

  // External Line[9:5] Interrupts: Processor Interruption N�23 -> ISER[0] / bit 23
  NVIC->ISER[0] |= NVIC_ISER_SETENA_23;
  SYSCFG->EXTICR[1] |= (SYSCFG_EXTICR2_EXTI7_PA
                          | SYSCFG_EXTICR2_EXTI6_PA
                          | SYSCFG_EXTICR2_EXTI5_PA);

  // Request interruption on line 7, 6 & 5 / Rising-Edge
  EXTI->IMR |= (EXTI_IMR_MR7
                          | EXTI_IMR_MR6
                          | EXTI_IMR_MR5);
  EXTI->RTSR |= (EXTI_RTSR_TR7
                          | EXTI_RTSR_TR6
                          | EXTI_RTSR_TR5);
  EXTI->PR |= (EXTI_PR_PR7
                          | EXTI_PR_PR6
                          | EXTI_PR_PR5);
}

/**
  * ######################################################
  * Reset functions on digicode, lines & columns
  * ######################################################
  */

// Turn off all GPIOs output corresponding to the lines of the digicode
void digicode_lines_rst() {
  GPIOB->ODR &= ~(GPIO_ODR_ODR_1
                      |GPIO_ODR_ODR_2
                      |GPIO_ODR_ODR_10
                      |GPIO_ODR_ODR_11);
}

 // Reset the interruption flag on external line 7, 6 & 5 (corresponding to column 1, 2 & 3)
void digicode_columns_rst() {
  EXTI->PR |= (EXTI_PR_PR7
                      |EXTI_PR_PR6
                      |EXTI_PR_PR5);
}

// Reset lines and columns of the digicode, including the buffer receiving the code
void digicode_rst() {
  digicode_lines_rst();
  g__digicode_index = 0;
  g__digicode_line = 0;
  digicode_set_line();
  string_rst(g__digicode_code, DIGICODE_SIZE);
}

/**
  * ######################################################
  * Set supplied line of the digicode
  * ######################################################
  */

// Will supply one of the 4 lines thanks to an index, and turn off the other lines
void digicode_set_line() {
  digicode_lines_rst();

  switch (g__digicode_line) {
    case 0:
      GPIOB->ODR |= GPIO_ODR_ODR_1;
      break;

    case 1:
      GPIOB->ODR |= GPIO_ODR_ODR_2;
      break;

    case 2:
      GPIOB->ODR |= GPIO_ODR_ODR_10;
      break;

    case 3:
      GPIOB->ODR |= GPIO_ODR_ODR_11;
      break;

    default:
      GPIOB->ODR |= GPIO_ODR_ODR_1;
      break;
  }
}

/**
  * ######################################################
  * Mapping of the digicode to read the input
  * ######################################################
  */

 // First version with an implementation of a security mode entered after code
 // But abandonned due to complexity and time

/*void digicode_set_char(uint8_t line, uint8_t column) {
  bool code_is_valid = false;

  g__digicode_code[g__digicode_index] = g__DIGICODE_TABLE_VALUES[line][column];
  code_is_valid = (strncmp(g__digicode_code, g__CODE, strlen(g__CODE)) == 0);

  if (g__digicode_code[g__digicode_index] == '*')
    digicode_rst();
  else if (!g__alarm_activated && (g__digicode_index == DIGICODE_SIZE-2)) {
    if (code_is_valid && (g__digicode_code[DIGICODE_SIZE-3] == '#')) {
      if ((g__digicode_code[DIGICODE_SIZE-2] >= '0') && (g__digicode_code[DIGICODE_SIZE-2] <= '9'))
        g__alarm_mode = g__digicode_code[DIGICODE_SIZE-2];
      else
        g__alarm_mode = '0';

      g__alarm = true;
      g__alarm_activated = true;
    }

    digicode_rst();
  }
  else if (g__alarm && (g__digicode_index == DIGICODE_SIZE-4)) {
    if (code_is_valid) {
      g__alarm = false;
      g__alarm_desactivated = true;
    }
    else
      g__alert_presence = true;

    digicode_rst();
  }
  else {
    g__digicode_index++;
  }
}*/

// Last version of the function
void digicode_set_char(uint8_t line, uint8_t column) {
  bool code_is_valid = false;

  g__digicode_code[g__digicode_index] = g__DIGICODE_TABLE_VALUES[line][column]; // Read the input value thanks to a mapping of the digicode
  code_is_valid = (strncmp(g__digicode_code, g__CODE, strlen(g__CODE)) == 0); // Check if the code is valid

  if (g__digicode_code[g__digicode_index] == '*') // Reset button on the digicode
    digicode_rst();
  else if (!g__alarm && (g__digicode_index == DIGICODE_SIZE-2)) { // If trying to activate the alarm, and the code is rigth, we activate it
    if (code_is_valid) {
      g__alarm = true;
      g__alarm_activated = true;
    }

    digicode_rst();
  }
  else if (g__alarm && (g__digicode_index == DIGICODE_SIZE-2)) { // If trying to deactivate the alarm, and the code is rigth, we deactivate it, otherwise we notify the owner of a presence
    if (code_is_valid) {
      g__alarm = false;
      g__alarm_desactivated = true;
    }
    else
      g__alert_presence = true;

    digicode_rst();
  }
  else { // The code isn't finished to be entered
    g__digicode_index++;
  }
}
