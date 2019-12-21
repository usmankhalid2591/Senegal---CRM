$(document).ready(function () {

    $('#mainNavbar').flexMenu();

    paceOptions = {
        document: true, // disabled
        eventLag: true,
        restartOnPushState: true,
        restartOnRequestAfter: true,
        ajax: {
            trackMethods: ['POST', 'GET']
        }
    };


    // Pace.on('restart', function () {
    //     $('#preloader').show();
    // });

    //Pace.on('done', function () {
    //     $('#preLoader').delay(500).fadeOut(800);
    // });

});


$(function () {


    var defaultLeft = 200;

    var setInvisible = function (elem) {
        elem.css('visibility', 'hidden');
    };
    var setVisible = function (elem) {
        elem.css('visibility', 'visible');
    };

    var elem = $("#elem");
    var items = elem.children();

    // Inserting Buttons
    elem.prepend('<div id="right-button" style="visibility: hidden;"><a href="javascript:void(0);"><i class="fal fa-angle-left"></i></a></div>');
    elem.append('  <div id="left-button"><a href="javascript:void(0);"><i class="fal fa-angle-right"></i></a></div>');

    // Inserting Inner
    items.wrapAll('<div id="inner" />');

    // Inserting Outer
    elem.find('#inner').wrap('<div id="outer"/>');

    var outer = $('#outer');


    var updateUI = function () {
        var maxWidth = outer.outerWidth(true);
        var actualWidth = 0;
        $.each($('#inner >'), function (i, item) {
            actualWidth += $(item).outerWidth(true);
        });

        if (actualWidth <= maxWidth) {
            setVisible($('#left-button'));
        }
    };
    updateUI();


    $('#right-button').click(function () {
        var leftPos = outer.scrollLeft();
        outer.animate({
            scrollLeft: leftPos - 200
        }, 800, function () {
            if ($('#outer').scrollLeft() <= 0) {
                setInvisible($('#right-button'));
            }
        });
    });

    $('#left-button').click(function () {
        setVisible($('#right-button'));
        var leftPos = outer.scrollLeft();
        outer.animate({
            scrollLeft: leftPos + 200
        }, 800);
    });

    $(window).resize(function () {
        updateUI();
    });


});


function validateFromRules(form) {

    var validationRules = {rules: {}, messages: {}};

    $("#" + form + "  :input").each(function () {
        var datatype = $(this).attr('data-type');

        if (datatype == "crmfield") {

            var input = $(this).attr('required');
            var message = $(this).attr('required-message');

            if (input == 'required') {
                var n = $(this).attr("name");
                validationRules.rules[n] = {'required': true};
                validationRules.messages[n] = {'required': message};
            }
        }
    });

    return validationRules;
}

function scrollToFirstError() {
    //console.log($('.error:visible:first').offset().top)
    $('#middleContainer').animate({scrollTop: $('.error:visible:first').offset().top}, 500);
}