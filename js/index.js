// function stopRepeat(){
//     window.addEventListener('keydown', e => { 
//         if (e.repeat) return; 
//     }, false)
// }

function piano(){
    
    var keyToPitch = { "a":"C4", "w":"C#4", "s":"D4", "e":"D#4", "d":"E4", "f":"F4", "t":"F#4", "g":"G4", "y":"G#4", "h":"A4", "u":"A#4", "j":"B4", "k":"C5" }
    var keyToElement = { "a":".c1", "w":".ciss1", "s":".d1", "e":".diss1", "d":".e1", "f":".f1", "t":".fiss1", "g":".g1", "y":".giss1", "h":".a1", "u":".aiss1", "j":".b1", "k":".c2" }
    var keyToElementBlack = { "w":".ciss1", "e":".diss1", "t":".fiss1", "y":".giss1", "u":".aiss1" }
    var elementToPitch = { ".c1":"C4", ".ciss1":"C#4", ".d1":"D4", ".diss1":"D#4", ".e1":"E4", ".f1":"F4", ".fiss1":"F#4", ".g1":"G4", ".giss1":"G#4", ".a1":"A4", ".aiss1":"A#4", ".b1":"B4", ".c2":"C5" }

    var gain = new Tone.Gain(0.03)
    var freeverb = new Tone.Freeverb()
    freeverb.dampening.value = 2000;
    freeverb.roomSize.value = 0.87;
    freeverb.wet.value = 0.5
    var filter = new Tone.Filter(1500, "lowpass", -12)
    var chorus = new Tone.Chorus(4, 2.5, 0.04)
    var delay = new Tone.FeedbackDelay("8n", 0.3)

    var polySynth = new Tone.PolySynth(3, Tone.Synth)
    polySynth.set({
        oscillator: {
          type: 'square',
        },
        envelope: {
          attack: 0.001,
          decay: 19,
          sustain: 0,
          release: 5
        }
      })
    polySynth.chain(gain, filter, chorus, freeverb, delay, Tone.Master)

// ----------------KEYBOARD--------------------

    var down = false;
    window.addEventListener('keydown', e => {
        if(down) return;
        down = true;
        polySynth.triggerAttack(keyToPitch[e.key])
        let keys = document.querySelector(keyToElement[e.key])
        keys.style.background = "rgb(184, 55, 32)"
    }, false)

    window.addEventListener('keyup', function () {
        down = false;
    }, false);   

    window.addEventListener('keyup', e => {
        polySynth.triggerRelease(keyToPitch[e.key])
        let keysWhite = document.querySelector(keyToElement[e.key])
        keysWhite.style.background = "ivory"
        let keysBlack = document.querySelector(keyToElementBlack[e.key])
        keysBlack.style.background = "black"
    })

// -----------------MOUSE CLICK-----------------

    let keys = document.querySelectorAll("section")
    for(let k of keys){
        addEventListener("mousedown", e => {
            polySynth.triggerAttackRelease(elementToPitch)
        })
        addEventListener("mouseup", e => {
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
    Tone.Transport.start();
    
    let kickbutton = document.querySelector(".kick")
    kickbutton.addEventListener("click", e => {
        if(loop.state == "stopped"){
            loop.start(0);
        }else{
            loop.stop(0)
        }
    })
    
}

function snare(){

    var gain = new Tone.Gain(0.05)
    var dist = new Tone.Distortion(0.2)
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
        snare.triggerAttackRelease("G3", "8n");
    }, "2n").start(0);
    Tone.Transport.start();
    
    let kickbutton = document.querySelector(".snare")
    kickbutton.addEventListener("click", e => {
        if(loop.state == "stopped"){
            loop.start(0);
        }else{
            loop.stop(0)
        }
    })
    
}

// stopRepeat()
piano()
kick()
snare()

// let c = document.querySelector(".wrapper-white")
// c.addEventListener("click", function(){
//     if (Tone.context.state !== 'running') {
//         Tone.context.resume();
//       }
//     piano()
// })