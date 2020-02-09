import RPi.GPIO as GPIO # Import Raspberry Pi GPIO library
from time import sleep # Import the sleep function from the time module
GPIO.setwarnings(False) # Ignore warning for now
GPIO.setmode(GPIO.BOARD) # Use physical pin numbering
GPIO.setup(32, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(36, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(37, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(16, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(18, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(22, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(40, GPIO.OUT, initial=GPIO.LOW)# Set pin 8 to be an output pin and set initial value to low (off)
while True: # Run forever
    GPIO.output(32, GPIO.HIGH) # Turn on
    sleep(.1) # Sleep for 1 second
    GPIO.output(36, GPIO.HIGH)
    GPIO.output(16, GPIO.HIGH)
    sleep(.1) # Sleep for 1 second
    GPIO.output(37, GPIO.HIGH)
    
    sleep(.1) # Sleep for 1 second
    GPIO.output(40, GPIO.HIGH)
    sleep(.1)
    print("On")
    GPIO.output(32, GPIO.LOW) # Turn on
    sleep(.1) # Sleep for 1 second
    GPIO.output(36, GPIO.LOW)
    GPIO.output(16, GPIO.LOW)
    sleep(.1) # Sleep for 1 second
    GPIO.output(37, GPIO.LOW)
    sleep(.1) # Sleep for 1 second
    GPIO.output(40, GPIO.LOW)
    sleep(.1)
    print("Off")