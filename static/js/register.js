function bindEmailCaptchaClick(){
    $("#captcha-btn").click(function (event) {
        var $this = $(this);
        event.preventDefault();
        var email = $("#email").val();
        $.ajax({
            url:"/captcha/mail?email="+email,
            method:"GET",
            success:function (result) {
                var code = result['code'];
                if (code === 200){
                    var countdown = 60;
                    $this.off("click");
                    var timer= setInterval(function (){
                        $this.text(countdown);
                        countdown -= 1;
                        if (countdown <= 0){
                            clearInterval(timer);
                            $this.text("发送验证码");
                            bindEmailCaptchaClick();
                        }
                    },1000);
                }else {
                    alert(result['message']);
                }
            },
            fail:function (error){
                console.log(error);
            }
        })

    });
}




$(function () {
    bindEmailCaptchaClick();
});