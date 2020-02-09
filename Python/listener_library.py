import time
import RPi.GPIO as GPIO
from random import randint

class listener(object):
    
    lastTalkTime = 0
    waitTime = 0
    pin = 19

    def __init__(self):
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(listener.pin, GPIO.IN)
        GPIO.setwarnings(False)
        
        GPIO.add_event_detect(listener.pin, GPIO.BOTH, bouncetime=100)
        GPIO.add_event_callback(listener.pin, listener.callback)

    def callback(pin):
        #print("Talking")        
        listener.lastTalkTime = time.time()
        
    def shouldReply(self):
        if listener.lastTalkTime != 0:
            listener.waitTime = time.time() - listener.lastTalkTime
        if listener.waitTime >= 1 and listener.waitTime <= 1.5:
            return True
        else:
            return False
        
        
