#ifndef UTILS_H_INCLUDED
#define UTILS_H_INCLUDED

/**
  * ######################################################
  * LIBRARIES
  * ######################################################
  */

#include <stdio.h>
#include <string.h>

/**
  * ######################################################
  * DEFINE VALUES
  * ######################################################
  */

// BIT Checking
#define CHECK_BIT(var,pos) (((var) & (1<<(pos))) != 0)

// Boolean
#define true 1
#define false 0

// Define time out
#define TIME_OUT_LIMIT 3
#define TIME_OUT_RST 1

// Define tempo timer (in ms)
#define DEFAULT_TEMPO 3000
#define LONG_TEMPO 13000

// Digicode
#define DIGICODE_NB_LINES 4
#define DIGICODE_NB_COLUMNS 3
#define DIGICODE_SIZE 7

// Array sizes
#define WEATHER_SIZE 240
#define SSID_PWD_SIZE 50
#define BUFFER_SIZE 1000
#define REQUEST_ACTION_SIZE 128
#define REQUEST_SIZE 200
#define DATA_END_SIZE 9

// WEATHER MAX_MIN
#define TEMPERATURE_MAX 125
#define TEMPERATURE_MIN -40
#define HUMIDITY_MAX 100
#define HUMIDITY_MIN 0
#define LUMINOSITY_MAX 920

// WEATHER INIT
#define TEMPERATURE_INIT 127
#define HUMIDITY_INIT 255

// Temporary: waiting implementation of asking user wifi credentials
#define WIFI_SIZE 1

/**
  * ######################################################
  * TYPE DEFINITION
  * ######################################################
  */

// Temporary: waiting implementation of asking user wifi credentials
typedef enum {
  ISEN
} Wifi;

typedef enum {
  START,
  CHECK_WIFI_MODULE,
  CHECK_WIFI_SAVED,
  SET_MODE_TO_SOFTAP,
  WAITING_FOR_REQUEST,
  ANALIZING_REQUEST,
  SENDING_WEBPAGE,
  SAVING_WIFI,
  SET_MODE_TO_STATION,
  WIFI_CONNECTION,
  COLLECTING_DATA,
  TCP_CONNECTION,
  CONFIGURE_MESSAGE,
  SENDING_MESSAGE
} State;

typedef enum {
  POST_ALARM_MODE,
  POST_ALARM_OFF,
  POST_PRESENCE,
  POST_WEATHER
} RequestType;

typedef int bool;

typedef struct {
  char ssid[SSID_PWD_SIZE];
  char pwd[SSID_PWD_SIZE];
  bool valid;
} WIFI_Credentials;

typedef struct {
  char string[REQUEST_SIZE];
  RequestType type;
  bool valid;
} Request;

typedef enum {
  TEMPERATURE,
  HUMIDITY,
  LUMINOSITY
} WeatherData;

typedef struct {
  int8_t temperature;
  uint8_t humidity;
  bool night;
  bool valid;
} Weather;

/**
  * ######################################################
  * Common Functions
  * ######################################################
  */

void string_rst(char* string, uint32_t size);

void request_rst(Request* p_request);

void buffer_rst();

/**
  * ######################################################
  * Credentials Functions
  * ######################################################
  */

void credentials_rst(WIFI_Credentials* p_credentials);
void credentials_set(WIFI_Credentials* p_credentials, char* ssid, char* pwd);

/**
  * ######################################################
  * Weather Functions
  * ######################################################
  */

void weather_rst();

void weather_start_data_collecting();

void weather_set_temperature(int8_t temperature);
void weather_set_humidity(int8_t humidity);
void weather_set_luminosity(bool night);

bool weather_finished_collecting();

Weather weather_get();

#endif // UTILS_H_INCLUDED
