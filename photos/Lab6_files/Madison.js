/// UW Madison JSS for Canvas
/// Approved Modifications
/// 1. Remove Canvas Conferences (Big Blue Button)
/// 3. Add Link to KB on external tools. Designed to provide users additional information on external tools.
/// 5. H5P require script https://h5p.org/documentation/for-authors/h5p-for-canvas
/// 7. Add Utility function to load external scripts.


//H5P require script for Canvas
//requireMadison(["https://h5p.org/sites/all/modules/h5p/library/js/h5p-resizer.js"]);


//Add Reporting Function to the People Page (Users) 3.15.17
onPage(/\/users/, function(){
	hasAnyRole("teacher","ta","admin","root_admin", function(isAdmin){
			if (isAdmin == true)
			  {
				requireMadison(["https://grassblade.doit.wisc.edu/canvas-support/FileSaver.js"]);
				requireMadison(["https://grassblade.doit.wisc.edu/canvas-support/access-report-anonymous.user.js"]);
				requireMadison(["https://grassblade.doit.wisc.edu/canvas-support/access-report.user.js"]);
				}
	});
});

//Add Rubric Import tool to Rubrics
onPage(/\/rubrics/, function(){
	hasAnyRole("teacher","ta","admin","root_admin", function(isAdmin){
		if (isAdmin == true){
			requireMadison(["https://grassblade.doit.wisc.edu/canvas-support/import-rubric.user.js"]);
		}
	});
});



//Remove Big Blue Button Conference Tool
$(".conferences").hide();
$("#nav_edit_tab_id_12").hide();

//Remove native Syllabus tool from Navigation
$("a.syllabus").hide();
$("#nav_edit_tab_id_1").hide();

//Add warning message to native Syllabus tool
if ($("body.syllabus #course_syllabus").length > 0){
	var messageH = '<div style="background-color:yellow"><p><strong>The Syllabus tool is no longer supported at UW-Madison.</strong> The <a href="https://kb.wisc.edu/luwmad/page.php?id=91844" target="_blank">Course Summary</a> retains much of the functionality of the Syllabus, but was newly labelled to better align with its capabilities and to distinguish it from the course syllabus. If you had used the Syllabus as a course home page, consider <a href="https://kb.wisc.edu/page.php?id=91940" target="_blank">setting a new home page</a>.</p></div>';

	$(messageH).insertBefore(".user_content");
}



//Section to add KB link on application config page.
onPage(/\/settings/, function() {

    $('#tab-tools').bind("DOMSubtreeModified", function() {
        if ($("#UWAppConfig").length == 0 && $(".externalApps_buttons_container").length > 0)
            renderUWAppConfig();

    });
});


// Render App Button
function renderUWAppConfig() {
    onElementRendered('.externalApps_buttons_container', function(e) {
        $(".externalApps_buttons_container").prepend('<a id="UWAppConfig" href="https://kb.wisc.edu/page.php?id=65466" target="_blank" class="btn view_tools_link lm uwSettings"><img src="https://wiscmail.wisc.edu/login/img/favicon.ico" > UW Enabled Apps</a>');
    });
}


// This code was added by the UW-Moodle team to allow hidden blocks in any course webpage.
window.onload = function(e) {
    var divs = document.getElementsByClassName("madisonhiddenblock");
    for (var i = 0; i < divs.length; i++) {
        createShowHide(divs[i]);
    }
}

// This is the function that does the hidden block logic.
function createShowHide(div){
    var wrapper = document.createElement('div');
    div.parentNode.insertBefore(wrapper, div);
    var showText = "<strong>\u25B6 Show</strong>"
    var hideText = "<strong>\u25BC Hide</strong>"
    wrapper.innerHTML = showText;
    wrapper.className = "madison-show";
    wrapper.style.cursor = 'pointer';

    div.style.border = '1px solid black';
    div.style.padding = '5px';
    div.style.backgroundColor = '#EEEEEE';

   wrapper.onclick = function(){
        if (this.className.match(/(?:^|\s)madison-show(?!\S)/)){
            wrapper.className = "madison-hide";
            div.style.display = 'block';
            this.innerHTML = hideText;
        } else {
            div.style.display = 'none';
            wrapper.className = "madison-show";
            this.innerHTML = showText;
        }
    }

    div.style.display = 'none';
}


//### Utility Functions

function requireMadison(script) {
    $.ajax({
        url: script,
        dataType: "script",
        async: false,           // <-- This is the key, forces system to wait for script to load.
        success: function () {
            // all good...
        },
        error: function () {
            throw new Error("Could not load script " + script);
        }
    });
}


function onElementRendered(selector, cb, _attempts) {
    var el = $(selector);
    _attempts = ++_attempts || 1;
    if (el.length) return cb(el);
    if (_attempts == 60) return;
    setTimeout(function() {
        onElementRendered(selector, cb, _attempts);
    }, 250);
};


function onPage(regex, fn) {
    if (Boolean(location.pathname.match(regex))) fn();
}

function hasAnyRole( /*roles, cb*/ ) {
    var roles = [].slice.call(arguments, 0);
    var cb = roles.pop();
    for (var i = 0; i < arguments.length; i++) {
        if (ENV.current_user_roles.indexOf(arguments[i]) !== -1) {
            return cb(true);
        }
    }
    return cb(false);
}


function isUser(id, cb) {
    cb(ENV.current_user_id == id);
}