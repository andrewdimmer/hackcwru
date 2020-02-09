#  OUTPUT DEFINITION
#  The message variable outputs an 8-bit binary value to indicate the event type, gesture direction, and tap location.  
#  Upper 3 bits indicates the event type: gesture or tap.
#  Lower 5 bits indicates the gesture direction or tap location. 
#
#    EVENT TYPE     DIRECTION 
#       000           00000
#  ---------------------------------------------------------
#    GESTURES       DIRECTION FOR GESTURE
#       001            00010 - Right Swipe
#                      00100 - Left Swipe
#                      01000 - Up Swipe 
#                      10000 - Down Swipe
#
#    TAP            DIRECTION FOR TAP
#       010            00001 - South Tap
#                      00010 - West Tap
#                      00100 - North Tap
#                      01000 - East Tap
#                      10000 - Center Tap
#  ----------------------------------------------------------

import time
from Hover_library import Hover
from lights_library import lightStrip
from listener_library import listener
from random import randint
from timer_library import timer


display = lightStrip()

lights = 0

ear = listener()

pomodoro = timer()

hover = Hover(address=0x42, ts=6 , reset=22)

display.setLightMode(8)
time.sleep(.25)
display.setLightMode(0)
time.sleep(.25)
display.setLightMode(8)
time.sleep(.25)
display.setLightMode(0)
time.sleep(.25)

while True:
    try:
        if (hover.getStatus() == 0):

          # Read i2c data and print the type of gesture or touch event
            event = hover.getEvent() 
          
            if event is not None:
                if event == "00100010" or event == "01001000":
                    print("Right")
                    display.setLightMode(7)
                    time.sleep(.25)
                    display.setLightMode(0)
                    while True:
                        #hover.setRelease()
                        event = hover.getEvent()
                        if event is None:
                            if ear.shouldReply():
                                #TODO: Call quack here
                                display.setLightMode(randint(0,8))
                                time.sleep(.16)
                                display.setLightMode(randint(0,8))
                                time.sleep(.16)
                                display.setLightMode(randint(0,8))
                                time.sleep(.16)
                                display.setLightMode(0)
                        else:
                            #TODO: Call quack here
                            display.setLightMode(8)
                            time.sleep(.25)
                            display.setLightMode(0)
                            break                    
                        
                elif event == "00100100" or event == "01000010":
                    print("Left")
                    display.setLightMode(1)
                    time.sleep(.25)
                    display.setLightMode(0)
                    pomodoro.resetTimer()
                    pomodoro.startTimer()
                    display.setLightMode(1)
                    while True:
                        #hover.setRelease()
                        event = hover.getEvent()
                        if event is None:
                            if pomodoro.checkDone():
                                #TODO: Call quack here
                                if pomodoro.studyMode:
                                    display.setLightMode(1)
                                    time.sleep(.5)
                                    display.setLightMode(7)
                                    time.sleep(.5)
                                    display.setLightMode(1)
                                    time.sleep(.5)
                                    display.setLightMode(7)
                                else:
                                    display.setLightMode(7)
                                    time.sleep(.5)
                                    display.setLightMode(1)
                                    time.sleep(.5)
                                    display.setLightMode(7)
                                    time.sleep(.5)
                                    display.setLightMode(1)
                                pomodoro.switchTimer()
                                pomodoro.startTimer()
                        else:
                            #TODO: Call quack here
                            display.setLightMode(8)
                            time.sleep(.25)
                            display.setLightMode(0)
                            break
                elif event == "00101000" or event == "01000100":
                    print("Up")
                elif event == "00110000" or event == "01000001":
                    print("Down")
                    display.setLightMode(0)
                elif event == "01010000":
                    print("Quack")
                else:
                    print("None")
          # Release the ts pin until Hover is ready to send the next event
            hover.setRelease()
        time.sleep(0.001)
    except:
        print("Something went wrong.")
