var metaRemarkable = require('../lib/meta-remarkable.js');
var remarkable = require('remarkable');
var tape = require('tape');

tape("meta-remarkable", function(t) {
    var mr = new metaRemarkable();
    var rm = new remarkable();
	var basicTestText = "---\nTitle:   My awesome markdown file\nAuthor:  Me\nScripts:\n    - js/doStuff.js\n    - js/doMoreStuff.js\n...\n\n##Header\nRegular text and stuff goes here. \n\n...\n\n---\n";
	var basicTestMD = "\n\n##Header\nRegular text and stuff goes here. \n\n...\n\n---\n";
	var basicResult = mr.render(basicTestText);

	t.ok(basicResult.meta, "result.meta exists");
	t.ok(basicResult.html, "result.html exists");

	t.equal(basicResult.html, rm.render(basicTestMD), "result.html matches the remarkable output");
	t.deepEqual(basicResult.meta, {
        "Title": "My awesome markdown file",
        "Author": "Me",
        "Scripts": [
            "js/doStuff.js",
            "js/doMoreStuff.js"
        ]
    }, "result.meta matches the yml output");

	var dashTestText = basicTestText.replace('...', '---');
	t.deepEqual(basicResult, mr.render(dashTestText), "works with dashes as yaml terminators too");

    mr = new metaRemarkable('full', {html: false});
    rm = new remarkable('full', {html: false});
    var optionsTestText = "<button>test</button>";
    t.equal(mr.render(optionsTestText).html, rm.render(optionsTestText), "passes arguments to remarkable");
	t.end();
});
