$(function() {

  var $body = $('body');
  var $header = $('.header');

  $(document).on('mouseover touchstart', '.student', function(e) {
    e.preventDefault();
    $(this).siblings().removeClass('is-active');
    $(this).addClass('is-active');
  });

  // reviews
  $(document).on('click', '.js-list-show', function() {
    $(this).parent().find('article.hidden').fadeIn(300);
    $(this).hide();
  });

  $(document).on('click', '.js-show', function(e){
    e.preventDefault();
    $(this).parent().find('div.hidden').fadeIn(300);
    $(this).hide();
  });


  // fixed menu

  $(window).scroll(function(e){
    if ($(this).scrollTop() > 150 ){
      $header.addClass('sticky');
    }else{
      $header.removeClass('sticky');
    }
  });

  // sticker

  var sticky_offset = $('.js-sticker').height();
  var footer_height = $('.footer').height();
  var sect_about = $('.s-about').height();

  $(".js-sticker").sticky({
    topSpacing: 100,
    bottomSpacing: sect_about + sticky_offset + footer_height + 450,
  });
  $(".js-sticker-about").sticky({
    topSpacing: 0,
    zIndex: -1,
  });

  // SEND mail


  $(document).on('submit', 'form', function (e){
    //console.log('form: отправляю..');
    var msg = $(this).serialize();

    var $name = $(this).find('[name=name]');
    var $phone = $(this).find('[name=phone]');
    var $email = $(this).find('[name=email]');
    //var $section = $form.find('[name=section]');

    var post_params = {
      name: $name.val(),
      phone: $phone.val(),
      email: $email.val(),
      //section: $section.val()
    };

    if(post_params.name !== undefined && !post_params.name.length) {
      $name.addClass('error');
      e.preventDefault();
      return message.error('Укажите ваше имя, пожалуйста!', 'warning');
    }
    if(post_params.phone !== undefined && !post_params.phone.length) {
      $phone.addClass('error');
      e.preventDefault();
      return message.error('Укажите ваш телефон, пожалуйста!', 'warning');
    }
    if(post_params.email !== undefined && !post_params.email.length) {
      $email.addClass('error');
      e.preventDefault();
      return message.error('Укажите вашу почту, пожалуйста!', 'warning');
    }

  });


  $(document).on('click', '.js-scr', function(e){
    e.preventDefault();
    var href = $(this).attr("href");
    var offsetTop = href === "#" ? 0 : $(href).offset().top-50;
    $('html, body').stop().animate({ scrollTop: offsetTop}, 700);
  });



  // MESSAGE

  var message = {
    error:  function (msg) {
      var cls = 'warning';
      message.init(msg,cls);
    },
    success:  function (msg) {
      var cls = 'success';
      message.init(msg,cls);
    },
    init: function(msg, cls) {
      $body.append('<div class="notice notice--'+cls
        +'" style="opacity:0;"><div class="wrapper">'+msg+'</div></div>');

      var height_notice = $('.notice').height();
      $('.notice').css('bottom', '-'+height_notice+'px');
      $('.notice').animate({
          bottom: 0,
          opacity: 1
      }, 300);

      message.close(3000);
      return false;
    },
    close: function(time) {
      function notice_hide() {
        $(".notice").animate({
          opacity: 0},
          500, function() {
            $(this).remove();
        });
        $('.input').removeClass('error');
      }
      setTimeout(notice_hide, time);
    }
  };



});


