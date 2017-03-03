'use strict';


/* NPM PACKAGE */
var gulp            =   require('gulp')
    , browserSync   =   require('browser-sync').create()
    , del           =   require('del')
    , watch         =   require('gulp-watch');


/* GULP PATH [module] */
var command         =   require('./gulpTemplate/gulp-command.js')
    , taskStyle     =   require('./gulpTemplate/gulp-style.js')
    , taskJade      =   require('./gulpTemplate/gulp-jade.js')
    , taskJs        =   require('./gulpTemplate/gulp-js.js')
    , taskSprite    =   require('./gulpTemplate/gulp-sprite.js')
    , taskImage     =   require('./gulpTemplate/gulp-image.js')
    , config        =   require('./gulpTemplate/gulp-config.js');



taskJs.mainScriptTask(command.buildScript);
taskSprite.imageSprites(command.sprites);
taskImage.mainImageTask(command.buildImg);


/* WATCH FILES FOR RELOAD ---> 'GULP WATCH'*/
gulp.task(command.watch, function() {

    var srcWatchSCSS = [
        './src/scss/**.scss',
        './src/scss/**/**.scss',
        './src/scss/**/**/**.scss',
        './src/scss/**/**/**/**.scss'
    ];
    var srcWatchJADE = [
        './src/jade/**.jade',
        './src/jade/**/**.jade',
        './src/jade/**/**/**.jade',
        './src/jade/**/**/**/**.jade'
    ];
    var srcWatchJSON = ['./src/_data/*.json'];
    var srcWatchJS   = ['./src/js/**.js'];
    var srcWatchICON = ['./src/icons/**.png'];
    var srcWatchIMG  = ['./src/image/*'];

    var watcherScss = gulp.watch(srcWatchSCSS);
    var watcherJade = gulp.watch(srcWatchJADE);

    watcherScss.on('change', function(event) {
        // console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        taskStyle.styleMainTask(command.buildScss, event.path);
        gulp.start(command.buildScss);
    });
    watcherJade.on('change', function(event) {
        // console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        taskJade.jadeMainTask(command.buildJade, event.path);
        gulp.start(command.buildJade);
    });

    watch(srcWatchJADE, function() {
        gulp.start(command.buildJade);
    });
    watch(srcWatchJS, function() {
        gulp.start(command.buildScript)
    });
    watch(srcWatchJSON, function() {
        gulp.start(command.buildJade);
    });
    watch(srcWatchICON, function() {
        gulp.start(command.sprites)
    });
    watch(srcWatchIMG, function() {
        gulp.start(command.buildImg);
    });
});


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        },
        online      : true,
        notify      : true,
        port        : 1234,
        logPrefix   : 'FrontEnd Server'
    });
});


{
	gulp.task(command.build,
        config.mainConfig.build.arr
	);
}


{
    gulp.task(command.cleanImage, function() {
        del.sync('./src/image/*');
    });
}