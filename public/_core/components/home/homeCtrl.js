app.controller('homeCtrl', function($ocLazyLoad) {
    $ocLazyLoad.load({
        serie: true, //If true load your files in serie otherwise parallel.
        cache: false, //reload when go back
        files: [
            'assets/home/css/animate.min.css',
            'assets/home/css/creative.css',
            'assets/home/js/jquery.easing.min.js',
            'assets/home/js/jquery.fittext.js',
            'assets/home/js/creative.js'
        ]
    });
});
