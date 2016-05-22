/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

/*
 * A simple node.js application intended to read data from Digital pins on the Intel based 
 *   development boards such as the Intel(R) Galileo and Edison with Arduino breakout board.
 *
 * MRAA - Low Level Skeleton Library for Communication on GNU/Linux platforms
 * Library in C/C++ to interface with Galileo & other Intel platforms, in a structured and sane API with 
 *   port nanmes/numbering that match boards & with bindings to javascript & python.
 *
 * Steps for installing MRAA & UPM Library on Intel IoT Platform with IoTDevKit Linux* image
 * Using a ssh client: 
 * 1. echo "src maa-upm http://iotdk.intel.com/repos/1.1/intelgalactic" > /etc/opkg/intel-iotdk.conf
 * 2. opkg update
 * 3. opkg upgrade
 *
 * Article: https://software.intel.com/en-us/html5/articles/intel-xdk-iot-edition-nodejs-templates
 */

var mraa = require('mraa'); //require mraa

var pin7Sensor = new mraa.Gpio( 7 ); // setup digital read on Digital pin #7 (D7)
var pin2Led = new mraa.Gpio( 2 );    // setup digital read on Digital pin #2 (D2)

var OFF = 0;
var ON = 1;

var pin2State = ON;
var loopMs = 200;

/*
 * Functions - useful subroutines
 */
function toggleState( offOrOn ) {
   if ( offOrOn == OFF ) {
      return ON;
   } else {
      return OFF;
   }
}
function togglePin2() {
   pin2State = toggleState( pin2State );
   console.log( 'pin2State = ' + pin2State );
   pin2Led.write( pin2State );
}

/**
 * Setup pin 7 as the input sensor and pin2 as the output led
 */
function setup() {
   console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the console
   pin7Sensor.dir( mraa.DIR_IN );   // button: set the gpio direction to input
   pin2Led.dir( mraa.DIR_OUT );     // led: set the gpio direction to output
}
/**
 * Recursive loop loops forever
 */
function loop() {
   var pin8Value =  pin7Sensor.read();     // read the digital value of the pin
   console.log( 'Gpio is ' + pin8Value );  // write the read value out to the console
   if ( pin8Value == 1 ) {
      console.log( 'Toggling pin 2' );
      togglePin2();
   }
   setTimeout( loop, loopMs );
}

setup();

loop();

