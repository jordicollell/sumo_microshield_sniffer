function davant () {
    microshield.MotorRun(microshield.Motors.M1, 50)
    microshield.MotorRun(microshield.Motors.M2, 50)
    alerta = 0
    sensor_davant_dret = pins.digitalReadPin(DigitalPin.P12)
    sensor_davant_esquerra = pins.digitalReadPin(DigitalPin.P13)
    while (sensor_davant_dret == 0 && (sensor_davant_esquerra == 0 && alerta == 0)) {
        sonar2 = sonar.ping(
        DigitalPin.P14,
        DigitalPin.P15,
        PingUnit.Centimeters
        )
        sensor_davant_esquerra = pins.digitalReadPin(DigitalPin.P12)
        sensor_davant_dret = pins.digitalReadPin(DigitalPin.P13)
        if (sonar2 > 2 && sonar2 < 25) {
            alerta = 1
        }
    }
    if (sensor_davant_dret == 1 || sensor_davant_esquerra == 1) {
        GIRAR_VINGUENT_DAVANT()
    } else {
        darrere()
    }
}
function GIRAR_VINGUENT_DAVANT () {
    microshield.MotorRun(microshield.Motors.M1, -70)
    microshield.MotorRun(microshield.Motors.M2, -70)
    basic.pause(800)
    índex = 0
    for (let índex = 0; índex <= 15; índex++) {
        microshield.MotorRun(microshield.Motors.M2, 50)
        microshield.MotorRun(microshield.Motors.M1, -50)
        basic.pause(100)
        microshield.MotorStop(microshield.Motors.M1)
        microshield.MotorStop(microshield.Motors.M2)
        basic.pause(100)
        sonar2 = sonar.ping(
        DigitalPin.P14,
        DigitalPin.P15,
        PingUnit.Centimeters
        )
        if (sonar2 > 2 && sonar2 <= 40) {
            darrere()
        }
    }
    davant()
}
function darrere () {
    microshield.MotorRun(microshield.Motors.M1, -50)
    microshield.MotorRun(microshield.Motors.M2, -50)
    sensor_darrera_esquerra = pins.digitalReadPin(DigitalPin.P4)
    sensor_darrera_dret = pins.digitalReadPin(DigitalPin.P6)
    while (sensor_darrera_dret == 0 && sensor_darrera_esquerra == 0) {
        sensor_darrera_esquerra = pins.digitalReadPin(DigitalPin.P4)
        sensor_darrera_dret = pins.digitalReadPin(DigitalPin.P6)
    }
    GIRAR_VINGUENT_DARRERA2()
}
function GIRAR_VINGUENT_DARRERA2 () {
    microshield.MotorRun(microshield.Motors.M1, 70)
    microshield.MotorRun(microshield.Motors.M2, 70)
    basic.pause(800)
    sonar2 = sonar.ping(
    DigitalPin.P14,
    DigitalPin.P15,
    PingUnit.Centimeters
    )
    if (sonar2 > 2 && sonar2 < 25) {
        darrere()
    }
    gir = randint(0, 1)
    if (gir == 0) {
        microshield.MotorRun(microshield.Motors.M1, -50)
        microshield.MotorRun(microshield.Motors.M2, 50)
    } else {
        microshield.MotorRun(microshield.Motors.M1, 50)
        microshield.MotorRun(microshield.Motors.M2, -50)
    }
    temps_de_gir = randint(400, 1000)
    basic.pause(temps_de_gir)
    basic.pause(100)
    davant()
}
let temps_de_gir = 0
let gir = 0
let sensor_darrera_dret = 0
let sensor_darrera_esquerra = 0
let índex = 0
let sonar2 = 0
let sensor_davant_esquerra = 0
let sensor_davant_dret = 0
let alerta = 0
microshield.MotorStop(microshield.Motors.M1)
microshield.MotorStop(microshield.Motors.M2)
pins.setPull(DigitalPin.P7, PinPullMode.PullNone)
basic.showLeds(`
    . . . . .
    . . . . .
    # . . . #
    . . . . .
    . . . . .
    `)
while (pins.digitalReadPin(DigitalPin.P5) == 1 && pins.digitalReadPin(DigitalPin.P11) == 1) {
	
}
basic.clearScreen()
led.plot(2, 2)
basic.pause(2000)
led.enable(false)
davant()
