var searchHighlight;
var docs = {}
var latestVer;
var desktopSize = true;
var mobileGlobal = false;
// Media query variables
const fullMobile = 550
const midMobile = 768
const desktop = 1178

// Determine environment
if (window.location.origin.indexOf('https://docs.skuid.com') > -1) {
  docs.env = "web"
} else {
  docs.env = "local"
}

//
// Mobile global TOC functions
var expandGlobalTOC = function() {
  $('.mobile-global-toc').addClass('expand');
  $('.mobile-global-toc').slideDown(300)
  $('#g-closedMenu').show()
  $('#g-openMenu').hide()
}
var collapseGlobalTOC = function() {
  $('#mobile-global #globaltoc').removeClass('expand');
  $('#mobile-global #globaltoc').slideUp(300)
  $('#g-closedMenu').hide()
  $('#g-openMenu').show()
}

// Not used for universal header
const moveSearchBar = function() {
  let searchBar = $('.navbar-search-form'),
    desktopSearchArea = $('#desktop-navbar-search'),
    mobileSearchArea =  $('#mobile-navbar-search');

  if (!desktopSize) {
    searchBar.appendTo(mobileSearchArea);
  } else {
    if ($('#landing-main').length == 1) {
      searchBar.appendTo($('#landing-search'))
    } else {
      searchBar.appendTo(desktopSearchArea);
    }
  }
}

//var elemsToShiftForMobileNav = '#landing-main, #docs-and-search-bar, #docs-and-search-bar h1, #landing-search h3, #main,.navbar-brand, .navbar-search-form, .breadcrumb-nav, #mobile-global, .sidebar-local'

var openMobileNav = function() {
  // Universal header ('#docs-site-nav').addClass('mobile-nav')
  //$(elemsToShiftForMobileNav).addClass('mobile-nav-active')
  $('.mobile-nav').removeClass('mobile-nav-hidden');
  $('body').addClass('no-scroll')
  $('#openmobilenav').attr('style','display:none;cursor:pointer').attr('aria-hidden','true')
  $('#closemobilenav').attr('style','display:block;cursor:pointer').attr('aria-hidden','false')
}
var closeMobileNav = function(){
  collapseGlobalTOC()
  // Universal header $('#docs-site-nav').removeClass('mobile-nav')
  //$(elemsToShiftForMobileNav).removeClass('mobile-nav-active')
  $('.mobile-nav').addClass('mobile-nav-hidden');
  $('body').removeClass('no-scroll')
  $('#closemobilenav').attr('style','display:none;cursor:pointer').attr('aria-hidden','true')
  $('#openmobilenav').attr('style','display:block;cursor:pointer').attr('aria-hidden','false')
}
var toggleSearchBar = function() {
  $(".navbar-search-form").animate({width:'toggle'});
  if ($('#searchbar-toggle').attr('aria-expanded') == false){
    $('#searchbar-toggle').attr('aria-expanded', 'true')
  } else {
    $('#searchbar-toggle').attr('aria-expanded', 'false')
  }
}
// Other functions
const addNewFeatureBadges = () => {
  document.querySelectorAll('.new-feature').forEach( el => {
    let nearestHeader = el.closest('.section').querySelectorAll("h1, h2, h3, h4, h5, h6")[0];
    nearestHeader.style.display = "inline";
    let newFeatureBadge = document.createElement('div');
    newFeatureBadge.classList.add('badge');
    newFeatureBadge.classList.add('badge--new-feature');
    newFeatureBadge.style.display = "inline";
    newFeatureBadge.innerText = "New";
    nearestHeader.append(newFeatureBadge);
    //nearestHeader.parentNode.insertBefore(newFeatureBadge,nearestHeader.nextSibling);
  })
};

var copyText = function(e, attr) {
  var copyBlock = document.createElement('input');
  copyBlock.setAttribute('display','none');
  copyBlock.value = attr;
  document.querySelector('body').appendChild(copyBlock);
  copyBlock.select();
  document.execCommand("Copy");
  copyBlock.remove();
}
var toggleSearchHighlighting = function() {
  if (searchHighlight){
    document.querySelectorAll('dt:target,.highlighted').forEach(function(e){$(e).addClass('transparent-bg')});
    $('#searchToggle').text("Search Term Highlighting: Off")
    searchHighlight = false;
  } else {
    document.querySelectorAll('dt:target,.highlighted,.transparent-bg').forEach(function(e){$(e).removeClass('transparent-bg')});
    $('#searchToggle').text("Search Term Highlighting: On")
    searchHighlight = true;
  }
}
var openedSections;
var cmdFOn;
var saveSectionsAndExpandAll = function(){
  openedSections = $('#main .collapsible').not('.collapsed');
  expandAll();
  cmdFOn = 1
}
var closeSectionsAndExpandSaved = function(){
  collapseAll();
  openedSections.click();
  cmdFOn = 0;
}
$(document).on("keydown", function (e) {
  if (e.keyCode == 70 && e.ctrlKey || e.keyCode == 70 && e.metaKey) {
    saveSectionsAndExpandAll();
  }
});
function toggleChildSections(event){
    toggleButton(event.target);
  }
function toggleButton(element) {
  var pressed = (element.getAttribute("aria-pressed") === "true");
  element.setAttribute("aria-pressed", !pressed);
  var target = $(element).parent().siblings()
  if (!pressed){
    $(element).text('Hide all sections')
    expandAll(target)
  } else{
    $(element).text('Show all sections')
    collapseAll(target)
  }
}
// Close and expand all button logic
function expandAll(target){
  if (!target) {var target = '#main'}
  $(target).find('.collapsible').not('.toc-collapsible-btn').siblings('.colsection').children().unwrap();
  $(target).find('.collapsible').not('.toc-collapsible-btn').siblings().slideDown(300);
  $(target).find('.collapsible').not('.toc-collapsible-btn').removeClass('collapsed');
  $(target).find('.collapsible').not('.toc-collapsible-btn').attr('aria-expanded','true')
  $(target).find('.collapsible').not('.toc-collapsible-btn').each(function addColSecAll(){$(this).siblings().wrapAll('<div class="colsection"></div>')});
  // ifins
  $(target).find('.collapsible-ifin').not('.toc-collapsible-btn').removeClass('collapsed');
  $(target).find('.collapsible-ifin').not('.toc-collapsible-btn').attr('aria-expanded','true')
  $(target).find('.collapsible-ifin').not('.toc-collapsible-btn').next('blockquote').slideDown(300);
}

function collapseAll(target){
  if (!target) {var target = '#main'}
  $(target).find('.collapsible').not('.toc-collapsible-btn').siblings('.colsection').children().slideToggle(300);
  $(target).find("span[id]").not('.toc-collapsible-btn').attr('style','display: none;')
  $(target).find('.collapsible').not('.toc-collapsible-btn').siblings('.colsection').children().unwrap();
  $(target).find('.collapsible').not('.toc-collapsible-btn').addClass('collapsed');
  $(target).find('.collapsible').not('.toc-collapsible-btn').attr('aria-expanded','false')
  // ifins
  $(target).find('.collapsible-ifin').not('.toc-collapsible-btn').addClass('collapsed');
  $(target).find('.collapsible-ifin').not('.toc-collapsible-btn').attr('aria-expanded','false')
  $(target).find('.collapsible-ifin').not('.toc-collapsible-btn').next('blockquote').slideUp(300);
}
// Version picker logic
function versionPick(p1,whichVal) {
  var clickedVer = p1.textContent;
  var pathArray = window.location.pathname.substring(1).split('/')
  var lastApiVer = ""
  var versionPath
  var verForUrl
  var apiForUrl
  var lastUrlVersion
  var userPath = ""
  var newPath = ""
  var numberOfVersions = 0
  var languageIndex = pathArray.indexOf('en')
  // In the future, have an array of supported languages, do forEach until you have an indexOf > -1

  // Parsing the current URL
  pathArray.forEach(function(e,i){
    let versionStringRegex = /^v(\d*\.)*\d*$|^latest$|^platform$|^staging$/
    if(versionStringRegex.test(e)) {
      numberOfVersions ++;
      lastUrlVersion = i
    }
  })
  var userPathArr = pathArray.splice(languageIndex+1)
  if (numberOfVersions === 2) {
    var versionIndex = languageIndex - 2
  } else {
     var versionIndex = languageIndex - 1
  }
  var apiIndex = versionIndex+1

   // Assembling the new URL
  for (i = 0; i < userPathArr.length; i++) {
      userPath += "/";
      userPath += userPathArr[i];
  }

  if (whichVal === "releaseVersion") {
    // Determine which API version to use
    // Get latest API version for release
    Object.entries(docs.allApiVersions).forEach(function(apiV){
      if (apiV[1].releases.indexOf(clickedVer) > -1) {
        lastApiVer = apiV[0]
      }
    })
    // If the user already has an API version selected, keep it
    if (numberOfVersions === 2) {
      apiForUrl = pathArray[lastUrlVersion]
    } else {
      apiForUrl = lastApiVer
    }
    if (numberOfVersions === 2) {
      if (lastApiVer != "") {
        // add everything together
        pathArray[versionIndex] = clickedVer
        pathArray[versionIndex+1] = apiForUrl
      } else {
        // If the release doesn't support API versions, remove that URL path
        pathArray[versionIndex] = clickedVer
        pathArray.splice(versionIndex+1,1)
      }
    } else {
      if (lastApiVer != "") {
        // add everything together
        pathArray[versionIndex] = clickedVer
        // add apiForUrl into array
        pathArray.splice(versionIndex+1,0,"v" + apiForUrl)
      } else {
        // If the release doesn't support API versions, only change the version Index
        pathArray[versionIndex] = clickedVer
      }
    }
  }
  if (whichVal === "apiVersion") {
   apiForUrl = clickedVer
   if (numberOfVersions === 2) {
      pathArray[apiIndex] = apiForUrl
    } else {
      pathArray.splice(apiIndex,0,apiForUrl)
    }
  }

  for (i = 0; i < pathArray.length; i++) {
    newPath += "/";
    newPath += pathArray[i];
  }
  var newUrl = window.location.origin + newPath + userPath
  window.location.href = newUrl
}

function goToLatest(){
  var clickedVer = 'latest';
  var hostAndVer = "docs.skuid.com\/"
  var fullURL = hostAndVer.concat(clickedVer,"\/")
  var siteVer = new RegExp("docs.skuid.com\/[^\/]+\/")
  window.location.href = document.location.href.replace(siteVer, fullURL)
}
var goToLatestElem = document.getElementById('goToLatest')
if(goToLatestElem){goToLatestElem.onclick = goToLatest}
var getVersions = function() {
    versionMenu = $('.versions-dropdown').siblings('.dropdown-menu')
    try {
        function reqListener () {
          docs.releases  = JSON.parse(this.responseText);
          let versionList = [];
          let unsupportedVersions = []
          Object.values(docs.releases).forEach(
            function(r) {
              // Check if the release is currently supported.
              if (r.supported == true)
                {
                  r.versions.forEach(function(v){versionList.push(v)})
                } else {
                  r.versions.forEach(function(v){unsupportedVersions.push(v)})
                }
              }
          )
          // Reverse list so most recent is first.
          docs.versions = versionList.reverse()
          docs.unsupportedVersions = unsupportedVersions.reverse() 
        }

        var vUrl = "/versions.json"
        var vReq = new XMLHttpRequest();
        vReq.addEventListener("load", reqListener);
        vReq.open("GET", vUrl);
        vReq.onload = function (e) {
          if (vReq.readyState === 4) {
            if (vReq.status === 200) {
                latestVer = docs.versions[0]
                docs.versions.forEach(function(vNum){
                  var vItem = document.createElement('a')
                  vItem.className = 'dropdown-item'
                  vItem.setAttribute('href','#')
                  vItem.setAttribute('onclick','versionPick(this, "releaseVersion")')
                  vItem.innerText = vNum
                  try {
                      versionMenu.not('#unsupportedVersionsList').append(vItem)
                    } catch(e){}
                })
              // var unsupportedVElem = document.createElement('a')
              // unsupportedVElem.className = 'dropdown-item'
              // unsupportedVElem.id = 'unsupportedMenu'
              // unsupportedVElem.setAttribute('onmouseover','$("#unsupportedVersionsList").show();$("#unsupportedMenu").attr("aria-expanded","true")')
              // unsupportedVElem.innerText = "Unsupported Versions"
              // unsupportedVElem.setAttribute('aria-haspopup',"true" )
              // unsupportedVElem.setAttribute('aria-expanded',"false")
              // versionMenu.not('#unsupportedVersionsList').append(unsupportedVElem)
              versionCheck()
              // Create unsupported versions also
              // docs.unsupportedVersions.forEach(function(vNum){
              //     var vItem = document.createElement('a')
              //     vItem.className = 'dropdown-item'
              //     vItem.setAttribute('href','#')
              //     vItem.setAttribute('onclick','versionPick(this,"releaseVersion")')
              //     vItem.innerText = vNum
              //     try {
              //         $('#unsupportedVersionsList').append(vItem)
              //       } catch(e){}
              //   })
              // $('#unsupportedMenu').append($('#unsupportedVersionsList'))
            } else {
              console.error(vReq.statusText);
            }
          }
        };
        vReq.send();
      }
      catch(e){}
};
var versionCheck = function() {
  docs.versionName = window.location.pathname.substring(1).split('/')[0]
  docs.verNum = $('#verNum')[0].innerText
  if($('#apiVerNum')){
    docs.apiVerNum = $('#apiVerNum')[0].innerText
  }
  if(docs.versionName != "latest" && docs.verNum != latestVer &&  docs.versionName != "latest" && verNum != "vplatform") {
    isLatest = false;
  } else {
    isLatest = true;
  }
}
var getApiVersions = function(verNum) {
    apiVersionMenu = $('.versions-api-dropdown').siblings('.dropdown-menu')
    try {
      var versionList = []
      function reqListener () {
        docs.allApiVersions = JSON.parse(this.responseText);
        Object.entries(docs.allApiVersions).forEach(
          function(r) {
            // Check if the release is currently supported.
            if (r[1].releases.includes(verNum) == true)
              {
                versionList.push("v" + r[0])
              }
            }
        )
        versionList.reverse()
      }
      var vUrl = "/api_versions.json"
      var vReq = new XMLHttpRequest();
      vReq.addEventListener("load", reqListener);
      vReq.open("GET", vUrl);
      vReq.onload = function (e) {
        if (vReq.readyState === 4) {
          if (vReq.status === 200) {
              versionList.forEach(function(vNum){
                var vItem = document.createElement('a')
                vItem.className = 'dropdown-item'
                vItem.setAttribute('href','#')
                vItem.setAttribute('onclick','versionPick(this, "apiVersion")')
                vItem.innerText = vNum
                try {
                    apiVersionMenu.append(vItem)
                  } catch(e){}
              })
          } else {
            console.error(vReq.statusText);
          }
        }
      };
      vReq.send();
    }
    catch(e){}
};

//////////////////
// On page load //
/////////////////

$( document ).ready(function() {
  window.onscroll = () => {
    navbarCheck();
  };
  let navbarCheck = () => {
    const fixedNavbar = document.querySelector(".navbar-fixed-top .nav-container");
    const shrinkLimit = 60 + fixedNavbar.offsetHeight;
    if (
      document.body.scrollTop >= shrinkLimit || // Safari
      document.documentElement.scrollTop >= shrinkLimit // Everything else
    ) {
      if (!fixedNavbar.classList.contains('nav-container-shrink')) {
        fixedNavbar.classList.add("nav-container-shrink");
      }
    } else {
      if (fixedNavbar.classList.contains('nav-container-shrink')) {
        fixedNavbar.classList.remove("nav-container-shrink");
      }
    }
  };
  // Determine active TOC
  try {
    var activeSection = $('.current').not('.toctree-l1 > ul.current').not('a');
    if(activeSection.last().children('ul').length){activeSection.last().children('ul').addClass('toc-active')} else {activeSection.last().parent().addClass('toc-active')}
  } catch(e){}
  // Embed Font Awesome CDN
  var scriptSource = 'https://use.fontawesome.com/685baec918.js';
  var scriptElem = document.createElement('script');
  scriptElem.type = 'text/javascript';
  scriptElem.src = scriptSource;
  document.head.appendChild(scriptElem);


  // Replace any fa-icon roles
  $('.fa-icon').each(function(){
    $(this).html('<i class="fa ' + $(this).html() + '" aria-hidden="true"></i>')
  })
  // Replace any ink-icon roles
  $('.ink-icon').each(function(){
    $(this).show()
    $(this).html('<i class="ink-icon-' + $(this).html() + '" aria-hidden="true"></i>')
  })
  $('.icon').each(function(){
    $(this).show()
    $(this).html('<img class="inline-icon" src="' + $('#docsUrl')[0].innerText + '/_static/icons/ink/' + $(this).html() + '.svg">')
  })

  // Highlight the currently active site section
  if (document.querySelector(".toctree-l1.current a")) {
    let activeSectionText = document.querySelector(".toctree-l1.current a").innerText;
    let navbarNavItems = document.querySelectorAll(".navbar-nav li");
    navbarNavItems.forEach((e) => {
    if (e.innerText == activeSectionText) {
      e.classList.add('active-section')
      }
    });
  }

 // Temp index fix
  $('a').each( function(a) {
    if (this.href.indexOf('index.html') > 0) {
      var minusIndex = this.href.replace(/index.html/i, '')
      $(this).attr('href', minusIndex)
    }
  })
  // Lightbox
  // Show proper cursor only if img
  $('.reference.internal').has("img").hover(function(){
    $(this).css("cursor", "zoom-in")
  });
  // Open Lightbox
  $('.reference.internal').has("img").on('click', function(e) {
    e.preventDefault();
    var image = $(this).attr('href');
    $('html').addClass('no-scroll');
    $('body').append('<div class="lightbox-opened"><img src="' + image + '"></div>');
  });

  // Close Lightbox
    $('body').on('click', '.lightbox-opened', function() {
    $('html').removeClass('no-scroll');
    $('.lightbox-opened').remove();
  });

  // Cards
  $('.card').hover(function() {
    $(this).addClass('card-hover')
    $(this).css("cursor", "pointer")
   }, function() {$(this).removeClass('card-hover') })
  $('.card').click(function() {
    window.location=$(this).find('a').attr('href');
    return false;
  })

  // Build version lists
  getVersions()
  getApiVersions($('#verNum')[0].innerText)

  // IMG style
  document.querySelectorAll('img').forEach(function(e) {e.removeAttribute('style');})
  //headerlinks
  var linkIcon = '<i class="fa fa-link" aria-hidden="true"></i>'
  document.querySelectorAll('.headerlink').forEach(function(e){e.innerHTML = linkIcon; e.setAttribute('title','Copy link to section'); e.setAttribute('onclick', 'copyText(this, this.href)');})
  // Search highlighting
  if (window.location.href.includes('highlight=')){
    searchHighlight = true
    $('#searchToggle').attr('style','display:inline-block');
  }
  //Quick find
  if (document.querySelector('#quickfind')) {$('#main, .g-menu-btn').click(function() {
    if ($('#quickfind').val().length == 0) {
      $('#globaltoc').children('ul').not('.current').hide()
      $("[class^='toctree']").not('.current').children('.toc-collapsible-btn').each(function() {
        tocTarget = this;
        tocCollapse();})
      }
    }
  )}
  ////////////////
  // Mobile TOC//
  ///////////////
  // Close mobile nav if user clicks into body
  // Commenting out since it's now a full screen menu
//   $('#app > .container, .navbar-search-form, #landing-main').click(function(){
//     if($('#app').not('.mobile-nav')){
//         // We're not calling the function here because we don't want to collapse the global TOC in case users are still mobile
//         $('.mobile-nav').css('right','-300px')
//         //$(elemsToShiftForMobileNav).removeClass('mobile-nav-active')
//         $('#closemobilenav').attr('style','display:none;cursor:pointer').attr('aria-hidden','true')
//         $('#openmobilenav').attr('style','display:block;cursor:pointer').attr('aria-hidden','false')
//       }})
  $(window).resize(function() {
    if ($(window).width() >= desktop) {
      if (!mobileGlobal) {
        expandGlobalTOC()
        mobileGlobal = true
        $('.navbar-nav').removeClass('mobile-nav')
        $('.navbar-nav').removeClass('mobile-nav-hidden')
      }
    }
    if ($(window).width() < desktop) {
      if (mobileGlobal) {
        collapseGlobalTOC()
        mobileGlobal = false
        $('.navbar-nav').addClass('mobile-nav')
        $('.navbar-nav').addClass('mobile-nav-hidden')
      }
    }
    if ($(window).width() >= midMobile) {
      if (!desktopSize) {
        desktopSize = true;
        closeMobileNav()
        moveSearchBar()
      }
    }
    if ($(window).width() < midMobile) {
      if (desktopSize) {
        desktopSize = false;
        moveSearchBar()
      }
    }
  })
  $('.g-menu-btn').click(function(){
    if ($('#mobile-global #globaltoc').hasClass('expand')){
        collapseGlobalTOC();
      } else {
        expandGlobalTOC();
      }
    })
  // Mobile local TOC functions
  $('#mobile-local #localtoc').children().not('#page-buttons').slideToggle(0);
  $('.menu-btn').click(function(){
    if ($('#mobile-local #localtoc').hasClass('expand')){
      $('#mobile-local #localtoc').removeClass('expand');
      $('#mobile-local #localtoc').children().not('#page-buttons').slideToggle(300);
      $('#closedMenu').show()
      $('#openMenu').hide()
      } else {
        $('#mobile-local #localtoc').addClass('expand');
        $('#mobile-local #localtoc').children().not('#page-buttons').slideToggle(300);
        $('#closedMenu').hide()
        $('#openMenu').show()
      }
    })
  // Hide empty TOCs on desktop
  if ($('ul.current > li > ul').children().length == 0) {
    $('ul.current > li > ul').hide();
  }
  // Hide empty mobile global TOC if no children
  if ($('ul.current').children().length == 0){
    $('.g-menu-btn').hide();
  }
  // Hide empty mobile slider menus
  if ($('#mobile-local #localtoc > ul > li').children().length == 1) {
    $('#mobile-local #localtoc > ul > li').hide();
    $('#mobile-local #localtoc-btn').hide();
  }
  // Hide mobile local TOC if no items besides title
  if ($('#mobile-local #localtoc').find('li').length <= 1) {
    $('#mobile-local').hide()
  }

  // Constructors
  $('.property').siblings('.descclassname').show()
  $('.property').hide()

  /////////////////////////
  // Expandable sections //
  /////////////////////////

  // Check for collapsible signaler
  $(':header:contains("[[]]")').html(function (i, t) {
    $(this).addClass('collapsible');
    return t.replace('[[]]', '<span class="hidden"> </span>');
  })
  $('.collapsible').addClass('collapsed');
  $('.collapsible').attr('aria-expanded','false')
  $('.collapsible').siblings().slideToggle(0);
  // Remove signaler from references—toc and in main
  $('.reference:contains("[[]]")').html(function (i, t) {
    return t.replace('[[]]', '<span class="hidden"> </span>');
  })

  // Make it clickable
  $('.collapsible').click( function() {
    if ($(this).hasClass('collapsed')){
      $(this).removeClass('collapsed');
      $(this).attr('aria-expanded','true')
      $(this).siblings().slideToggle(300);
      $("span[id]").attr('style','display: none;')
      $(this).siblings().not('span').wrapAll('<div class="colsection"></div>');
      $(this).after($(this).siblings(".colsection"));
    } else {
      $(this).addClass('collapsed');
      $(this).attr('aria-expanded','false')
      $(this).siblings('.colsection').children().slideToggle(300);
      $("span[id]").attr('style','display: none;')
      $(this).siblings('.colsection').children().unwrap();
    }
  });
  // init
  $('.ifin:contains("[[]]")').html(function (i, t) {
    $(this).parent().addClass('ifin collapsible-ifin');
    var ifin = $(this).text().replace('[[]]','')
    $(this).parent().text(ifin)
  })
  $('.collapsible-ifin').addClass('collapsed');
  $('.collapsible-ifin').attr('aria-expanded','false')
  $('.collapsible-ifin').next('blockquote').slideToggle(0);

  // click
  $('.collapsible-ifin').click( function() {
    if ($(this).hasClass('collapsed')){
      $(this).removeClass('collapsed');
      $(this).attr('aria-expanded','true')
      $(this).next('blockquote').slideToggle(300);
    } else {
      $(this).addClass('collapsed');
      $(this).attr('aria-expanded','false')
      $(this).next('blockquote').slideToggle(300);
    }
  });
  // Keyboard navigation for collapsible sections
  $(".collapsible").attr("tabindex", "0");
  $(".collapsible").on("keydown", function(e){
    if(e.which === 13){
      $(this).trigger("click");
    }
  });
  // Keyboard navigation for collapsible sections
  $(".collapsible-ifin").attr("tabindex", "0");
  $(".collapsible-ifin").on("keydown", function(e){
    if(e.which === 13){
      $(this).trigger("click");
    }
  });

  $('.show-all-child-sections').attr("role","button").attr("aria-pressed","false").attr("tabindex","0").attr("onclick","toggleChildSections(event)").attr("onKeyPress","expandChildSections(event)")
  // Remove unneeded TOC 1 button
  //$('li.toctree-l1 > button').remove()
  //$('li.toctree-l1 > a').remove()
  // Unhide section if user is referred its anchor
  function unhideCollapsed()
  {
    var anchorName = document.location.hash.substring(1);
    try {
      var collapsedAnchor = $("[id=" + anchorName + "]")
      expandAll(collapsedAnchor)
    } catch (e) {}
  }
  unhideCollapsed();

  // Unhide section if user changes hash in page
  $(window).on('hashchange', function(e){
   unhideCollapsed();
  });

  //////////////////////////
  // Guides dropdown menu //
  //////////////////////////

  $(".nav-dropdown").on("keydown", function(e){
    if(e.which === 13){
      $(this).toggleClass("showdrop");
      $(this).find('.nav-sub-menu').attr("aria-hidden", function(index, attr) {return attr == "true" ? "false" : "true"});
      $(this).find('.nav-sub-menu', this).toggle();
    }
  });

  // Guides dropdown
  var closeNavDropdown = function(nSM) {
    nSM.find('.nav-sub-menu').attr("aria-hidden", "true")
    nSM.find(".nav-sub-menu").fadeOut(400)
    nSM.removeClass("showdrop");
  }

  $(".nav-dropdown").click(function() {
    $(this).addClass("showdrop")
    $(this).find('.nav-sub-menu').attr("aria-hidden", "false")
    $(this).find(".nav-sub-menu").fadeIn(200);
  });

  var navDropdown = $('.nav-dropdown')
  var navSubMenu = navDropdown.find(".nav-sub-menu")

  // Hide sub-menu if user ignores it
  navSubMenu.mouseenter(function(){
    clearTimeout(navSubMenu.data('timeout'));
  }).mouseleave(function(){
      var timeout = setTimeout(function(){closeNavDropdown(navDropdown)}, 650);
      navSubMenu.data('timeout', timeout);
  });
  navDropdown.mouseenter(function(){
    clearTimeout(navSubMenu.data('timeout'));
  }).mouseleave(function(){
      var timeout = setTimeout(function(){closeNavDropdown(navDropdown)}, 650);
      navSubMenu.data('timeout', timeout);
  });

  // toc Nav
  function tocCollapse() {
    $(tocTarget).addClass('collapsed');
    $(tocTarget).attr('aria-expanded','false')
    $(tocTarget).siblings('ul').slideUp(slideTime);
  }
  function tocOpen() {
    $(tocTarget).removeClass('collapsed');
    $(tocTarget).attr('aria-expanded','true')
    $(tocTarget).siblings('ul').children('li').show();
    $(tocTarget).siblings('ul').slideDown(slideTime);
  }
  $("[class^='toctree']").has('ul').prepend("<button class=\"toc-collapsible-btn collapsible collapsed\" type=\"button\"></button>")
  slideTime = 0
  tocTarget = "#globaltoc .toc-collapsible-btn"
  tocCollapse()
  tocTarget = "#globaltoc .current > .toc-collapsible-btn"
  tocOpen()
  slideTime = 200
  $('.toc-collapsible-btn').click(function() {
    tocTarget = this
    if ($(this).hasClass('collapsed') == true) {
      tocOpen();
    } else {
      tocCollapse();
    }
  })
  // TOC button color set
  $("[class^='toctree']").each(function() {
    if ($(this).css('background-color') == "rgb(255, 255, 255)") {
      $(this).find('.toc-collapsible-btn').css('color','#098297')}
  })

  // New feature badges
  // We do this so late because our other transformations could potentially move this badge around
  addNewFeatureBadges();

  // Quick find
  var setDisplayToContents = function(){$(".toctree-l1").css('display','contents');
      $("#globaltoc ul").css('display','contents');}
  $('#quickfind').click(function() {
     if ($('#quickfind').val().length === 0) {
      $('#globaltoc').find('*').not('.g-menu-btn').not('#globaltoc > ul').not('.toctree-l1').not('.toc-collapsible-btn').not('#g-closedMenu').not('#g-openMenu').show();
      setDisplayToContents()
      $('.toc-collapsible-btn').each(function () {
        tocTarget = this;
        tocOpen();
      })
    }
  })
  $('#quickfind').keydown(function() {
    $('.toc-collapsible-btn').each(function () { // Reopen collapsed sections so user understands why searches appear within them
        tocTarget = this;
        slideTime = 0;
        tocOpen();
        slideTime = 200;
      })
  })
  $('#quickfind').keyup(function() {
    var findFor = this.value.toLowerCase();
    $('#globaltoc .reference').each(function() {
      var itemLC = $(this).text().toLowerCase();
      (itemLC.indexOf(findFor) > -1) ? $(this).parents().not('.toctree-l1').show() : $(this).parent().hide();
      setDisplayToContents()
    })
  })
  // Check page buttons
  if (window.location.href.includes('search.html')) {$('#page-buttons').remove()}
  if (document.querySelectorAll('#main .section .collapsible').length > 1) {
    $('#showAll').attr('style','display:inline-block;');$('#hideAll').attr('style','display:inline-block;')
  }
  // Remove unneeded TOC 1 button
  $('#globaltoc > ul.current > li > button').remove()
  // Fix code literals that overflow
  $('code.literal').parent('p').css('overflow-wrap','break-word')
  // Check window size on load
  $(window).on("load", function(){
    collapseGlobalTOC()
    $('#mobile-local').insertAfter('#main h1 .headerlink').removeClass('hide')
    if ($(window).width() >= midMobile) {
      desktopSize = true
    }
    if ($(window).width() < midMobile) {
      desktopSize = false
      // Put searchbar in it proper place
      moveSearchBar()
    }
    if ($(window).width() < desktop) {
      // Add mobile-nav class if needed on page load
      $('.navbar-nav').addClass('mobile-nav')
      $('.navbar-nav').addClass('mobile-nav-hidden')
      // Put searchbar in it proper place
      moveSearchBar()
    }
  });
})
