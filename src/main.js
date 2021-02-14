// How to minify...
// 1. Remove white space, Terser recommended
// 2. Replace " with `
// 3. Regpack, set exception for variable B
// 4. Replace " with Q (or any unused character)
// 5. Put it in <body onload="">

// body style
document.body.style = `background:#112;color:#fff;user-select:none;text-align:center`;

// audio context
C = new AudioContext;

// get piano key div
D = i => eval(`K` + i);

// instrument select
[...`∿🎻🎷🎹`].map((i, j) =>                               // instrument icons
  B.innerHTML += i +                                     // icon
  `<input type=radio name=I checked onclick=I=${     // radio input
  3 - j}> `);                                            // instrument select

// piano keys
for (I = i = 0; i < 36; A = []) // 3 x 12 keys, init instrument and sounds array
  B.innerHTML +=
    `${i % 12 ? `` : `<br>`                                       // new row
    }<div id=K${                                                // create key
    k = 24 + i % 12 - (i / 12 | 0) * 12                             // reorder keys
    } style=display:inline-block;margin:2px;background:${       // key style
    `02579`.indexOf(i++ % 12 - 1) < 0 ?                           // b or w
      `#fff;color:#000;width:60px;height:180px` :                 // white
      `#000;position:absolute;margin-left:-17px;width:33px;height:99px` // black
    } onmouseover=event.buttons&&P(${k                         // mouse over
    }) onmousedown=P(${k                                       // mouse down
    }) onmouseup=X(${k                                         // mouse up
    }) onmouseout=X(${k                                        // mouse out
    })>`,                                                       // end key div

    // sound

    // play note
    P = i => i < 0 || A[i] || // is valid and note not playing
      (
        A[i] = [         // instruments
          [...`1248`], // 🎹 organ
          [...`3579`], // 🎷 brass
          [...`321`],  // 🎻 strings
          [...`3`],    // ∿ sine
        ][I].map(j => (
          o = C.createOscillator(               // create oscillator
            D(i).style.transition =
            D(i).innerHTML),              // reset transition
          o.connect(                            // oscillator to gain
            o.g = C.createGain(               // create gain node
              o.frequency.value =           // set frequency
              j * 55 * 2 ** ((i + 3) / 12)))  // A 55 root note
            .connect(C.destination),              // gain to destination
          o.g.gain.value = .2 / (1 + Math.log2(j)), // set gain
          o.start(),                            // start audio
          o)                                    // return sound
        ),
        D(i).b = D(i).style.background, // save original color
        D(i).style.background = `#f00`  // set key color red
      );

// cancel note
X = i => A[i] &&                                 // is already playing?
  A[i].map(o =>                                // for each oscilator
    setTimeout(i => o.stop(), 350,            // stop sound after delay
      o.g.gain.linearRampToValueAtTime(   // set gain start ramp
        o.g.gain.value, C.currentTime), // set gain
      o.g.gain.linearRampToValueAtTime(   // ramp off gain
        A[i] = 0, C.currentTime + .3),  // clear note
      D(i).style.transition = `.5s`,      // set transition
      D(i).style.background = D(i).b));   // reset original color

// stop all sounds if focus lost
onblur = i => A.map((e, i) => X(i));

// keyboard controls
// keyboard to piano key mapping
K = `zsxdcvgbhnjm,l.;/q2w3er5t6y7ui9o0p[=]`;

// play note on key down
onkeydown = i => P(
  K.indexOf(i.key.toLowerCase())                  // map key to note
  - 5 * (K.indexOf(i.key.toLowerCase()) > 16) // overlap 2nd row of keys
);

// release note on key up
onkeyup = i => X(
  K.indexOf(i.key.toLowerCase())                  // map key to note
  - 5 * (K.indexOf(i.key.toLowerCase()) > 16) // overlap 2nd row of keys
);
