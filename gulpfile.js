
var gulp =        require('gulp');
var gutil =       require('gulp-util');
var concat =      require('gulp-concat');
var connect =     require('gulp-connect');
var cache =       require('gulp-cache');
var minifyCss =   require('gulp-minify-css');
var sourcemaps =  require('gulp-sourcemaps');
var less =        require('gulp-less');
var jshint =      require('gulp-jshint');
var uglify =      require('gulp-uglify');

gulp.task('default',['less','javascript', 'watch', 'connectOnDev']);

// Task para assistir mudanças em arquivos
gulp.task('watch', function(){
  gulp.watch('app/*.html',function(){
    gulp.src('app/*.html')
    .pipe(connect.reload());
  });
  gulp.watch(['app/src/less/**/*.less'],['less']);
  gulp.watch('app/src/js/**/*.js',['javascript']);
});

// Task para compilar o less, concatenar os estilos num único arquivo, minificar e criar o sourcemap
gulp.task('less', function(){
    gulp.src('app/src/less/*.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .on('error', gutil.log)
        .pipe(minifyCss())
        .pipe(concat('application.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css/'))
        .pipe(connect.reload());
});

// Task que verifica erros, compila e minifica o JavaScript
gulp.task('javascript', function(){
  gulp.src('app/js/*.js')
  .pipe(sourcemaps.init())
    .pipe(uglify({
      mangle: false
    }))
    .on('error', gutil.log)
    .pipe(concat('application.min.js'))
    .pipe(sourcemaps.write()) // Cria o sourcemap intrínseco ao application
    .pipe(gulp.dest('app/js/'))
    .pipe(connect.reload());
});

gulp.task( 'connectOnDev', function() {
  connect.server({
    root: 'app',
    port: 8080,
    livereload: true
  });
});
