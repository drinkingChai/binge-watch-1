angular.module('BikeTrainerShows')
  .filter('minutesToHours', function() {
    return function(minutes) {
      return Math.ceil(minutes / 60);
      // return Math.floor(minutes / 60) + " hour " + Math.floor((minutes % 60)) + " minutes";
    }
  });
