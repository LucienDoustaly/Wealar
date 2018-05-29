#include "stm32l1xx_nucleo.h"
#include "./Code/headers/utils.h"
#include "./Code/headers/timers.h"
#include "./Code/headers/WIFI.h"
#include "./Code/headers/digicode.h"
#include "./Code/headers/sensors.h"
#include "./Code/headers/ADC.h"

void sys_init();
void program_init();

// Global variables (defined in utils.c)
extern bool need_tcp_connection;
extern bool g__alarm_activated;
extern bool g__alarm_desactivated;
extern bool g__collecting_data;
extern bool g__alert_presence;
extern bool g__data_end_bool;

// Temporary: waiting implementation of asking user wifi credentials
extern char* g__ssid[WIFI_SIZE];
extern char* g__pwd[WIFI_SIZE];
extern Wifi wifi;

void main() {
  // System initialization (Reset and Clock initialization of STM32)
  sys_init();

  Request request = {{0}, POST_PRESENCE, false};
  uint8_t time_out_cnt = TIME_OUT_RST;
  State state = START;

  // Initialization of SSID & PWD credentials for Wifi connection
  WIFI_Credentials credentials;
  credentials_rst(&credentials);
  credentials_set(&credentials, g__ssid[wifi], g__pwd[wifi]); // Temporary: waiting implementation of asking user wifi credentials

  while(1) {
    // Reset data received by Wifi (USART1)
    g__data_end_bool = false;
    buffer_rst();

    // State Machine of the program
    switch(state) {
      // Initialization of the program (GPIOs, Timers, etc.)
      case START:
        program_init();
        weather_start_data_collecting(); // Start gathering weather data (takes 30s)
        state = CHECK_WIFI_MODULE;
        break;

      // Check communication with the Wifi module
      case CHECK_WIFI_MODULE:
        wifi_module_test();
        wifi_tempo(DEFAULT_TEMPO);

        if (g__data_end_bool) // Received "OK" from the Wifi module, we can execute the next step
          state = CHECK_WIFI_SAVED;
        break;

      // If SSID & PWD credentials are already stored, we'll use them to connect to a Wifi
      // Otherwise, we need to ask these credentials to the users
      case CHECK_WIFI_SAVED:
        if (credentials.valid)
          state = SET_MODE_TO_STATION;
        /*else
          state = SET_MODE_TO_SOFTAP;*/ // Not implemented yet
        break;

      // Configuration of the Wifi module: SoftAp Mode (emits its own Wifi)
      case SET_MODE_TO_SOFTAP:
        wifi_module_change_mode(&state);
        wifi_tempo(DEFAULT_TEMPO);

        if (g__data_end_bool) { // Received "OK" from the Wifi module, we can execute the next step
          time_out_cnt = TIME_OUT_RST;
          state = WAITING_FOR_REQUEST;
        }
        else if (time_out_cnt >= TIME_OUT_LIMIT) { // No response, and timeout reached: we go back and check communication with the wifi module
          time_out_cnt = TIME_OUT_RST;
          state = CHECK_WIFI_MODULE;
        }
        else // No response: we try again
          time_out_cnt++;
        break;

      // Not implemented yet
      case WAITING_FOR_REQUEST:
        break;

      // Not implemented yet
      case ANALIZING_REQUEST:
        break;

      // Not implemented yet
      case SENDING_WEBPAGE:
        break;

      // Not implemented yet
      case SAVING_WIFI:
        break;

      // Configuration of the Wifi module: Station Mode (connects to a Wifi)
      case SET_MODE_TO_STATION:
        wifi_module_change_mode(&state);
        wifi_tempo(DEFAULT_TEMPO);

        if (g__data_end_bool) { // Received "OK" from the Wifi module, we can execute the next step
          time_out_cnt = TIME_OUT_RST;
          state = WIFI_CONNECTION;
        }
        else if (time_out_cnt >= TIME_OUT_LIMIT) { // No response, and timeout reached: we go back and check communication with the wifi module
          time_out_cnt = TIME_OUT_RST;
          state = CHECK_WIFI_MODULE;
        }
        else // No response: we try again
          time_out_cnt++;
        break;

      // Connection to Wifi with saved credentials
      case WIFI_CONNECTION:
        wifi_module_wifi_connection(&credentials);
        wifi_tempo(LONG_TEMPO);

        if (g__data_end_bool) { // Received "OK" from the Wifi module, we can execute the next step
          time_out_cnt = TIME_OUT_RST;
          need_tcp_connection = true;
          state = COLLECTING_DATA;
        }
        else if (time_out_cnt >= TIME_OUT_LIMIT) { // No response, and timeout reached: we go back and check communication with the wifi module
          credentials_rst(&credentials);
          time_out_cnt = TIME_OUT_RST;
          state = CHECK_WIFI_MODULE;
        }
        else // No response: we try again
          time_out_cnt++;
        break;

      // Waiting for an information to be sent via Wifi (alarm on/off, presence detection, weather data)
      case COLLECTING_DATA:
        if (!g__collecting_data && !weather_finished_collecting()) // Starts the weather data gathering if not already started (in production mode: synchronize data collection on a timer)
          weather_start_data_collecting();

        // If the system is ready to send an information via Wifi
        //    -> The alarm has just been activated
        //    -> The alarm has just been deactivated
        //    -> The system detected a presence near the house
        //    -> Finished gathering weather data
        if (g__alarm_activated || g__alarm_desactivated || g__alert_presence || weather_finished_collecting()) {
          request_rst(&request);

          // We first format the string HTTP request to be sent via Wifi
          format_request(&request, ((g__alarm_desactivated) ? POST_ALARM_OFF : ((g__alarm_activated) ? POST_ALARM_MODE : ((g__alert_presence) ? POST_PRESENCE : POST_WEATHER))));
          state = (need_tcp_connection) ? TCP_CONNECTION : CONFIGURE_MESSAGE;
        }
        break;

      // TCP Connection with the API Server of Wealar
      case TCP_CONNECTION:
        wifi_module_tcp_connection();
        wifi_tempo(LONG_TEMPO);

        if (g__data_end_bool) { // Received "OK" from the Wifi module, we can start sending the request
          time_out_cnt = TIME_OUT_RST;
          need_tcp_connection = false;
          state = CONFIGURE_MESSAGE;
        }
        else if (time_out_cnt >= TIME_OUT_LIMIT) { // No response, and timeout reached: we go back to setting (checking) wifi connection
          time_out_cnt = TIME_OUT_RST;
          state = WIFI_CONNECTION;
        }
        else // No response: we try again
          time_out_cnt++;
        break;

      // First part of the request: configuration information about the request (size)
      case CONFIGURE_MESSAGE:
        wifi_module_send_request_config(&request);
        wifi_tempo(DEFAULT_TEMPO);

        if (g__data_end_bool) { // Received "OK" from the Wifi module, now we can send the request
          time_out_cnt = TIME_OUT_RST;
          state = SENDING_MESSAGE;
        }
        else if (time_out_cnt >= TIME_OUT_LIMIT) { // No response, and timeout reached: we go back to setting (checking) TCP connection to the API Server of Wealar
          time_out_cnt = TIME_OUT_RST;
          state = TCP_CONNECTION;
        }
        else // No response: we try again
          time_out_cnt++;
        break;

      // Second part of the request: sending the actual request
      case SENDING_MESSAGE:
        wifi_module_send_request_message(&request);
        wifi_tempo(LONG_TEMPO);

        if (g__data_end_bool) { // Received "OK" from the Wifi module, we re-initialize the variables used to send the message and go back to collecting data
          time_out_cnt = TIME_OUT_RST;
          state = COLLECTING_DATA;

          switch (request.type) {
            case POST_ALARM_MODE:
              g__alarm_activated = false;
              break;

            case POST_ALARM_OFF:
              g__alarm_desactivated = false;
              break;

            case POST_PRESENCE:
              g__alert_presence = false;
              break;

            default:
              weather_rst();
              break;
          }
        }
        else if (time_out_cnt >= TIME_OUT_LIMIT) { // No response, and timeout reached: we go back to setting (checking) TCP connection to the API Server of Wealar
          time_out_cnt = TIME_OUT_RST;
          state = TCP_CONNECTION;
        }
        else // No response: we try again
          time_out_cnt++;
        break;

      // Default case, never suppose to happen: we go back to the program initialization (just in case)
      default:
        state = START;
        time_out_cnt = TIME_OUT_RST;
        break;
    }
  }
}

// System initialization (Reset and Clock initialization of STM32)
void sys_init() {
  RCC->CR = RCC_CR_HSION;

  //!< Reset SW[1:0], HPRE[3:0], PPRE1[2:0], PPRE2[2:0], MCOSEL[2:0] and MCOPRE[2:0] bits
  RCC->CFGR |= (uint32_t)0xC1400005; // 11000001010000000000000000000101
  RCC->CFGR &= (uint32_t)0xC9C2C005; // 11001001110000101100000000000101

  RCC->CFGR &= ~RCC_CFGR_MCOSEL;
  RCC->CFGR |= RCC_CFGR_MCOSEL_0;

  SystemCoreClockUpdate();
}

// Initialization of the program (GPIOs, Timers, etc.)
void program_init() {
  timers_init();
  WIFI_init();
  digicode_init();
  sensors_init();
  ADC_init();
}
