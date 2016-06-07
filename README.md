## meta-remarkable
#### The [remarkable](https://github.com/jonschlinkert/remarkable) markdown processor for Node.js with support for [YAML](http://yaml.org/) metadata

[![Dependency Status](https://david-dm.org/bmathews/meta-remarkable.svg)](https://david-dm.org/bmathews/meta-remarkable)

The render function behaves exactly the same as [`remarkable`](https://github.com/jonschlinkert/remarkable#usage), except it instead returns an object with two properties: `meta`, which contains the metadata object or `null` if metadata isn't found, and `html`, which contains the parsed HTML.

In order to include metadata in a document, insert YAML at the top of the document surrounded by `---` and `...`. Note that if the given string doesn't start with `---`, it will not be interpreted as having metadata.

### Example

```md
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

```md
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

```json
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

```js
var metaRemarkable = require('meta-remarkable');
var md = new metaRemarkable();
var text = fs.readFileSync('myfile.md', 'utf8');
var res = md.render();
console.log(res.meta); // the parsed yaml->json
console.log(res.html); // the parsed md->html
```

All options are passed through to remarkable:

```js
var metaRemarkable = require('meta-remarkable');
var md = new metaRemarkable('full', {
    html: false,
    linkify: true
});
```

Use remarkable directly:

```js
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

###Install
With npm do:

```sh
npm install meta-remarkable
```

###Testing

```sh
npm test
```

---
###License

Licensed under [the MIT License](http://opensource.org/licenses/MIT).

Derived from [meta-marked](https://github.com/j201/meta-marked).
