var sidebarWidth,
    mapWidthLg = '80%',
    mapWidthMd = '70%',
    mapWidthSm = '65%',
    sidebarWidthLg = '20%',
    sidebarWidthMd = '30%',
    sidebarWidthSm = '35%',
    tmpMapWidth,
    tmpSidebarWidth;


$sidebarOptions = $('#sidebar-options');
$sidebarToggleIn = $('#sidebar-toggle-in');
$sidebarToggleOut = $('#sidebar-toggle-out');
$mapContainer = $('.map-container');


/**
 * sidebar toggle out
 */
$sidebarToggleOut.click(function (e) {
    e.preventDefault();

    sidebarWidth = $sidebarOptions.width();

    $sidebarOptions.animate({
        left: -sidebarWidth
    }, 500);

    $mapContainer.animate({
        width: "100%",
        left: "0%"
    }, 500, function () {
        google.maps.event.trigger(map, "resize");
    });

    $sidebarToggleIn.css({
        'display': 'block',
        'left': sidebarWidth
    });
});


/**
 * sidebar toggle in
 */
$sidebarToggleIn.click(function (e) {
    e.preventDefault();

    sidebarWidth = $sidebarOptions.width();

    $sidebarOptions.animate({
        left: 0
    }, 500);

    if (sidebarWidth >= sidebarWidthSm) {
        tmpSidebarWidth = sidebarWidthSm;
        tmpMapWidth = mapWidthSm;
    }
    else if (sidebarWidth >= sidebarWidthMd) {
        tmpSidebarWidth = sidebarWidthMd;
        tmpMapWidth = mapWidthMd;
    }
    else ( sidebarWidth >= sidebarWidthLg)
    {
        tmpSidebarWidth = sidebarWidthLg;
        tmpMapWidth = mapWidthLg;
    }

    $mapContainer.animate({
        width: tmpMapWidth,
        left: tmpSidebarWidth
    }, 500, function () {
        google.maps.event.trigger(map, "resize");
    });

    $sidebarToggleIn.css({
        'display': 'none'
    });

});
