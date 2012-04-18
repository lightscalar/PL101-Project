// maybe some helper functions
var convertPitch = function (expr) {
	noteString = expr[0];
	switch(noteString) {
		case 'c': 
			note = 0; break;
		case 'd': 
			note = 1; break;
		case 'e': 
			note = 2; break;
		case 'f': 
			note = 3; break;
		case 'g': 
			note = 4; break;
		case 'a': 
			note = 5; break;
		case 'b': 
			note = 6; break;
	}
	octave = parseFloat(expr[1]);
	console.log (expr);
	return (12 + 12*octave + note);
}


var accumulate = function (expr,endTime,notes) {
	if (expr.tag == 'note' || expr.tag == 'rest') {
			expr.start = endTime;
			expr.pitch = convertPitch(expr.pitch);
			endTime = endTime +	 expr.dur;
			notes.push(expr);
			return endTime;
	}
	if (expr.tag == 'seq') {
			endTime = accumulate(expr.left,endTime,notes);
			endTime = accumulate(expr.right,endTime,notes);
			return endTime;
	}
};

var compile = function (musexpr) {
		notes = [];
		accumulate(musexpr,0,notes);
		return notes;
};

var melody_mus = 
		{ tag: 'seq',
			left: 
			 { tag: 'seq',
				 left: { tag: 'note', pitch: 'a4', dur: 250 },
				 right: { tag: 'note', pitch: 'b4', dur: 250 } },
			right:
			 { tag: 'seq',
				 left: { tag: 'note', pitch: 'c4', dur: 500 },
				 right: { tag: 'note', pitch: 'd4', dur: 500 } } };

console.log(melody_mus);
console.log(compile(melody_mus));
console.log(convertPitch('c4'))