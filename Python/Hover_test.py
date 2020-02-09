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
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import google.cloud

# Use a service account
cred = credentials.Certificate('/home/pi/Documents/Duck You/hackcwru-2020-gcp-fc3498e24b3a.json')
firebase_admin.initialize_app(cred)

db = firestore.client()


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

duckName = "MyDuck"

lastQuack = 0

def quack(lastQuack):
    if time.time() - lastQuack > 2:
        doc_ref = db.collection(u'ducks').document(duckName+"_quack")
        doc_ref.set({
            u'quacking': True
        })
        lastQuack = time.time()
        
def pullInfo():
    duckDoc = db.collection(u'ducks').document(u'DUCKS')
    
    try:
        doc = duckDoc.get()
        dictDoc = doc.to_dict()
    except google.cloud.exceptions.NotFound:
        print(u'No such document!')
        display.setLightMode(3)
        return False
    
    idDict = dictDoc['ducks']
    
    identifier = idDict[duckName]
    
    if identifier != "":
    
        userDoc = db.collection(u'users').document(identifier)
    else:
        print(u'Unassigned duck')
        display.setLightMode(3)
        return False
    
    try:
        doc = userDoc.get()
        infoDoc = doc.to_dict()
    except google.cloud.exceptions.NotFound:
        print(u'No such document!')
        display.setLightMode(3)
        return False
    
    financialInfo = []
    
    weekNumber = infoDoc['weekNumber']
    
    amountSpent = infoDoc['amountSpent']
    
    total = infoDoc['finance']['total']
    
    weekly = infoDoc['finance']['weekly']
    
    financialInfo.append(infoDoc['finance']['week1'])
    financialInfo.append(infoDoc['finance']['week2'])
    financialInfo.append(infoDoc['finance']['week3'])
    financialInfo.append(infoDoc['finance']['week4'])
    
    sumation = 0
    for week in financialInfo:
        sumation += week
        
    if (financialInfo[weekNumber] + (total - sumation)/4) == 0:
        display.setLightMode(3)
        return False
    else:
        score = (amountSpent)/(financialInfo[weekNumber] + weekly)
        score = float("{0:.2f}".format(score))
    
    if score >= 2:
        display.setLightMode(1)
        return True
    elif score >= 1.6:
        display.setLightMode(2)
        return True
    elif score >= 1.3:
        display.setLightMode(3)
        return True
    elif score >= 1:
        display.setLightMode(4)
        return True
    elif score >= .9:
        display.setLightMode(5)
        return True
    elif score >= .8:
        display.setLightMode(6)
        return True
    elif score >= .5:
        display.setLightMode(7)
        return True
    elif score >= 0:
        display.setLightMode(8)
        return True
    


        
while True:
#     try:
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
                                quack(lastQuack)
                                display.setLightMode(randint(0,8))
                                time.sleep(.16)
                                display.setLightMode(randint(0,8))
                                time.sleep(.16)
                                display.setLightMode(randint(0,8))
                                time.sleep(.16)
                                display.setLightMode(0)
                        else:
                            quack(lastQuack)
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
                                quack(lastQuack)
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
                            quack(lastQuack)
                            display.setLightMode(8)
                            time.sleep(.25)
                            display.setLightMode(0)
                            break
                elif event == "00101000" or event == "01000100":
                    print("Up")
                    display.setLightMode(0)
                elif event == "00110000" or event == "01000001":
                    print("Down")
                    pullInfo()
                    lastInfo = time.time()
                    while True:
                        #hover.setRelease()
                        event = hover.getEvent()
                        if event is None:
                            if time.time() - lastInfo > 15:
                               pullInfo()
                               lastInfo = time.time()
                        else:
                            quack(lastQuack)
                            display.setLightMode(8)
                            time.sleep(.25)
                            display.setLightMode(0)
                            break
                elif event == "01010000":
                    print("Quack")
                    quack(lastQuack)
                else:
                    print("None")
          # Release the ts pin until Hover is ready to send the next event
            hover.setRelease()
        time.sleep(0.001)
#     except:
#         print("Something went wrong.")


