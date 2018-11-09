/****************************************************************************\
    jquery-electron-statusbar
    Copyright (C) 2018  imburnis

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
\****************************************************************************/
//Status bar plugin for bootstrap

//Create an Immediately Invoked Function Expression to allow using the $ alias for jQuery while properly using the jQuery variable
//https://developer.mozilla.org/en-US/docs/Glossary/IIFE
(function ($){
    $.fn.statusbar = function(action, options){
        //If the action is an object, then this is just the create call with parameters
        if(typeof action === "object" || action == null || action == undefined){
            //Move the action variable to the options variable because this is the create
            options = action;
            action = "create";
        }

        //Make sure that the action variable is set to lowercase for comparison
        action = action.toLowerCase();

        //Check the action parameter to see what actions to perform
        switch(action){
            case "create":
                //If it is a create, then create all of the data for the status bar

                //Fully initialize a settings object with defaults in place of any not set parameters
                var settings = $.extend({
                    columns: 1,
                    alignment: ["LEFT"]
                }, options);

                //JQuery plugin default things (essentially iterate over all of the DOM elements within the jQuery object)
                this.each(function (index, element) {
                    //Create a jQuery reference to the element
                    var $elem = $(element);
                    //If the element has children, then log a warning because this plugin expects an empty container
                    if ($elem.children().length > 0) {
                        console.warn("When creating a status bar, the container should be empty");
                    } else {
                        //Create an element for every column that was requested
                        for (var i = 0; i < settings.columns; i++) {
                            //The HTML syntax for a column is a div with a paragraph element within it
                            var col = $("<div></div>");
                            col.addClass("jquery-statusbar-col");

                            //Create the paragraph element and add the status-bar-text class for styling
                            var p = $("<p></p>");
                            p.addClass("status-bar-text");

                            //Add the paragraph to the column
                            col.append(p);

                            //Figure out the alignment from the passed in values and add the right class to the column
                            if(settings.alignment[i] == "CENTER"){
                                col.addClass("jquery-statusbar-center");
                            }else if(settings.alignment[i] == "RIGHT"){
                                col.addClass("jquery-statusbar-right");
                            }else{
                                col.addClass("jquery-statusbar-left");
                            }

                            //Append the column to the status bar
                            $elem.append(col);
                        }

                        //Set a data attribute on the status bar that has the number of columns
                        // this is used for error checking later on
                        $elem.data("bsStatusBarColumns", settings.columns);
                        //Add the jquery-statusbar class so that the elements are properly styled
                        $elem.addClass("jquery-statusbar");
                    }
                });
            break;
            case "set":
                //When the action is set, options will have the column and the text
                //Initialize a data object with default parameters for anything not set
                var data = $.extend({
                    column: 1,
                    text: ""
                }, options);

                //JQuery plugin default things (essentially iterate over all of the DOM elements within the jQuery object)
                this.each(function (index, element){
                    //Create a jQuery reference to the element
                    var $elem = $(element);
                    //If this element has the class jquery-statusbar, then it has been initialized
                    if ($elem.hasClass("jquery-statusbar")){
                        //Retrieve the column count from the data attribute
                        var columnCount = $elem.data("bsStatusBarColumns");
                        //Perform error checking on the column to set vs the configured columns
                        if(data.column > columnCount || data.column < 1){
                            console.error("Attempted to set column " + data.column + " but the column count is " + columnCount);
                        }else{
                            //Get the right column from the status-bar and set the texts
                            $elem.find(":nth-child(" + data.column + ") p").text(data.text);
                        }
                    }
                });
            break;
        }

        //Jquery plugin design paradigm, this allows for chaining jquery methods
        return this;
    }
})(jQuery); //Call the function with the jQuery object to initialize the plugin