$(function(){$(".cta-btn-container").hide();var n=$(".course-unit");n.on("click","li",function(){$(this).children("a").get(0).click()}),n.on("click","h4",function(){var n=$(this);n.siblings("ul").eq(0).slideToggle(300),n.toggleClass("open"),n.find(".fa-2x").toggleClass("fa-angle-right").toggleClass("fa-angle-down")})});