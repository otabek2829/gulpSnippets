const gulp  = require("gulp") 
const autoprefixer = require('gulp-autoprefixer'); // Eski  Browserlarga kodlarni moslashtirib beradi 
const csso = require('gulp-csso'); //Kodlarni bir qatorga otkazish
var rename = require("gulp-rename"); // Bir Qatorli kodlarni fayl nomini style.min.css qilib beradi
const gcmq = require('gulp-group-css-media-queries'); // Media Kodlarni oxirgi qatorga olib boradi
const watch = require('gulp-watch');
const browserSync = require('browser-sync').create(); //Live Server telefon orqali online tekshirsa boladi
const plumber = require('gulp-plumber'); // Xatoliklarni qayerda ekanigini korsatib beardi
const sourcemaps = require('gulp-sourcemaps'); // Css Xarita Yaratish
const less = require('gulp-less');

gulp.task('style', style)

function style (){
    return gulp.src("./app/precss/style.less") // 1 qadam chernovik fayldagi narslarni olish 

    .pipe(sourcemaps.init()) //Css Xarita Yaratish

    .pipe(less())

    .pipe(plumber()) // Xatolarni Topib Berish

    
    .pipe(autoprefixer({ 
        browsers: ["last 10 versions"] ,// Browserni eng songgi versiyasiga moslashtirib beradi
        cascade: false // Probelni olib qoyadi 
    }))

    .pipe(gcmq()) // Media KOdlarni sortirofka qilib beradi

    .pipe(gulp.dest("./app/css")) // Toza Kodlarni Saqlab oladi

    .pipe(csso()) //Bir qator qilib beradi

    .pipe(rename({ // style.min.css qiib fayl ochib beradi
        suffix: ".min",
      }))
      .pipe(sourcemaps.write(".")) // qo'shtirnoq ichida .nuqta bilan yozish alohida faylga map xarita faylni saqlaydi 

    .pipe(gulp.dest("./app/css")) // 2 qadam belavoyga ulash
    .pipe(browserSync.stream()); // live browser ishlaydi obnovit qilish shart emas

}

//Ozgarishlarni Kuzatish

gulp.task('watch', function(){
    watch('./app/precss/', style) // barcha turdagi less faylarni tekshir degan buyruq berdik
    watch('./app/index.html', browserSync.reload) // Index.html ichidagi bo'ladigan o'zgarishlarni srazi ekranga chiqarib bergin degan buyruq berildi 
    watch('./app/img/*.*', browserSync.reload) // * barcha turdagi rasmlar nazarda tutilyabdi *- barcha degan manoni bildiradi
})

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });
});

gulp.task('default' , gulp.parallel('style', 'watch', 'server' )) // 3 taskni bitta gulp.ga uladim
