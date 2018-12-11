const fs = require('fs');
const lineReader = require('readline');
var words = [];
var filtered = [];
var abc = ["a", "á", "b", "c", "d", "e", "é", "f", "g", "h", "i", "í", "j", "k", "l", "m", "n", "ñ", "o", "ó", "p", "q", "r", "s", "t", "u", "ú", "v", "w", "x", "y", "z"];

//Search params
p_wl = 3;
p_lt = ["s", "o", "l"];

var couldcontain = p_lt;
var notcontains = [];
abc.forEach((letter)=>{
    if(!couldcontain.includes(letter)) {
        notcontains.push(letter);
    }
});

const lr = lineReader.createInterface({
    input: require('fs').createReadStream('espanol.txt')
});
console.log(`Loading dictionary...`)
lr.on('line', function (line, lineCount, byteCount) {
    if(line!='-ENDLOAD-') {
        words.push(line);
        //console.log(line);
    } else {
        dictionaryCallback();
    }
});

function dictionaryCallback() {
    console.log(`Dictionary finished loading with a total of ${words.length} words`);
    console.warn(`This is just a test`);
    phase1(words);
}

function phase1(words) {
    words.forEach((word)=>{
        //Filters
        if(word.length==p_wl) {
            filtered.push(word);
        }
    });
    phase2(filtered);
}

function phase2(filtered) {
    let found = [];
    let out = [];
    console.log(couldcontain)
    console.log(notcontains)
    console.log(found + "end");
    filtered.forEach((elem)=>{
        notcontains.forEach((lt)=>{
            if(out.includes(elem)) return;
            if(elem.includes(lt)) {
                out.push(elem);
            }
        });
    });
    filtered.forEach((elem)=>{
        if(!out.includes(elem)) {
            found.push(elem);
        }
    });
    console.log(found)
}