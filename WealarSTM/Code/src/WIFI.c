#include "stm32l1xx_nucleo.h"
#include "../headers/WIFI.h"
#include "../headers/timers.h"

// Global variables (defined in utils.c)
extern char g__alarm_mode;

extern char* g__WEALARID;

extern char* g__POST_ALARM;
extern char* g__POST_ALARM_OFF;
extern char* g__POST_PRESENCE;
extern char* g__POST_WEATHER;
extern char* g__HOST;
extern char* g__PORT;

/**
  * ######################################################
  * Initialization of the Wifi Module
  * ######################################################
  */

void WIFI_init() {
  USART1_GPIOs_init();
  USART1_init();

  wifi_module_rst(); // We reset the Wifi module
  pure_tempo(DEFAULT_TEMPO); // Wait enough time for the Wifi module to reboot

  USART1_interruption_init(); // We activate interruption on reception only then
}

// Initialization of GPIOs for USART communication (USART1)
void USART1_GPIOs_init() {
  RCC->AHBENR |= RCC_AHBENR_GPIOAEN;

  // PA9 & PA10 in Alternate Function Mode
  GPIOA->MODER &= ~(GPIO_MODER_MODER9 | GPIO_MODER_MODER10);
  GPIOA->MODER |= (GPIO_MODER_MODER9_1 | GPIO_MODER_MODER10_1);

  // Push-Pull & Pull-Up
  GPIOA->OTYPER &= ~(GPIO_OTYPER_OT_9 | GPIO_OTYPER_OT_10);
  GPIOA->PUPDR &= ~(GPIO_PUPDR_PUPDR9 | GPIO_PUPDR_PUPDR10);
  GPIOA->PUPDR |= (GPIO_PUPDR_PUPDR9_0 | GPIO_PUPDR_PUPDR10_0);

  // High-Speed
  GPIOA->OSPEEDR |= (GPIO_OSPEEDER_OSPEEDR10 | GPIO_OSPEEDER_OSPEEDR10);

  // Alternate Function: AF7 for USART1 / Pins 9 & 10 -> AFR[1]
  GPIOA->AFR[1]|= ((1<<4)|(1<<5)|(1<<6)|(1<<8)|(1<<9)|(1<<10));
}

// Configuration of USART communication (USART1)
void USART1_init() {
  RCC->APB2ENR |= RCC_APB2ENR_USART1EN;

  // 8 data bits, 1 start bit, 1 stop bits & no parity control
  USART1->CR1 &= ~USART_CR1_PCE;
  USART1->CR1 &= ~USART_CR1_M;
  USART1->CR2 &= ~USART_CR2_STOP;

  // Hardware flow control disabled
  USART2->CR3 &= ~USART_CR3_RTSE;

  // Baudrate: 115200 bauds, OVER8: 0, fq: 16MHz --> 16000000/(8*2*115200) = 8.68
  // --> 0.68*16 = 10.88 ~= 11 <-> B and 8
  USART1->BRR = 0x8B;

  // Transmission & Reception activation
  USART1->CR1 |= USART_CR1_TE;

  // USART1 activation
  USART1->CR1 |= USART_CR1_UE;
}

// Initialization of interruption on USART reception (USART1)
void USART1_interruption_init() {
  // Processor Interruption N�37 -> ISER[1] / bit 5
  NVIC->ISER[1] |= (1<<5);

  // USART1 activation of the reception interruption
  USART1->CR1 |= USART_CR1_RE;
  USART1->CR1 |= USART_CR1_RXNEIE;
}

/**
  * ######################################################
  * Communication functions (with the Wifi module via USART)
  * ######################################################
  */

// Write a character into USART transmission register (send a character via USART)
void TX_BYTE(char data) {
  USART1->DR = data;

  // Waiting for completed transmission
  while ((USART1->SR & USART_SR_TC) != USART_SR_TC);
}

// Use TX_BYTE to send an entire string via USART
void TX_STRING(const char* data) {
  for(uint8_t i = 0; i < strlen(data); i++)
    TX_BYTE(data[i]);
}

// Same as TX_STRING, but add a "\r\n" at the end of the string (useful for communication with Wifi module)
void TX_MESSAGE(const char* data) {
  TX_STRING(data);
  TX_BYTE('\r');
  TX_BYTE('\n');
}

/**
  * ######################################################
  * AT Commands - Commands Functions (for the Wifi module)
  * ######################################################
  */

// Reset the Wifi module
void wifi_module_rst() {
  TX_MESSAGE(" AT+RST");
}

// Test command on the Wifi module
void wifi_module_test() {
  TX_MESSAGE("AT");
}

// Set a mode for the Wifi module (1 -> Station Mode (connects to a Wifi) / 2 -> SoftAP Mode (emits its own Wifi)) depending on the state of the program (main.c -> switch)
void wifi_module_change_mode(const State* p_state) {
  if (*p_state == SET_MODE_TO_SOFTAP)
    TX_MESSAGE("AT+CWMODE_CUR=2");
  else
    TX_MESSAGE("AT+CWMODE_CUR=1");
}

// Ask the Wifi module to connect to a specific Wifi, with given credentials
void wifi_module_wifi_connection(const WIFI_Credentials* p_credentials) {
  TX_STRING("AT+CWJAP_CUR=\""); // !! AT+CWJAP deprecated !!
  TX_STRING(p_credentials->ssid); // <ssid>: the SSID of the target AP.
  TX_STRING("\",\"");
  TX_STRING(p_credentials->pwd); // <pwd>: password, MAX: 64-byte ASCII.
  TX_MESSAGE("\"");
}

// Ask the Wifi module to establish a TCP connection with a given host, on a specific port
void wifi_module_tcp_connection() {
  TX_STRING("AT+CIPSTART=\"TCP\",\"");
  TX_STRING(g__HOST); // <remote IP>: string parameter indicating the remote IP address.
  TX_STRING("\",");
  TX_MESSAGE(g__PORT); // <remote port>: the remote port number.
}

// First part of sending the request: indecate the request size with CIPSEND
void wifi_module_send_request_config(const Request* p_request) {
  char cipsend [15] = {0};

  // snprintf() will format a string as printf would do, but with a maximum size (to avoid memory errors)
  // That is why we formated the request earlier in the code, to simplify this function
  snprintf(cipsend, 15, "AT+CIPSEND=%d", strlen(p_request->string)+strlen("\r\n")); // We use strlen() to be able to handle requests dynamicaly

  TX_MESSAGE(cipsend); // We send the formated string
}

// Second part of sending the request: send the request
void wifi_module_send_request_message(const Request* p_request) {
  TX_MESSAGE(p_request->string); // Send the request that has been formated earlier
}

/**
  * ######################################################
  * Formating of the request
  * ######################################################
  */

// Format the message to an HTTP request, depending on the message to be sent
void format_request(Request* p_request, const RequestType request_type) {
  char request_action[REQUEST_ACTION_SIZE];
  Weather weather;

  p_request->type = request_type;

  switch (p_request->type) {
    // The alarm has been activated
    case POST_ALARM_MODE:
      // snprintf() will format a string as printf would do, but with a maximum size (to avoid memory errors)
      snprintf(request_action, REQUEST_ACTION_SIZE, "%s/%s/%d/%d", g__POST_ALARM, g__WEALARID, 1, 0); // We make sure to indicate the WEALARID, which allows the API server to identify the device from where the request comes from
      break;

    // The alarm has been deactivated
    case POST_ALARM_OFF:
      snprintf(request_action, REQUEST_ACTION_SIZE, "%s/%s/%d/%d", g__POST_ALARM, g__WEALARID, 0, 0); // First integer is a boolean for alarm ON / OFF
      break;

    // A presence was detected while the alarm was activated
    case POST_PRESENCE:
      snprintf(request_action, REQUEST_ACTION_SIZE, "%s/%s/%d/%d", g__POST_ALARM, g__WEALARID, 1, 1); // Second integer is a boolean for Presence detected or not
      break;

    // Weather data collection ready to be sent
    case POST_WEATHER:
      weather = weather_get();
      snprintf(request_action, REQUEST_ACTION_SIZE, "%s/%s/%d/%d/%d", g__POST_WEATHER, g__WEALARID, weather.temperature, weather.humidity, weather.night);
      break;

    default:
      break;
  }

  snprintf(p_request->string, REQUEST_SIZE, "%s HTTP/1.1\r\nHost: %s:%s\r\n", request_action, g__HOST, g__PORT); // We finish formatting the request with HTTP version and Host/Port information
}
