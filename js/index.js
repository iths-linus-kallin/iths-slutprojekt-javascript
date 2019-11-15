var polySynth = new Tone.PolySynth(3, Tone.Synth)
Tone.context.lookAhead = 0

function piano(){
    
    var keyToPitch = { "a":"C4", "w":"C#4", "s":"D4", "e":"D#4", "d":"E4", "f":"F4", "t":"F#4", "g":"G4", "y":"G#4", "h":"A4", "u":"A#4", "j":"B4", "k":"C5" }
    var keyToElement = { "a":".c1", "w":".ciss1", "s":".d1", "e":".diss1", "d":".e1", "f":".f1", "t":".fiss1", "g":".g1", "y":".giss1", "h":".a1", "u":".aiss1", "j":".b1", "k":".c2" }
    var keyToElementBlack = { "w":".ciss1", "e":".diss1", "t":".fiss1", "y":".giss1", "u":".aiss1" }

    var gain = new Tone.Gain(0.05)
    var freeverb = new Tone.Freeverb()
    freeverb.dampening.value = 2000;
    freeverb.roomSize.value = 0.8;
    freeverb.wet.value = 0.5
    var filter = new Tone.Filter(3000, "lowpass", -12)
    var chorus = new Tone.Chorus(4, 2.5, 0.04)
    var delay = new Tone.FeedbackDelay("8n", 0.2)

    polySynth.set({
        oscillator: {
          type: 'sine',
        },
        envelope: {
          attack: 0.001,
          decay: 2,
          sustain: 0,
          release: 4
        }
    })
    polySynth.chain(filter, chorus, freeverb, delay, gain, Tone.Master)

// ----------------KEYBOARD--------------------

    var down = false;
    window.addEventListener('keydown', e => {
        if(e.repeat) {return}
        if(Object.keys(keyToPitch).includes(e.key)){
            polySynth.triggerAttack(keyToPitch[e.key])
            let keys = document.querySelector(keyToElement[e.key])
            keys.classList.add("pushed")
        }else{
            return
        }
    })

    
    window.addEventListener('keyup', e => {
        if(Object.keys(keyToPitch).includes(e.key)){
            polySynth.triggerRelease(keyToPitch[e.key])
            let keys = document.querySelector(keyToElement[e.key])
            keys.classList.remove("pushed")
        }else{
            return
        }
    })

// -----------------MOUSE CLICK-----------------

    let keys = document.querySelectorAll("section")
    for(var k = 0; k < keys.length; k++){
        keys[k].addEventListener("mousedown", e => {
            let tone = e.currentTarget.getAttribute("data-tone")
            polySynth.triggerAttack(tone)
        })
        keys[k].addEventListener("mouseup", e => {
            polySynth.triggerRelease()
        })
    }
}

function kick(){

    var gain = new Tone.Gain(0.1)
    var filter = new Tone.Filter(500, "lowpass", -12)
    var freeverb = new Tone.Freeverb()
    freeverb.dampening.value = 1000;
    freeverb.roomSize.value = 0.5;
    freeverb.wet.value = 0.5
    var kick = new Tone.MembraneSynth()
    kick.chain(gain, filter, Tone.Master)
    var loop = new Tone.Loop(function(time){
        kick.triggerAttackRelease("C2", "4n");
    }, "4n").start(0);
    loop.mute = true
    loop.start(0)

    let kickbutton = document.querySelector(".kick")
    kickbutton.addEventListener("click", e => {
        if(loop.mute == true){
            loop.mute = false
            Tone.Transport.start();
            kickbutton.style.backgroundImage = "url(https://www.dropbox.com/s/cxg7v6yrieajzdv/stop.png?raw=1)"
        }else{
            loop.mute = true
            kickbutton.style.backgroundImage = "url(https://www.dropbox.com/s/pi6ra58qvowk8l2/kick.png?raw=1)"
        }
    })
    
}

function snare(){

    var gain = new Tone.Gain(0.03)
    var dist = new Tone.Distortion(0.3)
    var freeverb = new Tone.Freeverb()
    freeverb.dampening.value = 1000;
    freeverb.roomSize.value = 0.5;
    freeverb.wet.value = 0.3
    var snare = new Tone.MembraneSynth({
        envelope: {
            attack: 0.001,
            decay: 0.2,
            sustain: 0,
            release: 0.2
        }
      })
    snare.chain(gain, freeverb, dist, Tone.Master)
    var loop = new Tone.Loop(function(time){
        snare.triggerAttackRelease("B3", "8n");
    }, "2n").start(0);
    loop.mute = true
    loop.start(0)

    let snarebutton = document.querySelector(".snare")
    snarebutton.addEventListener("click", e => {
        if(loop.mute == true){
            loop.mute = false
            Tone.Transport.start();
            snarebutton.style.backgroundImage = "url(https://www.dropbox.com/s/cxg7v6yrieajzdv/stop.png?raw=1)"
        }else{
            loop.mute = true
            snarebutton.style.backgroundImage = "url(https://www.dropbox.com/s/mkwz8ldzt2lvmtg/snare.png?raw=1)"
        }
    })
    
}

function hihat(){

    var gain = new Tone.Gain(0.05)
    var dist = new Tone.Distortion(0.2)
    var hihat = new Tone.MembraneSynth({
        envelope: {
            attack: 0.001,
            decay: 0.01,
            sustain: 0,
            release: 0.05
        }
      })
    hihat.chain(gain, dist, Tone.Master)
    var loop = new Tone.Loop(function(time){
        hihat.triggerAttackRelease("G5", "8n");
    }, "8n").start(0);
    loop.mute = true
    loop.start(0)

    let hihatButton = document.querySelector(".hihat")
    hihatButton.addEventListener("click", e => {
        if(loop.mute == true){
            loop.mute = false
            Tone.Transport.start();
            hihatButton.style.backgroundImage = "url(https://www.dropbox.com/s/cxg7v6yrieajzdv/stop.png?raw=1)"
        }else{
            loop.mute = true
            hihatButton.style.backgroundImage = "url(https://www.dropbox.com/s/4t8lwnhfa4bcfh2/hihat.png?raw=1)"
        }
    })
    
}

function changeSound(){
    var sound1 = document.querySelector(".sound1")
    sound1.addEventListener('click', e=>{
        polySynth.set({
            oscillator: {
              type: 'sine',
            },
            envelope: {
              attack: 0.001,
              decay: 19,
              sustain: 0,
              release: 5
            }
        })
    })

    var sound2 = document.querySelector(".sound2")
    sound2.addEventListener('click', e=>{
        polySynth.set({
            oscillator: {
              type: 'sawtooth',
              detune: 5
            },
            envelope: {
              attack: 0.001,
              decay: 1,
              sustain: 0,
              release: 1
            }
        })
    })
}

piano()
kick()
snare()
hihat()
changeSound()

// let c = document.querySelector("body")
// c.addEventListener("click", function(){
//     if (Tone.context.state !== 'running') {
//         Tone.context.resume();
//       }
//     piano()
// })