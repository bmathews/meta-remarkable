## meta-remarkable
#### The [remarkable](https://github.com/jonschlinkert/remarkable) markdown processor for Node.js with support for [YAML](http://yaml.org/) metadata

![dependencies](http://img.shields.io/david/bmathews/meta-remarkable.svg?style=flat-square)

meta-remarkable, forked from meta-marked, is a wrapper around remarkable. The constructor passes all arguments to the remarkable constructor.

The render function behaves exactly the same as [`remarkable`](https://github.com/jonschlinkert/remarkable#usage), except it instead returns an object with two properties: `meta`, which contains the metadata object or `null` if metadata isn't found, and `html`, which contains the parsed HTML.

You have access to the raw remarkable via the `remarkable` property.

In order to include metadata in a document, insert YAML at the top of the document surrounded by `---` and `...`. Note that if the given string doesn't start with `---`, it will not be interpreted as having metadata.

### Example

```
---
Title:   My awesome markdown file
Author:  Me
Scripts:
    - js/doStuff.js
    - js/doMoreStuff.js
...

##Header
Regular text and stuff goes here.
```
You can also use the approach below, which will result in a very nice data table at the top of your markdown when viewing the file GitHub:

```
---
Title:   My awesome markdown file
Author:  Me
Scripts:
    - js/doStuff.js
    - js/doMoreStuff.js
---

##Header
Regular text and stuff goes here.
```

Both of the above will result in the following output:

```
{
	"meta": {
		"Title": "My awesome markdown file",
		"Author": "Me",
		"Scripts": [
			"js/doStuff.js",
			"js/doMoreStuff.js"
		]
	},
	"html": "<h2>Header</h2>\n<p>Regular text and stuff goes here.</p>\n"
}
```

###Usage

Call `render` with the src text:
```
var metaRemarkable = require('meta-remarkable');
var md = new metaRemarkable();
var text = fs.readFileSync('myfile.md', 'utf8');
var res = md.render();
console.log(res.meta); // the parsed yaml->json
console.log(res.html); // the parsed md->html
```

All options are passed through to remarkable:

```
var metaRemarkable = require('meta-remarkable');
var md = new metaRemarkable('full', {
    html: false,
    linkify: true
});
```

Use remarkable directly:
```
var metaRemarkable = require('meta-remarkable');
var md = new metaRemarkable('full', {
    html: false,
    linkify: true
});
md.remarkable.set({
    html: true
});
md.remarkable.render('# some markdown'); // bypass meta-remarkable.
```

###Testing

```
npm test
```

---

Licensed under [the MIT License](http://opensource.org/licenses/MIT). © 2014 bmathews
