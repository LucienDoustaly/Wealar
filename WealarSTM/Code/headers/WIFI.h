#ifndef WIFI_H_INCLUDED
#define WIFI_H_INCLUDED

#include "../headers/utils.h"

void WIFI_init();
void USART1_GPIOs_init();
void USART1_init();
void USART1_interruption_init();

void TX_BYTE(char data);
void TX_STRING(const char* data);
void TX_MESSAGE(const char* data);

void wifi_module_rst();
void wifi_module_test();
void wifi_module_change_mode(const State* p_state);
void wifi_module_wifi_connection(const WIFI_Credentials* p_credentials);
void wifi_module_tcp_connection();
void wifi_module_send_request_config(const Request* p_request);
void wifi_module_send_request_message(const Request* p_request);

void format_request(Request* p_request, const RequestType request_type);

#endif // WIFI_H_INCLUDED
