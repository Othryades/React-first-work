module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    aws: grunt.file.readJSON('aws-keys.json'),
    aws_s3: {
      options: {
        accessKeyId: '<%= aws.AWSAccessKeyId %>', // Use the variables
        secretAccessKey: '<%= aws.AWSSecretKey %>', // You can also use env variables
        region: 'us-east-2', // http://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region
        uploadConcurrency: 5, // 5 simultaneous uploads
        downloadConcurrency: 5 // 5 simultaneous downloads
      },
      staging: {
        options: {
          bucket: 'top10doctors.co.il',
          differential: true, // Only uploads the files that have changed
          gzipRename: 'ext' // when uploading a gz file, keep the original extension
        },
        files: [
          {cwd: 'public/', dest: 'data.json', action: 'download'}, // download the most current data
          {cwd: 'public/images/', dest: 'images/', action: 'download'}, // download the most current data
          // {expand: true, cwd: 'build/', src: ['**'], dest: '/', action: 'upload'} 
        ]
      }
    }

  });

  grunt.loadNpmTasks('grunt-aws-s3');

  // grunt.registerTask('build', ['jshint', 'htmlmin']);
  grunt.registerTask('upload', ['aws_s3']);

};

// doctors.leadhim.co.il