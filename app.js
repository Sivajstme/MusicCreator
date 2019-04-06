window.addEventListener('load' , ()=>{

    const sounds = document.querySelectorAll('.sounds');
    const pads = document.querySelectorAll('.pads div');
    const visual = document.querySelector('.visual');
    const btnHand =document.querySelector('.hand');
    const colors = ['#60d394','#d36060','#c060d3','#d3d160','#6860d3','#60d2d3']

    pads.forEach((e,i) => {

        e.addEventListener('click',function (){
            sounds[i].play();
            btnHand.style.visibility = 'hidden';
            createBubble(i);
        })
    });

    const createBubble = (index) => {

        const bubble  = document.createElement('div');
        visual.appendChild(bubble);
        bubble.style.backgroundColor = colors[index];
        bubble.style.animation = 'jump 1s ease';
        bubble.addEventListener('animationend' , () =>{
            bubble.parentElement.removeChild(bubble);
        })
    }

    let recorder, gumStream;
    const recordButton = document.getElementById("recordButton");
    recordButton.addEventListener("click", toggleRecording);

    function toggleRecording() {
        if (recordButton.innerHTML === 'Record') {
                recordButton.innerHTML = 'Stop'
            }else{
                recordButton.innerHTML = 'Record';
            }
        if (recorder && recorder.state == "recording") {
            recorder.stop();
            gumStream.getAudioTracks()[0].stop();
        } else {
            navigator.mediaDevices.getUserMedia({
                audio: true
            }).then(function (stream) {
                gumStream = stream;
                recorder = new MediaRecorder(stream);
                recorder.ondataavailable = function (e) {
                    var url = URL.createObjectURL(e.data);
                    var preview = document.createElement('audio');
                    document.querySelector('.btn-record').appendChild(preview);
                    preview.classList.add('dwnload');
                    preview.controls = true;
                    preview.src = url;
                   //document.body.appendChild(preview);
                };
                recorder.start();
            });
        }
    }
});