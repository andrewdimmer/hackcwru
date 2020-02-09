import RPi.GPIO as GPIO

class lightStrip(object):
    
    blue = 12
    green = 16
    yellow = 26
    red = 21
    
    rgB = 24
    rGb = 23
    Rgb = 18
    
    lightModes = ["none", "red", "redYellow", "yellow", "yellowGreen", "green", "greenBlue", "blue", "white"]
    
    def __init__(self):
        self.lightMode = None
        
        self.blue = False
        self.green = False
        self.yellow = False
        self.red = False
        
        self.rgB = False
        self.rGb = False
        self.Rgb = False
        
        self.cBlue = False
        self.cGreen = False
        self.cYellow = False
        self.cRed = False
        
        self.crgB = False
        self.crGb = False
        self.cRgb = False
        
        GPIO.setwarnings(False) # Ignore warning for now
        GPIO.setmode(GPIO.BCM) # Use physical pin numbering
        GPIO.setup(lightStrip.blue, GPIO.OUT, initial=GPIO.LOW)
        GPIO.setup(lightStrip.green, GPIO.OUT, initial=GPIO.LOW)
        GPIO.setup(lightStrip.yellow, GPIO.OUT, initial=GPIO.LOW)
        GPIO.setup(lightStrip.red, GPIO.OUT, initial=GPIO.LOW)
        
        GPIO.setup(lightStrip.rgB, GPIO.OUT, initial=GPIO.LOW)
        GPIO.setup(lightStrip.rGb, GPIO.OUT, initial=GPIO.LOW)
        GPIO.setup(lightStrip.Rgb, GPIO.OUT, initial=GPIO.LOW)
        
    def setLightMode(self, lightMode):
        self.lightMode = lightStrip.lightModes[lightMode]
        self.updateLights()
        
    def updateLights(self):
        if self.lightMode == "red":
            self.setRed()
        elif self.lightMode == "redYellow":
            self.setYellowRed()
        elif self.lightMode == "yellow":
            self.setYellow()
        elif self.lightMode == "yellowGreen":
            self.setGreenYellow()
        elif self.lightMode == "green":
            self.setGreen()
        elif self.lightMode == "greenBlue":
            self.setBlueGreen()
        elif self.lightMode == "blue":
            self.setBlue()
        elif self.lightMode == "none":
            self.blankLights()
        elif self.lightMode == "white":
            self.setWhite()
        
        if self.blue != self.cBlue:
            if self.blue:
                GPIO.output(lightStrip.blue, GPIO.HIGH)
            else:
                GPIO.output(lightStrip.blue, GPIO.LOW)
            self.cBlue = self.blue
        
        if self.green != self.cGreen:
            if self.green:
                GPIO.output(lightStrip.green, GPIO.HIGH)
            else:
                GPIO.output(lightStrip.green, GPIO.LOW)
            self.cGreen = self.green
        
        if self.yellow != self.cYellow:
            if self.yellow:
                GPIO.output(lightStrip.yellow, GPIO.HIGH)
            else:
                GPIO.output(lightStrip.yellow, GPIO.LOW)
            self.cYellow = self.yellow
        
        if self.red != self.cRed:
            if self.red:
                GPIO.output(lightStrip.red, GPIO.HIGH)
            else:
                GPIO.output(lightStrip.red, GPIO.LOW)
            self.cRed = self.red
        
        if self.rgB != self.crgB:
            if self.rgB:
                GPIO.output(lightStrip.rgB, GPIO.HIGH)
            else:
                GPIO.output(lightStrip.rgB, GPIO.LOW)
            self.crgB = self.rgB
        
        if self.rGb != self.crGb:
            if self.rGb:
                GPIO.output(lightStrip.rGb, GPIO.HIGH)
            else:
                GPIO.output(lightStrip.rGb, GPIO.LOW)
            self.crGb = self.rGb
        
        if self.Rgb != self.cRgb:
            if self.Rgb:
                GPIO.output(lightStrip.Rgb, GPIO.HIGH)
            else:
                GPIO.output(lightStrip.Rgb, GPIO.LOW)
            self.cRgb = self.Rgb
    
    def blankLights(self):
        self.blue = False
        self.green = False
        self.yellow = False
        self.red = False
        
        self.rgB = False
        self.rGb = False
        self.Rgb = False
    
    def setBlue(self):
        self.blue = True
        self.green = False
        self.yellow = False
        self.red = False
        
        self.rgB = True
        self.rGb = False
        self.Rgb = False
    
    def setBlueGreen(self):
        self.blue = True
        self.green = True
        self.yellow = False
        self.red = False
        
        self.rgB = True
        self.rGb = True
        self.Rgb = False
    
    def setGreen(self):
        self.blue = False
        self.green = True
        self.yellow = False
        self.red = False
        
        self.rgB = False
        self.rGb = True
        self.Rgb = False
    
    def setGreenYellow(self):
        self.blue = False
        self.green = True
        self.yellow = True
        self.red = False
        
        self.rgB = False
        self.rGb = True
        self.Rgb = False
    
    def setYellow(self):
        self.blue = False
        self.green = False
        self.yellow = True
        self.red = False
        
        self.rgB = False
        self.rGb = True
        self.Rgb = True
    
    def setYellowRed(self):
        self.blue = False
        self.green = False
        self.yellow = True
        self.red = True
        
        self.rgB = False
        self.rGb = False
        self.Rgb = True
    
    def setRed(self):
        self.blue = False
        self.green = False
        self.yellow = False
        self.red = True
        
        self.rgB = False
        self.rGb = False
        self.Rgb = True
    
    def setWhite(self):
        self.blue = False
        self.green = False
        self.yellow = False
        self.red = False
        
        self.rgB = True
        self.rGb = True
        self.Rgb = True