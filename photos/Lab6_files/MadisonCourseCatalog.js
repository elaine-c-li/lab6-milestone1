/// UW Madison JS for Canvas
/// Sub Theme Script for Course Guide Courses
// Add Grade Export Button for Faculty

/// Support for Faculty Center Grade Prep Tool
onPage(/\/gradebook/, function() {
	hasAnyRole("teacher","ta","admin","root_admin", function(isTeacher) {
        if (isTeacher == true)

        {var courseID = window.location.pathname.split('/')[2];
        $(".gradebook_menu").prepend('<a class="ui-button" href="/courses/' + courseID + '/external_tools/18676?display=borderless" target="_blank"><i class="icon-gradebook"></i> Faculty Center Grade Prep</a>');
    }
    });


});


/// onPage(/\/users/,function(){
///	onElementRendered('#peoplesearch_select_role', function(e) {

///		hasAnyRole("admin","root_admin", function(isAdmin) {

///			if (isAdmin == false)
///			{
///				$("#peoplesearch_select_role").children("option[value='4']").hide();
///				}
///			});
 ///	});
///});


/*
/// 12.19.17 Syllabus Addition
/// Add Button to Syllabus for AEFIS SYllabus Link

var syllabusTab;


if ( $("body.syllabus #course_syllabus").length > 0)
{
       var message = '<p>The <b>Official Syllabus</b> is a UW-Madison tool allowing instructors to enter official syllabus information for a course in a consistent format, as all syllabi must feature the same <a href="https://teachlearn.provost.wisc.edu/course-syllabi/" target="_blank" rel="noopener noreferrer">standard information</a>.</p><p>When first opened, the Official Syllabus template is pre-filled with data from the official course offering. Remaining information will need to be entered using the Edit button. To submit an official syllabus and make it visible to students, it must be published. See <a href="https://kb.wisc.edu/luwmad/page.php?id=78761" target="_blank" rel="noopener noreferrer">this document</a> for instructions on using the Official Syllabus.</p>';
       var htmlurl = '/courses/' + getCourseId() + '/external_tools/1327';
       var messagea = "<h2>Official Syllabus</h2><p><a class='icon-syllabus btn' href='" + htmlurl + "'>Official Syllabus</a></p>"

       hasAnyRole("teacher","ta","admin","root_admin", function(isAdmin){
			if (isAdmin == true)
			  {
				messagea = messagea + message;
				}
			});
       $(messagea).insertAfter("#edit_course_syllabus_form");
   }
*/




    function getCourseId() {
        var courseId = null;
        try {
            var courseRegex = new RegExp('/courses/([0-9]+)');
            var matches = courseRegex.exec(window.location.href);
            if (matches) {
                courseId = matches[1];
            } else {
                throw new Error('Unable to detect Course ID');
            }
        } catch (e) {
            errorHandler(e);
        }
        return courseId;
    }


/// Utility Functions
function onPage(regex, fn) {
    if (location.pathname.match(regex)) fn();
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

function onElementRendered(selector, cb, _attempts) {
    var el = $(selector);
    _attempts = ++_attempts || 1;
    if (el.length) return cb(el);
    if (_attempts == 60) return;
    setTimeout(function() {
        onElementRendered(selector, cb, _attempts);
    }, 250);
};