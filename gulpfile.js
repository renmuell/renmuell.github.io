var 
fs             = require('fs'),
jade           = require('jade'),
gulp           = require('gulp'),
gulpJade       = require('gulp-jade'),
data           = require('gulp-data'),
uglify         = require('gulp-uglify'),
less           = require('gulp-less'),
rename         = require("gulp-rename"),
concat         = require('gulp-concat'),
filter         = require('gulp-filter'),
sitemap        = require('gulp-sitemap'),
cleanCSS       = require('gulp-clean-css'),
inject         = require('gulp-inject-string'),
jsonTransform  = require('gulp-json-transform'),
webFontsBase64 = require('gulp-google-fonts-base64-css');

var rm_num_article_initial = 3;

var site_url = "https://renmuell.github.io/";
//var site_url = "http://localhost/renmuell.github.io/";
//var site_url = "http://192.168.178.38/renmuell.github.io/";

// path

var path = {
  src : {
    vendors: {
      fontawesome: {
        css: 'node_modules/@fortawesome/fontawesome-free/css/all.min.css',
        webfonts: 'node_modules/@fortawesome/fontawesome-free/webfonts/*.*'
      },
      rm_atmo: 'node_modules/rm_atmo/dist/rm_atmo.min.js',
      pureCheckboxToggle: 'assets/vendors/pureCheckboxToggle/pureCheckboxToggle.less'
    },
    pages:{
      index:{
        jade     : 'src/jade/index.jade',
        js: 'assets/js/index.js',
      },
      cv:{
        jade: 'src/jade/cv.jade',
      },
      articleTemplate:{
        jade: 'src/jade/article.jade',
      },
      settings:{
        jade: 'src/jade/settings.jade',
        js: 'assets/js/settings.js'
      }
    },
    less: 'assets/css/*.less',
    tweetjs: 'assets/js/tweet.js',
    playjs: 'assets/js/play.js',
    backgroundjs: 'assets/js/background.js',
    backgroundFirebasejs: 'assets/js/background.firebase.js'
  },
  build : {
    vendors: {
      fontawesome: {
        css: 'assets/vendors/fontawesome/css',
        webfonts: 'assets/vendors/fontawesome/webfonts',
      },
      rm_atmo: 'assets/vendors/rm_atmo',
      pureCheckboxToggle: 'assets/vendors/pureCheckboxToggle'
    },
    root      : './',
    articles : 'articles',
    css: 'assets/css',
    js: 'assets/js/'
  }
};

// Error

function onError(e) {
  console.error(e);
  this.emit('end');
}

gulp.task('fonts', function () {
	return gulp.src('./fonts.list')
      .pipe(webFontsBase64())
      .pipe(concat('web-fonts.css'))
      .pipe(cleanCSS())
      .pipe(gulp.dest(path.build.css));
});

gulp.task('js-index', function(){
  return gulp.src(path.src.pages.index.js)
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(path.build.js));
});

gulp.task('js-tweet', function(){
  return gulp.src(path.src.tweetjs)
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(path.build.js));
});

gulp.task('js-play', function(){
  return gulp.src(path.src.playjs)
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(path.build.js));
});

gulp.task('js-background', function(){
  return gulp.src(path.src.backgroundjs)
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(path.build.js));
});

gulp.task('js-background-firebase', function(){
  return gulp.src(path.src.backgroundFirebasejs)
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(path.build.js));
});

gulp.task('js-settings', function(){
  return gulp.src(path.src.pages.settings.js)
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(path.build.js));
});

gulp.task('js', [
  'js-index', 
  'js-settings', 
  'js-tweet', 
  'js-play', 
  'js-background', 
  'js-background-firebase'
]);

gulp.task('copy-fontawesome-css', function () {
  return gulp.src(path.src.vendors.fontawesome.css)
    .pipe(gulp.dest(path.build.vendors.fontawesome.css));
});

gulp.task('copy-fontawesome-webfonts', function () {
  return gulp.src(path.src.vendors.fontawesome.webfonts)
    .pipe(gulp.dest(path.build.vendors.fontawesome.webfonts));
});

gulp.task('copy-rm_atmo', function () {
  return gulp.src(path.src.vendors.rm_atmo)
    .pipe(gulp.dest(path.build.vendors.rm_atmo));
});

gulp.task('copy', ['copy-fontawesome-css','copy-fontawesome-webfonts','copy-rm_atmo']);

gulp.task('less-pureCheckboxToggle', function () {
  return gulp.src(path.src.vendors.pureCheckboxToggle)
    .pipe(less({
    }))
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest(path.build.vendors.pureCheckboxToggle));
});

gulp.task('less', ['less-pureCheckboxToggle'], function () {
  return gulp.src(path.src.less)
    .pipe(less({
    }))
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest(path.build.css));
});

gulp.task('json-article', function(callback) {
  gulp.src('./src/articles.json')
  .pipe(jsonTransform(function(data) {
    for (let index = 0; index < data.articles.length; index++) {
      if (fs.existsSync(data.articles[index].body)){
        data.articles[index].bodyShort = jade.compileFile(data.articles[index].body)({
          short: true,
          site_url:site_url
        });
        data.articles[index].body = jade.compileFile(data.articles[index].body)({
          short: false,
          site_url:site_url
        });
        data.articles[index].hasShort = data.articles[index].bodyShort.length != data.articles[index].body.length;
      }
    }
    return data;
  }))
  .on('error', onError)
  .pipe(gulp.dest(path.build.root))
  .on('end', callback);
});

gulp.task('json-render-article', ['json-article'], function() {
  gulp.src('./articles.json')
  .pipe(jsonTransform(function(data) {
    for (let index = 0; index < data.articles.length; index++) {
      var article = data.articles[index];
     
      article = jade.compileFile("src/jade/index/article.jade")({
        article: article,
        assetsRoot: "assets/",
        site_url: site_url,
        short: true
      });

      data.articles[index] = article;
    }
    return data;
  }))
  .pipe(rename({
    suffix: "-html"
  }))
  .on('error', onError)
  .pipe(gulp.dest(path.build.root));
});

gulp.task('json', ['json-render-article']);

// Jade
gulp.task('jade-index', ['json', 'less', 'js', 'copy', 'fonts'], function() {

  var jsonArticleHtml = require('./articles-html.json');

  gulp.src(path.src.pages.index.jade)
    .pipe(data(function(){
        var data = require('./articles.json');
        data.articles = data.articles.slice(0, rm_num_article_initial);
        data.assetsRoot = "assets/";
        data.site_url = site_url;
        data.short = true;
        return data;
    }))
    .pipe(gulpJade())
    .pipe(inject.before('</head>', '<script>var rm_num_article_initial='+rm_num_article_initial+';</script>'))
    .pipe(inject.before('</head>', '<script type="application/json" id="json-articles">'+JSON.stringify(jsonArticleHtml)+'</script>'))
    .on('error', onError)
    .pipe(gulp.dest(path.build.root))
});

gulp.task('jade-cv', ['less', 'copy', 'fonts'], function() {
  gulp.src(path.src.pages.cv.jade)
    .pipe(data(function(){
      return {
        assetsRoot: "assets/",
        site_url: site_url
      };
    }))
    .pipe(gulpJade())
    .on('error', onError)
    .pipe(gulp.dest(path.build.root))
});

gulp.task('jade-settings', ['less', 'copy', 'fonts'], function() {
  gulp.src(path.src.pages.settings.jade)
    .pipe(data(function(){
      return {
        assetsRoot: "assets/",
        site_url: site_url
      };
    }))
    .pipe(gulpJade())
    .on('error', onError)
    .pipe(gulp.dest(path.build.root))
});

gulp.task('jade-articles', ['json', 'less', 'copy', 'fonts'], function(){
  var json = require('./articles.json');
  json.articles.forEach(article => {
    gulp.src(path.src.pages.articleTemplate.jade)
    .pipe(data(function(){
        return {
          article: article,
          assetsRoot: "../assets/",
          site_url: site_url,
          short:false
        };
    }))
    .pipe(gulpJade())
    .pipe(rename({
      basename: article.id
    }))
    .on('error', onError)
    .pipe(gulp.dest(path.build.articles))
  });
});

gulp.task('sitemap', [
  'jade-index', 
  //'jade-cv', 
  'jade-articles', 
  'jade-settings'
], function () {
  gulp.src('./**/*.html', {
          read: false
      })
      .pipe(filter(['**', '!node_modules/**/*.html', '!googlecb90f9afdf8df537.html']))
      .pipe(sitemap({
          siteUrl: 'https://renmuell.github.io/'
      }))
      .on('error', onError)
      .pipe(gulp.dest(path.build.root));
});

gulp.task('default', ['build']);

gulp.task('build', [ 'sitemap']);
