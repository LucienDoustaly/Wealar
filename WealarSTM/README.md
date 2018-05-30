# Code of the microcontroller (STM32)

Here is the microcontroller code for our **Wealar system**, we used an ***STM32L152RE*** for this project.

It has been commented to the understanding of other readers.

# Features
- State Machine for the program structure
- Wifi communication (USART): Station Mode only
- Connection to a remote server via Wifi and sending requests
- Gathering weather data (temperature, humidity & luminosity) via ADC
- Presence detector via interruption
- Digicode management: supply scan on lines / interruption on columns -> mapping

# Sources
**Elodie Pauly**: STM32 code structure (libraries, etc.)

**Benoit Couraud**: Wifi module usage exemples

# References:
- [STM32L152xE](http://www.st.com/content/ccc/resource/technical/document/datasheet/group1/a7/13/6a/ce/1f/f3/40/c1/DM00098321/files/DM00098321.pdf/jcr:content/translations/en.DM00098321.pdf)
- [Reference manual](http://www.st.com/content/ccc/resource/technical/document/reference_manual/cc/f9/93/b2/f0/82/42/57/CD00240193.pdf/files/CD00240193.pdf/jcr:content/translations/en.CD00240193.pdf)
