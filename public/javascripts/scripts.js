$(document).ready(function () {

    "use strict";

    // Nav Sticky

    $(window).scroll(function () {
        if (window.scrollY > 500 && !$('.mobile-toggle').is(":visible")) {
            $('.top-bar').addClass('nav-sticky');
        } else {
            $('.top-bar').removeClass('nav-sticky');
        }
    });

    // Offscreen Nav

    $('.offscreen-toggle').click(function () {
        $('.main-container').toggleClass('reveal-nav');
        $('.offscreen-container').toggleClass('reveal-nav');
        $('.offscreen-menu .container').toggleClass('reveal-nav');
    });

    $('.main-container').click(function () {
        if ($(this).hasClass('reveal-nav')) {
            $('.main-container').toggleClass('reveal-nav');
            $('.offscreen-container').toggleClass('reveal-nav');
            $('.offscreen-menu .container').toggleClass('reveal-nav');
        }
    });

    // Detect logo dimensions and add correct class

    var logoImage = $('.top-bar .logo:first-of-type');

    var theImage = new Image();
    theImage.src = logoImage.attr("src");

    var logoWidth = theImage.width;
    var logoHeight = theImage.height;
    var logoRatio = logoWidth / logoHeight;

    if (logoRatio > 2.8) {
        $('.top-bar .logo').addClass('logo-wide');
    }

    if (logoRatio < 2) {
        $('.top-bar .logo').addClass('logo-square');
    }

    // Smooth scroll

    $('.inner-link').smoothScroll({ offset: -96, speed: 800 });

    // Mobile Toggle

    $('.mobile-toggle').click(function () {
        $('nav').toggleClass('open-nav');
    });

    // Fullscreen nav toggle

    $('.fullscreen-nav-toggle').click(function () {
        if (!$('.fullscreen-nav-container').hasClass('show-fullscreen-nav')) {
            $('.fullscreen-nav-container').addClass('show-fullscreen-nav');
            setTimeout(function () {
                $('.fullscreen-nav-container').addClass('fade-fullscreen-nav');
            }, 100);
            $(this).addClass('toggle-icon');
        } else {
            $(this).removeClass('toggle-icon');
            $('.fullscreen-nav-container').removeClass('fade-fullscreen-nav');
            setTimeout(function () {

                $('.fullscreen-nav-container').removeClass('show-fullscreen-nav');
            }, 500);
        }
    });

    $('.fullscreen-nav-container .menu li a').click(function () {
        $('.fullscreen-nav-toggle').removeClass('toggle-icon');
        $('.fullscreen-nav-container').removeClass('fade-fullscreen-nav');
        setTimeout(function () {
            $('.fullscreen-nav-container').removeClass('show-fullscreen-nav');
        }, 500);
    });

    // Margin first section for top bar

    if (!$('nav').hasClass('overlay-bar') && !$('nav').hasClass('contained-bar')) {
        $('.main-container').first().css('margin-top', $('nav').outerHeight());
    }

    $(window).resize(function () {
        if (!$('nav').hasClass('overlay-bar') && !$('nav').hasClass('contained-bar')) {
            $('.main-container').first().css('margin-top', $('nav').outerHeight());
        }
    });

    // Pad first section for overlay bar

    if ($('nav').hasClass('overlay-bar') || $('nav').hasClass('contained-bar')) {
        var currentPad = parseInt($('.main-container').find(':first-child').css('padding-top'));
        var newPad = currentPad + $('nav').outerHeight() - 48;
        if (currentPad > 0) {
            $('.main-container').children(':first').css('padding-top', newPad);
        } else if ($('.main-container').find(':first').hasClass('hero-slider')) {
            var height = parseInt($('.hero-slider .slides li:first-child').outerHeight());
            var newHeight = height + $('nav').outerHeight();
            $('.hero-slider .slides li').css('height', newHeight);
        }
    }


    // Fullwidth Subnavs

    // Position Fullwidth Subnavs fullwidth correctly

    $('.subnav-fullwidth').each(function () {
        $(this).css('width', $('.container').width());
        var offset = $(this).closest('.has-dropdown').offset();
        offset = offset.left;
        var containerOffset = $(window).width() - $('.container').outerWidth();
        containerOffset = containerOffset / 2;
        offset = offset - containerOffset - 15;
        $(this).css('left', -offset);
    });

    $(window).resize(function () {
        $('.subnav-fullwidth').each(function () {
            $(this).css('width', $('.container').width());
            var offset = $(this).closest('.has-dropdown').offset();
            offset = offset.left;
            var containerOffset = $(window).width() - $('.container').outerWidth();
            containerOffset = containerOffset / 2;
            offset = offset - containerOffset - 15;
            $(this).css('left', -offset);
        });
    });


    // Scroll Reveal

    if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
        window.scrollReveal = new scrollReveal();
    } else {
        $('body').addClass('pointer');
    }

    // Slider Initializations

    $('.hero-slider').flexslider({});
    $('.image-slider').flexslider({ animation: "slide" });
    $('.testimonials-slider').flexslider({ directionNav: false });

    // Slide Sizes

    $('.slider-fullscreen .slides li').each(function () {
        $(this).css('height', $(window).height());
    });

    $('.fullscreen-element').each(function () {
        $(this).css('height', $(window).height());
    });


    // Feature Selector

    $('.selector-tabs li').click(function () {
        $(this).parent('.selector-tabs').children('li').removeClass('active');
        $(this).addClass('active');

        var activeTab = $(this).index() + 1;

        $(this).closest('.feature-selector').find('.selector-content').children('li').removeClass('active');
        $(this).closest('.feature-selector').find('.selector-content').children('li:nth-child(' + activeTab + ')').addClass('active');
    });

    // Append .background-image-holder <img>'s as CSS backgrounds

    $('.background-image-holder').each(function () {
        var imgSrc = $(this).children('img').attr('src');
        $(this).css('background', 'url("' + imgSrc + '")');
        $(this).children('img').hide();
        $(this).css('background-position', '50% 0%');
    });

    // Accordion

    $('.accordion li').click(function () {
        $(this).parent('.accordion').children('li').removeClass('active');
        $(this).addClass('active');
    });

    /************** Parallax Scripts **************/

    var isFirefox = typeof InstallTrigger !== 'undefined';
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    var isChrome = !!window.chrome;
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    var prefix;

    if (isFirefox) {
        prefix = '-moz-';
    } else if (isIE) {

    } else if (isChrome || isSafari) {
        prefix = '-webkit-';
    }

    $('.main-container section:first-child').addClass('first-child');

    $('.parallax-background').each(function () {

        if ($(this).closest('section').hasClass('first-child') && !$(this).closest('section').hasClass('slider-fullscreen')) {
            $(this).attr('data-top', prefix + 'transform: translate3d(0px,0px, 0px)');
            $(this).attr('data-top-bottom', prefix + 'transform: translate3d(0px,200px, 0px)');

        } else {

            $(this).attr('data-bottom-top', prefix + 'transform: translate3d(0px,-100px, 0px)');
            $(this).attr('data-center', prefix + 'transform: translate3d(0px,0px, 0px)');
            $(this).attr('data-top-bottom', prefix + 'transform: translate3d(0px,100px, 0px)');

        }

    });

    if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
        skrollr.init({
            forceHeight: false
        });
    }

    // Map Holder Overlay

    $('.map-holder').click(function () {
        $(this).addClass('on');
    });

    $(window).scroll(function () {
        if ($('.map-holder').hasClass('on')) {
            $('.map-holder').removeClass('on');
        }
    });

    // Map Details Holder

    $('.details-holder').each(function () {
        $(this).css('height', $(this).width());
    });

    $('.details-holder').mouseenter(function () {
        $(this).closest('.map-overlay').addClass('fade-overlay');
    }).mouseleave(function () { $(this).closest('.map-overlay').removeClass('fade-overlay'); });

    // Countdown

    $('.countdown').each(function () {
        $(this).countdown({ until: new Date($(this).attr('data-date')) });
    });

    // Twitter Feed

    if ($('#tweets').length) {
        twitterFetcher.fetch($('#tweets').attr('data-widget-id'), '', 5, true, true, true, '', false, handleTweets);

    }

    // Contact form
    $('form.email-form').submit(function (e) {
        // return false so form submits through jQuery rather than reloading page.
        if (e.preventDefault) e.preventDefault(); else e.returnValue = false;

        console.log('We have a submission...');
        var thisForm = $(this).closest('.email-form'),
			error = 0,
			originalError = thisForm.attr('original-error');

        if (typeof originalError !== typeof undefined && originalError !== false) {
            thisForm.find('.form-error').text(originalError);
        }


        $(thisForm).find('.validate-required').each(function () {
            if ($(this).val() === '') {
                $(this).addClass('field-error');
                error = 1;
            }
            else {
                $(this).removeClass('field-error');
            }
        });

        $(thisForm).find('.validate-email').each(function () {
            if (!(/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()))) {
                $(this).addClass('field-error');
                error = 1;
            }
            else {
                $(this).removeClass('field-error');
            }
        });


        if (error === 1) {
            $(this).closest('.email-form').find('.form-error').fadeIn(200);
        }
        else {
            jQuery.ajax({
                type: "POST",
                url: "/contact",
                data: {name: $('.email-form').find('.form-name').val(), email: $('.email-form').find('.form-email').val(), message: $('.email-form').find('.form-message').val()},
                success: function (response) {
                    console.log(response);
                    // Swiftmailer always sends back a number representing numner of emails sent.
                    // If this is numeric (not Swift Mailer error text) AND greater than 0 then show success message.
                    if ($.isNumeric(response)) {
                        if (parseInt(response) > 0) {
                            thisForm.find('.form-success').fadeIn(1000);
                            thisForm.find('.form-error').fadeOut(1000);
                            setTimeout(function () { thisForm.find('.form-success').fadeOut(500); }, 5000);
                        }
                    }
                    
                    // If error text was returned, put the text in the .form-error div and show it.
                    else {
                        // Keep the current error text in a data attribute on the form
                        thisForm.find('.form-error').attr('original-error', thisForm.find('.form-error').text());
                        // Show the error with the returned error text.
                        thisForm.find('.form-error').text("Oops...algo deu errado").fadeIn(1000);
                        thisForm.find('.form-success').fadeOut(1000);
                    }
                    $.ajax({
                        type: "POST",
                        url: 'https://googleapps.insight.ly/WebToContact/Create',
                        data: $('.email-form').serialize()
                    }).success(function (data) {
                    });
                }
            });
        }
        return false;
    });


});

$(window).load(function () {

    "use strict";

    // Align Elements Vertically

    alignVertical();
    alignBottom();

    $(window).resize(function () {
        alignVertical();
        alignBottom();
    });

    // Isotope Projects

    $('.blog-masonry-container').isotope({
        itemSelector: '.blog-masonry-item',
        layoutMode: 'masonry'
    });

    $('.filters li').click(function () {
        var current = $(this);

        current.siblings('li').removeClass('active');
        current.addClass('active');

        var filterValue = current.attr('data-filter');
        var container = current.closest('.projects-wrapper').find('.blog-masonry-container');
        container.isotope({ filter: filterValue });
    });

    // Isotope contained feature boxes

    $('.contained-features-wrapper').isotope({
        itemSelector: '.no-pad',
        layoutMode: 'masonry',
        masonry: {
            gutter: 0
        }
    });

    // Instagram Feed

    if ($('.instafeed').length) {
        jQuery.fn.spectragram.accessData = {
            accessToken: '1406933036.fedaafa.feec3d50f5194ce5b705a1f11a107e0b',
            clientID: 'fedaafacf224447e8aef74872d3820a1'
        };

        $('.instafeed').each(function () {
            $(this).children('ul').spectragram('getUserFeed', {
                query: $(this).attr('data-user-name')
            });

        });

    }

    if ($('#tweets').length) {
        $('#tweets').flexslider({ directionNav: false, controlNav: false });
    }

    // Remove Loader

    $('.loader').css('opacity', 0);
    setTimeout(function () { $('.loader').hide(); }, 600);

    // Mails signup
    $('form.mail-list-signup').on('submit', function () {

        var thisForm = $(this).closest('.mail-list-signup'),
		userEmail = $(this).find('.signup-email-field').val(),
        form = $(this).serialize();

        $(thisForm).find('.validate-email').each(function () {
            if (!(/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()))) {
                $(this).addClass('field-error');
            }
            else {
                $(this).removeClass('field-error');

                $.ajax({
                    type: "POST",
                    url: "/signupEmail",
                    data: {email: userEmail}
                }).done(function (data) {
                    if (data == "OK") {
                        $(thisForm).find('.btn-filled').addClass('disabled');
                        $(thisForm).find('.enviar-confirm').delay(300).slideDown();
                        $.ajax({
                            type: "POST",
                            url: 'https://googleapps.insight.ly/WebToContact/Create',
                            data: $('.mail-list-signup').serialize()
                        }).success(function (data) {
                        });
                    } else {
                        $(thisForm).find('.btn-filled').addClass('disabled');
                        $(thisForm).find('.enviar-error').delay(300).slideDown();
                    }
                });
            }
        });

        return false;
    });

    // Blog Masonry

    /*

    $('.blog-masonry-container').isotope({
        itemSelector: '.blog-masonry-item',
        layoutMode: 'masonry'
    });

    $('.blog-filters li').click(function () {
        var current = $(this);

        current.siblings('li').removeClass('active');
        current.addClass('active');

        var filterValue = current.attr('data-filter');
        var container = current.closest('.blog-masonry').find('.blog-masonry-container');
        container.isotope({ filter: filterValue });
    });

    */



});

function handleTweets(tweets){
          var x = tweets.length;
          var n = 0;
          var element = document.getElementById('tweets');
          var html = '<ul class="slides">';
          while(n < x) {
            html += '<li>' + tweets[n] + '</li>';
            n++;
          }
          html += '</ul>';
          element.innerHTML = html;
    }

function alignVertical(){

		$('.align-vertical').each(function(){
			var that = $(this);
			var height = that.height();
			var parentHeight = that.parent().height();
			var padAmount = (parentHeight / 2) - (height/2);
			that.css('padding-top', padAmount);
		});
	
}

function alignBottom(){
	$('.align-bottom').each(function(){
		var that = $(this);
		var height = that.height();
		var parentHeight = that.parent().height();
		var padAmount = (parentHeight) - (height) - 32;
		that.css('padding-top', padAmount);
	});
}


// Custom Calc

function getMoney( str )
{
        return parseInt( str.replace(/[\D]+/g,'') );
}
function formatReal( int )
{
        var tmp = int+'';
        tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
        if( tmp.length > 6 )
                tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
 
        return tmp;
}
function calcFinal () {
    if($('.desconto-code').text() == ""){
        $('.total-final').text(formatReal( getMoney($('.calc-total span').text())));
    }else {
        $('.total-final').text(formatReal( getMoney($('.calc-total span').text()) - getMoney($('.desconto-code').text())));
        if(parseInt($('.total-final').text().replace('.', '')) < 0){
            $('.total-final').text(formatReal("000"));
        }
    }
    
}

/* TIPO DE SITE */
$('.calc-buttons a').on('click', function () {
    var thisbutton = $(this);
    var count = 0;
    $('.calc-placeholder').parent().remove();

    if ($(thisbutton).hasClass('active')) {
        $(thisbutton).removeClass('active');
        $('#' + $(thisbutton).attr('data-slug')).remove();
        $('.calc-site-description').slideUp(200);
    } else {
        $(thisbutton).addClass('active');
        $('.t-body').append("<tr class='tipo-de-site' id='" + $(thisbutton).attr('data-slug') + "'><td id='" + $(thisbutton).attr('data-id') + "'>" + $(thisbutton).attr('title') + "</td><td><input onkeypress='return event.charCode >= 48 && event.charCode <= 57' type='text' class='calc-item-number' value='1' /></td><td class='calc-price'>" + formatReal($(thisbutton).attr("data-price")) + "</td></tr>");
        $('.calc-site-description').slideUp(200, function () {
            $(this).html($(thisbutton).attr('data-description')).slideDown(200);
        });
    }

    $('.t-body').children('tr').each(function () {
        count += getMoney($(this).find('.calc-price').text());
    });

    $('.calc-total span').text(formatReal(count));
    $('.calc-head span').text(formatReal(count));
    calcFinal();


});

/* HOSPEDAGEM */
$('.hospedagem a').on('click', function () {
    var thisbutton = $(this);
    var count = 0;
    $('.calc-placeholder').parent().remove();

    if ($(thisbutton).hasClass('active')) {
        $(thisbutton).removeClass('active');
        $('#' + $(thisbutton).attr('data-slug')).remove();
        $('.hospedagem-site-description').slideUp(200);
    } else {
        if ($('.hospedagem').find('.active') != false) {
            $('.hospedagem a').removeClass('active');
            $('.tipo-hospedagem').remove();
            $('.hospedagem-site-description').slideUp(200);
        }
        $(thisbutton).addClass('active');
        $('.t-body').append("<tr class='tipo-hospedagem' id='" + $(thisbutton).attr('data-slug') + "'><td id='" + $(thisbutton).attr('data-id') + "'>" + $(thisbutton).attr('title') + "</td><td><input onkeypress='return event.charCode >= 48 && event.charCode <= 57' type='hidden' class='calc-item-number' value='1' /></td><td class='calc-price'>" + formatReal($(thisbutton).attr("data-price")) + "</td></tr>");
        $('.hospedagem-site-description').slideUp(200, function () {
            $(this).html($(thisbutton).attr('data-description')).slideDown(200);
        });
    }

    $('.t-body').children('tr').each(function () {
        count += getMoney($(this).find('.calc-price').text());
    });

    $('.calc-total span').text(formatReal(count));
    $('.calc-head span').text(formatReal(count));
    calcFinal();
});

/* SERVIÇOS E MAIS OPÇÕES */
$('.btn-group-vertical a').on('click', function () {
    var thisbutton = $(this);
    var count = 0;
    $('.calc-placeholder').parent().remove();

    if ($(thisbutton).next('span').hasClass('vert-active')) {
        $('#' + $(thisbutton).attr('data-slug')).remove();
        $(thisbutton).removeClass('vert-selected');
        $(thisbutton).next('span').removeClass('vert-active');
    } else {
        $(thisbutton).addClass('vert-selected');
        $(thisbutton).next('span').addClass('vert-active');
        $('.t-body').append("<tr class='tipo-de-site' id='" + $(thisbutton).attr('data-slug') + "'><td id='" + $(thisbutton).attr('data-id') + "'>" + $(thisbutton).attr('title') + "</td><td><input onkeypress='return event.charCode >= 48 && event.charCode <= 57' type='text' class='calc-item-number' value='1' /></td><td class='calc-price'>" + formatReal($(thisbutton).attr("data-price")) + "</td></tr>");
    }

    $('.t-body').children('tr').each(function () {
        count += getMoney($(this).find('.calc-price').text());
    });

    $('.calc-total span').text(formatReal(count));
    $('.calc-head span').text(formatReal(count));
    calcFinal();

});

/* TREINAMENTO */
$('.hora a').on('click', function () {
    var thisbutton = $(this);
    var count = 0;
    $('.calc-placeholder').parent().remove();

    if ($(thisbutton).hasClass('active')) {
        $(thisbutton).removeClass('active');
        $('#' + $(thisbutton).attr('data-slug')).remove();
        $('.hospedagem-site-description').slideUp(200);
    } else {
        if ($('.hora').find('.active') != false) {
            $('.hora a').removeClass('active');
            $('.tipo-hora').remove();
        }
        $(thisbutton).addClass('active');
        $('.t-body').append("<tr class='tipo-hora' id='" + $(thisbutton).attr('data-slug') + "'><td id='" + $(thisbutton).attr('data-id') + "'>" + $(thisbutton).attr('title') + "</td><td><input onkeypress='return event.charCode >= 48 && event.charCode <= 57' type='hidden' class='calc-item-number' value='1' /></td><td class='calc-price'>" + formatReal($(thisbutton).attr("data-price")) + "</td></tr>");
    }

    $('.t-body').children('tr').each(function () {
        count += getMoney($(this).find('.calc-price').text());
    });

    $('.calc-total span').text(formatReal(count));
    $('.calc-head span').text(formatReal(count));
    calcFinal();
});

/* QUANTIDADE CALC */
$(document).on('keyup', '.calc-item-number', function (event) {
    var count = 0;
    var dataprice = $('[data-id=' + $(this).parent("td").parent('tr').find('td:first-child').attr("id") + ']').attr('data-price');

    $(this).parent('td').siblings('.calc-price').text(formatReal(dataprice * $(this).val()));

    $('.t-body').children('tr').each(function () {
        count += getMoney($(this).find('.calc-price').text());
    });

    $('.calc-total span').text(formatReal(count));
    $('.calc-head span').text(formatReal(count));
    calcFinal();
});

/* ENVIAR ORÇAMENTO */
$('.enviar-orcamento').on('click', function () {
    var thisone = $(this);
    var str = [];
    var cupon;

    if ($('.desconto-code').attr('id') == undefined) {
        cupon = "none";
    } else {
        cupon = $('.desconto-code').attr('id');
    }

    $.each($('.t-body td:first-child'), function (index, item) {
        str.push({ item: $(item).attr('id'), number: $(item).parent('tr').find('input').val() });
    });

    if ($('.t-body').find('.calc-price').html() == undefined) {
        $('.enviar-itens').delay(300).slideDown().delay(3000).slideUp();
    } else if ($('.contato-nome').val() === "" || $('.contato-email').val() === "") {
        $('.enviar-complete').delay(300).slideDown().delay(3000).slideUp();
    } else if ($('.form-terms').is(':checked') != true) {
        $('.enviar-terms').delay(300).slideDown().delay(3000).slideUp();
    } else {
        $.ajax({
            type: "POST",
            url: "/orcamento",
            data: { str: str, nome: $('.contato-nome').val(), email: $('.contato-email').val(), cupon: cupon }
        }).done(function (data) {
            if (data == "OK") {
                $(thisone).addClass('disabled');
                $('.enviar-confirm').delay(300).slideDown();

                $.ajax({
                    type: "POST",
                    url: 'https://googleapps.insight.ly/WebToContact/Create',
                    data: $('.insight').serialize()
                }).success(function (data) {
                });
            } else {
                $(thisone).addClass('disabled');
                $('.enviar-error').delay(300).slideDown();
            }
        });
    }
});

/* CUPONS */
$('#cupom').submit(function () {
    var thisone = $('#cupom').parent('th').parent('tr');
    var dados = $(this).serialize();
    var cupon = $('.cupon-field').val();

    $.ajax({
        type: 'GET',
        url: '/cupons',
        data: dados
    }).done(function (data) {
        thisone.animate({ opacity: 0 }, 200, function () {
            thisone.html('<th colspan="2" class="desconto">Desconto: </th><th class="desconto desconto-code" id="'+ cupon +'">- R$ ' + formatReal(data) + '</th>').animate({ opacity: 1 }, 200);
            calcFinal();
        });
    });

    return false;
});


/* DELETAR ORCAMENTO */
$('#deletarOrcamento').submit(function () {
    var id = {id: $(this).find('input').attr('data-idorc') }
    
    $.ajax({
        type: 'POST',
        url: '/deleteOrcamento',
        data: id
    }).done(function (data) {
        if (data == "OK") {
            window.location.replace("http://www.bonsaits.com/painel");
        } else {
            $('.deleteError').show();
        }
    });

    return false;
});

/* TROCAR STATUS */
$('#selectStatus').on('change', function () {
    var status = {status: $(this).find('option:selected').text(), id: $('#deletarOrcamento').find('input').attr('data-idorc')}
    
    $.ajax({
        type: 'POST',
        url: '/changeStatus',
        data: status
    }).done(function (data) {
        if (data == "OK") {
            $('.changeStatusOk').fadeIn().delay(500).fadeOut();
        } else {
            $('.changeStatusNotOk').fadeIn().delay(500).fadeOut();
        }
    });
});


$(document).on('change', '.calc-total span', function () {
    alert('bla')
    if(getMoney($('.desconto-code').text()) > 0){
        $('.desconto-code').text(formatReal(getMoney($('.calc-total').text()) - getMoney($('.total-final').text()) ));
    }
});


$(document).ready(function () {
    var analysisPrice = 0;

    $('.t-analysis').children('tr').each(function () {

        $(this).find('.calc-price-analysis').text(formatReal($(this).find('.calc-price-analysis').text() * $(this).find('.price-analysis').text()));
        analysisPrice += getMoney($(this).find('.calc-price-analysis').text());
    })

    $('.analysis-price').text(formatReal(analysisPrice));
});

$('.deletarArtigo').on('click', function () {
    var id = $(this).attr('data-id');

    var confirma = confirm("Quer mesmo deletar?");

    if(confirma == true){
        $.ajax({
            url: "/deletarArtigo",
            type: "POST",
            data: {id: id}
        }).done(function(done){
            if(done == "OK"){
                window.location.replace("http://www.bonsaits.com/painel");
            }
        });
    }
});