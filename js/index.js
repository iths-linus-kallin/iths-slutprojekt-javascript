function startAudio(){
    window.addEventListener('click', e =>{

    })
}

async function piano(){
    let result = await startAudio()
    console.log(result);
    
    var keyToPitch = { "z":"C3", "s":"C#3", "x":"D3", "d":"D#3", "c":"E3", "v":"F3", "g":"F#3", "b":"G3", "h":"G#3", "n":"A3", "j":"A#3", "m":"B3", ",":"C4" }

    var synth = new Tone.PolySynth(6, Tone.Synth, {
        "oscillator" : {
            "type": "sawtooth",
            "partials" : [0, 2, 3, 4],
            }
        }).toMaster();
    
    
     window.addEventListener('keydown', this.onkeydown)
     window.addEventListener('keyup', this.onkeyup)
    
    function onkeydown(e){
       synth.triggerAttack(keyToPitch[e.key], Tone.context.currentTime)
    }
    function onkeyup(e){
        synth.triggerRelease(keyToPitch[e.key])
    }
}

piano()