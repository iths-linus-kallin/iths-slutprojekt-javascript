// function stopRepeat(){
//     window.addEventListener('keydown', e => { 
//         if (e.repeat) return; 
//     }, false)
// }

function piano(){
    
    var keyToPitch = { "a":"C3", "w":"C#3", "s":"D3", "e":"D#3", "d":"E3", "f":"F3", "t":"F#3", "g":"G3", "y":"G#3", "h":"A3", "u":"A#3", "j":"B3", "k":"C4" }

    var gain = new Tone.Gain(0.3)
    var freeverb = new Tone.Freeverb()
    freeverb.dampening.value = 2000;
    freeverb.roomSize.value = 0.87;

    var polySynth = new Tone.PolySynth(4, Tone.Synth)
    polySynth.set({
        oscillator: {
          type: 'triangle',
          modulationType: 'sine',
          modulationIndex: 7,
          harmonicity: 1
        },
        envelope: {
          attack: 0.001,
          decay: 0.4,
          sustain: 0.3,
          release: 0.1
        }
      })
    polySynth.chain(gain, freeverb, Tone.Master)

// ----------------KEYBOARD--------------------

    window.addEventListener('keydown', e => {
        polySynth.triggerAttack(keyToPitch[e.key])
    })
    window.addEventListener('keyup', e => {
        polySynth.triggerRelease(keyToPitch[e.key])
    })

// -----------------MOUSE CLICK-----------------

    // let keys = document.querySelectorAll("section")
    // keys.addEventListener("mousedown", e => {
    //         polySynth.triggerAttack(e.target.dataset.note)
    // })
    // keys.addEventListener("mouseup", e => {
    //         polySynth.triggerRelease()
    // })
}

// stopRepeat()
piano()

// let c = document.querySelector(".wrapper-white")
// c.addEventListener("click", function(){
//     if (Tone.context.state !== 'running') {
//         Tone.context.resume();
//       }
//     piano()
// })