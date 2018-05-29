#include "stm32l1xx_nucleo.h"
#include "../headers/utils.h"
#include "./Code/headers/timers.h"
#include "../headers/ADC.h"

/* ############### GLOBAL VALUES ############### */

bool need_tcp_connection = true;

bool g__alarm = false;
bool g__alarm_activated = false;
bool g__alarm_desactivated = false;
char g__alarm_mode = '0';

uint8_t g__digicode_index = 0;
uint8_t g__digicode_line = 0;
bool g__digicode_tempo = false;
char g__digicode_code[DIGICODE_SIZE] = {0};

bool g__alert_presence = false;

bool g__collecting_data = false;
Weather g__weather[WEATHER_SIZE];
uint16_t g__weather_index = 0;

bool g__data_end_bool = false;
bool g__buffer_rst_bool = false;
char g__buffer[BUFFER_SIZE] = {0};

/* ############### CONST VALUES ############### */

const char* g__WEALARID = "3bfa7e19-a06a-4a3c-a957-9787a819d991";

//const char g__CODE[DIGICODE_SIZE-2] = "123456";
const char g__CODE[DIGICODE_SIZE] = "123456";
const char g__DIGICODE_TABLE_VALUES[DIGICODE_NB_LINES][DIGICODE_NB_COLUMNS] = {{'1', '2', '3'},
                                                                               {'4', '5', '6'},
                                                                               {'7', '8', '9'},
                                                                               {'*', '0', '#'}};

const char g__DATA_OK[DATA_END_SIZE] = "\r\n\r\nOK\r\n";
const char g__DATA_DONE[DATA_END_SIZE] = "\r\n\"Done\"";
const char g__DATA_CLOSED[DATA_END_SIZE] = "CLOSED\r\n";

//const char* g__POST_ALARM_MODE = "POST /wealar/alarm";
const char* g__POST_ALARM = "POST /wealar/alarm";
//const char* g__POST_ALARM_OFF = "POST /wealar/off";
//const char* g__POST_PRESENCE = "POST /wealar/presence";
const char* g__POST_WEATHER = "POST /wealar/weather";
const char* g__HOST = "wealarapi.herokuapp.com";
const char* g__PORT = "80";

// SSID & PWD Temporary: allow internet access without asking wifi credentials (not implemented yet)
const char* g__ssid[WIFI_SIZE] = {"COBOUVE",
                          "freebox_AlexGrayson",
                          "Livebox-B06B",
                          "salade-man",
                          "iPhone de Lucien"};
const char* g__pwd[WIFI_SIZE] = {"BE_All10Jtal",
                          "NVX123MKHFS456PIYRZ789NVX",
                          "19EFE062C1AEC987AF19814550",
                          "rosinette",
                          "iledelareunion"};
const Wifi wifi = LUCIEN;

/* ############### FUNCTIONS ############### */

void string_rst(char* string, uint32_t size) {
  for (uint32_t i = 0; i < size; i++)
    string[i] = 0;
}

void request_rst(Request* p_request) {
  string_rst(p_request->string, REQUEST_SIZE);
  p_request->type = POST_PRESENCE;
  p_request->valid = false;
}

void buffer_rst() {
  string_rst(g__buffer, BUFFER_SIZE);
  g__buffer_rst_bool = true;
}

void credentials_rst(WIFI_Credentials* p_credentials) {
  string_rst(p_credentials->ssid, SSID_PWD_SIZE);
  string_rst(p_credentials->pwd, SSID_PWD_SIZE);
  p_credentials->valid = false;
}

void credentials_set(WIFI_Credentials* p_credentials, char* ssid, char* pwd) {
  strcpy(p_credentials->ssid, ssid);
  strcpy(p_credentials->pwd, pwd);
  p_credentials->valid = true;
}

void weather_rst() {
  g__collecting_data = false;
  g__weather_index = 0;
  
  timer_sensors_stop();
  
  for (uint16_t i = 0; i < WEATHER_SIZE; i++) {
    g__weather[i].temperature = 0;
    g__weather[i].humidity = 0;
    g__weather[i].night = false;
    g__weather[i].valid = false;
  }
}

void weather_start_data_collecting() {
  weather_rst();
  ADC_start();
  g__collecting_data = true;
}

void weather_set_temperature(int8_t temperature) {
  if (g__weather_index < WEATHER_SIZE)
    g__weather[g__weather_index].temperature = temperature;
}

void weather_set_humidity(int8_t humidity) {
  if (g__weather_index < WEATHER_SIZE) {
    g__weather[g__weather_index].humidity = humidity;
    g__weather[g__weather_index].valid = true;
  }
}

void weather_set_luminosity(bool night) {
  if (g__weather_index < WEATHER_SIZE) {
    g__weather[g__weather_index].night = night;
    g__weather[g__weather_index].valid = true;
  }
}

bool weather_finished_collecting() {
  bool finished = true;
  
  for (uint16_t i = 0; i < WEATHER_SIZE; i++)
    finished &= g__weather[i].valid;
  
  return finished;
}

Weather weather_get() {
  int32_t temperature_sum = 0;
  uint32_t humidity_sum = 0;
  uint16_t night_cnt = 0;
  Weather weather = {0, 0, false, false};
  
  if (weather_finished_collecting()) {
    for (uint16_t i = 0; i < WEATHER_SIZE; i++) {
      temperature_sum += g__weather[i].temperature;
      humidity_sum += g__weather[i].humidity;
      night_cnt += (g__weather[i].night) ? 1 : 0;
    }
    
    weather.temperature = (int8_t) (temperature_sum / WEATHER_SIZE);
    weather.humidity = (uint8_t) (humidity_sum / WEATHER_SIZE);
    weather.night = (night_cnt >= (WEATHER_SIZE/2));
    weather.valid = true;
  }
  
  return weather;
}