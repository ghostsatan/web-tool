 $(document).ready(function(){
     $('.bodyBg').height($(window).height());
     $('.time-table .tabs').click((function () {
         $(this).addClass('show').siblings().removeClass('show');
     }))
 })