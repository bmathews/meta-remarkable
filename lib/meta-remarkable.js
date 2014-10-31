var Remarkable = require('remarkable');
var yaml = require('js-yaml');

// Splits the given string into a meta section and a markdown section if a meta section is present, else returns null
function splitInput(str) {
	if (str.slice(0, 3) !== '---') return;

	var matcher = /\n(\.{3}|-{3})/g;
	var metaEnd = matcher.exec(str);

	return metaEnd && [str.slice(0, metaEnd.index), str.slice(matcher.lastIndex)];
}

var metaRemarkable = function () {
	// wrap to pass arguments.
	function F(args) { return Remarkable.apply(this, args); }
    F.prototype = Remarkable.prototype;

	// expose remarkable
	this.remarkable = new F(arguments);
};

// custom render function that parses yaml and passes through to remarkable
metaRemarkable.prototype.render = function (src) {
	var mySplitInput = splitInput(src);

	return mySplitInput ?  {
			meta : yaml.safeLoad(mySplitInput[0]),
			html : this.remarkable.render(mySplitInput[1])
		} : {
			meta : null,
			html : this.remarkable.render(src)
		};
};

module.exports = metaRemarkable;
