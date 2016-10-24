/*
 * grunt-buddha-fany
 * https://github.com/mucang/grunt-buddha
 *
 * Copyright (c) 2016 
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('buddha_fany', 'The best Grunt plugin ever.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      // punctuation: '.',
      // separator: ', '
      who: 'alpaca',
      commentSymbol: '//'
    });

    var testExistRegexMap = {
      buddha: /buddha/,
      alpaca: /alpaca/
    };

    var who = options.who,
        commentSymbol = options.commentSymbol,
        commentFilePathMap = {
          buddha: 'buddha.txt',
          alpaca: 'alpaca.txt'
        },
        commentFilePath = path.join(__dirname, commentFilePathMap[who]),
        commentContent = grunt.file.read(commentFilePath),

        lineCommentArr = commentContent.split(grunt.util.normalizelf('\n'));

    lineCommentArr.forEach(function (value, index, arr) {
      arr[index] = commentSymbol + value;
    });

    commentContent = lineCommentArr.join(grunt.util.normalizelf('\n'))

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        var originalFileContent = grunt.file.read(filepath),
            newFileContent = commentContent + grunt.util.normalizelf('\n')+ originalFileContent;

        if(testExistRegexMap[who].test(originalFileContent)){
          return;
        }

        grunt.file.write(filepath, newFileContent);
        // return grunt.file.read(filepath);
      })
          //.join(grunt.util.normalizelf(options.separator));

      // Handle options.
      // src += options.punctuation;

      // Write the destination file.
      //grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
