import time

class timer(object):
    
    def __init__(self):
        self.focusTime = self.getFocusTime()
        self.breakTime = self.getBreakTime()
        self.studyMode = True
        self.startTime = 0
    
    def startTimer(self):
        self.startTime = time.time()
    
    def switchTimer(self):
        self.studyMode = not self.studyMode
        self.startTimer()
        
    def checkDone(self):
        if self.studyMode:
            if (time.time() - self.startTime) >= self.focusTime:
                return True
            else:
                return False
        else:
            if (time.time() - self.startTime) >= self.breakTime:
                return True
            else:
                return False
            
#     def checkPulse(self):
#         if ((int(time.time() - self.startTime)) % 5) == 0 and int(time.time() - self.startTime) != 0:
#             return True
#         else:
#             return False
    
    def getFocusTime(self):
        #TODO: Get the times from Firebase
        return 10
        
    def getBreakTime(self):
        #TODO: Get the times from Firebase
        return 10
    
    def resetTimer(self):
        self.studyMode = True
        self.startTime = 0
        