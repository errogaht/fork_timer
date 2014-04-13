/**
 * Created by 7018407@gmail.com on 11.04.14.
 */
 function fork_timer (toHide) {
    $('.fork-timer').each(function() {
        var $this = $(this);
        var timerName = $this.attr('id');
        var banTime = $this.attr('b');
        var finalDate = $this.attr('data-countdown');
        var now = new Date();
        now = now.valueOf();
        var blockWithSpecial = $(toHide).has($this);

        function frkcwtdwn_ban() {
            $.cookie.destroy(timerName);
            now = new Date();
            now = now.valueOf();
            $.cookie.write(timerName + 'b', banTime*1000+now, 60 * 24 * 60 * 60);
        };
        function frkcwtdwn_unban() {
            now = new Date();
            now = now.valueOf();
            $.cookie.destroy(timerName + 'b');
            cookie = finalDate*1000 + ';' + now;
            $.cookie.write(timerName, cookie, 60 * 24 * 60 * 60);
            var timeEND = finalDate*1000 + now;
            $this.countdown(timeEND);
            frkcwtdwn_show();
        };
        function frkcwtdwn_show() {
            blockWithSpecial.fadeIn();

        };
        function frkcwtdwn_hide() {
            blockWithSpecial.fadeOut();
        };

        $this.countdown(finalDate*1000 + now)
            .on('finish.countdown',
            function(event) {
                frkcwtdwn_hide();
                frkcwtdwn_ban();
            })
            .on('update.countdown',
            function(event) {
                $this.html(event.strftime(''
                    + '<span>%D</span>дн. '
                    + '<span>%H</span>:'
                    + '<span>%M</span>:'
                    + '<span>%S</span>'));
            });
        if (!$.cookie.read(timerName + 'b')) { //if user not banned for this timer----------------
            if ($.cookie.read(timerName)) { //if have cookies data for this timer
                var cookie = $.cookie.read(timerName).split(";");
                var last_time = cookie[1];
                var last_time_left = cookie[0];

                var time_gone = now - last_time;
                var remain_time = last_time_left - time_gone;
                if (remain_time > 0) {
                    cookie = remain_time + ';' + now;
                    $.cookie.write(timerName, cookie, 60 * 24 * 60 * 60);
                    var timeEND = remain_time + now;
                    $this.countdown(timeEND);
                    frkcwtdwn_show();
                }
                else { //must be banned
                    frkcwtdwn_ban();
                };
            }
            else { //user first time view page - dont have a cookies
                //cookie template "time_left;now"
                var cookie = finalDate * 1000 + ';' + now;
                $.cookie.write(timerName, cookie, 60 * 24 * 60 * 60);
                frkcwtdwn_show();
            };
        }
        else { //if user have banning cookie
            if (now > $.cookie.read(timerName + 'b')) {
                frkcwtdwn_unban();
            };
        };

    });
 }
