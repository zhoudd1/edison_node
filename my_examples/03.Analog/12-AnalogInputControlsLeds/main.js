/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

/*
 * Read analog input and use it to control the length of the on-off cycles of more thnan one LED.
 * MRAA - Low Level Skeleton Library for Communication on GNU/Linux platforms
 * Library in C/C++ to interface with Galileo & other Intel platforms, in a structured and sane API with port nanmes/numbering that match boards & with bindings to javascript & python.
 *
 * Steps for installing MRAA & UPM Library on Intel IoT Platform with IoTDevKit Linux* image
 * Using a ssh client: 
 * 1. echo "src maa-upm http://iotdk.intel.com/repos/1.1/intelgalactic" > /etc/opkg/intel-iotdk.conf
 * 2. opkg update
 * 3. opkg upgrade
 * Article: https://software.intel.com/en-us/html5/articles/intel-xdk-iot-edition-nodejs-templates
 */

var mraa = require("mraa");         // require mraa
var analogPin0 = new mraa.Aio(0); // setup access analog input Analog pin #0 (A0)
var ledPin2 = new mraa.Gpio(2);   // Initialize LED on Digital Pin #2 (D2)
var ledPin4 = new mraa.Gpio(4);   // Initialize LED on Digital Pin #2 (D2)

function setup() {
   console.log('MRAA Version: ' + mraa.getVersion());
   ledPin2.dir( mraa.DIR_OUT );        // set the gpio direction to output
   ledPin4.dir( mraa.DIR_OUT );        // set the gpio direction to output
}

setInterval(function () {
   var analogIntegerValue = 0;
   var analogFloatValue = 0.0;
   analogIntegerValue = analogPin0.read();      // read the value of the analog pin
   analogFloatValue = analogIntegerValue / 1024;
   pwm3.write( analogFloatValue );        // Write duty cycle (brightness) value.
   console.log( "analogIntegerValue: " + analogIntegerValue + "; analogFloatValue: " + analogFloatValue )
}, 100 );

setup();

