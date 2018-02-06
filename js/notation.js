//stuff for notation
var vf;

function initVexflow() {
	vf = new Vex.Flow.Factory({
		renderer: {
			elementId: 'notation'
		}
	});
	var score = vf.EasyScore();
	var system = vf.System();

	system.addStave({
		voices: [score.voice(score.notes('C#5/q, B4, A4, G#4'))]
	}).addClef('treble');

	vf.draw();
}