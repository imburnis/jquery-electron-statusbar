# JQuery Statusbar Plugin
This is a simple jquery plugin to help Electron application developers that are looking for a more "application" feel.

The plugin adds the statusbar function to the jquery object.

```js
$(...).statusbar(options);       // create
$(...).statusbar("set", options) //set
```

#### Create Options
| Option Name | Description |
| ----------- | ----------- |
| columns     | The number of columns the statusbar should have |
| alignment   | An array of the text alignment for each column (LEFT, CENTER, or RIGHT) |

#### Set Options
| Option Name | Description |
| ----------- | ----------- |
| column      | The column to set the content of one-indexed |
| text        | The text to set the column of the status bar to |

## Usage
Include jquery.statusbar.css in the head of your document and include jquery.statusbar.js after jquery in your document.

```js
$(document).ready(function(data){
    //Initialize the statusbar on the footer
    $(".footer").statusbar({
        columns: 4,
        alignment: ["LEFT", "CENTER", "CENTER", "RIGHT"]
    });

    //Set the column values
    $(".footer").statusbar("set", {
        column: 1,
        text: "Column 1"
    }).statusbar("set", {
        column: 2,
        text: "Column 2"
    }).statusbar("set", {
        column: 3,
        text: "Column 3"
    }).statusbar("set", {
        column: 4,
        text: "Column 4"
    });
});
```
![Example Status Bar](images/example.png?raw=true "Example status bar")