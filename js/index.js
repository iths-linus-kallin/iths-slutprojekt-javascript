function stopRepeat(){
    window.addEventListener('keydown', e => { 
        if (e.repeat) return; 
    }, false)
}

function piano(){
    
    var keyToPitch = { "a":"C3", "w":"C#3", "s":"D3", "e":"D#3", "d":"E3", "f":"F3", "t":"F#3", "g":"G3", "y":"G#3", "h":"A3", "u":"A#3", "j":"B3", "k":"C4" }
    var keyToElement = { "a":".c1", "w":".ciss1", "s":".d1", "e":".diss1", "d":".e1", "f":".f1", "t":".fiss1", "g":".g1", "y":".giss1", "h":".a1", "u":".aiss1", "j":".b1", "k":".c2" }
    var keyToElementBlack = { "w":".ciss1", "e":".diss1", "t":".fiss1", "y":".giss1", "u":".aiss1" }


    var gain = new Tone.Gain(0.1)
    var freeverb = new Tone.Freeverb()
    freeverb.dampening.value = 2000;
    freeverb.roomSize.value = 0.87;
    freeverb.wet.value = 0.5
    var filter = new Tone.Filter(1500, "lowpass", -12)
    var delay = new Tone.FeedbackDelay("8n", 0.3)

    var polySynth = new Tone.PolySynth(3, Tone.Synth)
    polySynth.set({
        oscillator: {
          type: 'square',
        },
        envelope: {
          attack: 0.001,
          decay: 1,
          sustain: 0.3,
          release: 3
        }
      })
    polySynth.chain(gain, filter, freeverb, delay, Tone.Master)

// ----------------KEYBOARD--------------------

    window.addEventListener('keydown', e => {
        polySynth.triggerAttack(keyToPitch[e.key])
        let keys = document.querySelector(keyToElement[e.key])
        keys.style.background = "rgb(184, 55, 32)"
    })
    window.addEventListener('keyup', e => {
        polySynth.triggerRelease(keyToPitch[e.key])
        let keysWhite = document.querySelector(keyToElement[e.key])
        keysWhite.style.background = "ivory"
        let keysBlack = document.querySelector(keyToElementBlack[e.key])
        keysBlack.style.background = "black"
    })

// -----------------MOUSE CLICK-----------------

    let keys = document.querySelectorAll("section")
    keys.addEventListener("mousedown", e => {
            polySynth.triggerAttack(e.target)
    })
    keys.addEventListener("mouseup", e => {
            polySynth.triggerRelease()
    })
}

stopRepeat()
piano()

// let c = document.querySelector(".wrapper-white")
// c.addEventListener("click", function(){
//     if (Tone.context.state !== 'running') {
//         Tone.context.resume();
//       }
//     piano()
// })