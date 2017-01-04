angular.module('BikeTrainerShows')
  .controller('MovieIndexController', function($scope, sources, sortOptions, User, Movie, Search, SearchById) {
    $scope.sort = 'runtime_ascending';
    $scope.movies = [];
    $scope.genres = {};
    $scope.sortedGenres = [];
    $scope.genreCheckbox = {};
    $scope.sources = sources.all;
    $scope.sources.sort();
    $scope.source = null;
    $scope.propertyName = null;
    $scope.sortOptions = sortOptions.all;
    $scope.scrollDisabled = false;
    // $scope.userWatchlist = [];

    User.getUser().then(function success(response) {
      $scope.user = response.data;
      // $scope.userWatchlist = response.data.movies;
    });

    $scope.addToChecklist = function(imdbid) {
      // if ($scope.user !== null) {
      //   // $scope.userWatchlist.push(imdbid);
      // }
      User.addMovie(imdbid);
    }

    Movie.query().$promise.then(function(allMovies) {      var allGenres = [];
      for (var i = 0, l = allMovies.length; i < l; i++) {
        SearchById.get({id: allMovies[i].imdbid}).$promise.then(function(data) {
          $scope.movies.push(data);

          data.genres.forEach(function(genre) {
            if (!(genre in $scope.genres)) {
              $scope.sortedGenres.push(genre);
              $scope.sortedGenres.sort();
            }
            $scope.genres[genre] = false;
          })
        });

      }
    });

    $scope.addMovie = function(imdbid, source, blurb) {
      var newMovie = new Movie();
      newMovie.imdbid = imdbid;
      newMovie.source = source || false;
      newMovie.blurb = blurb || false;
      newMovie.$save();
      $scope.movies.push({
        imdbid: imdbid,
        source: source
      });
    }


    $scope.deleteMovie = function(imdbid) {
      Movie.delete({id: imdbid});
    }

    $scope.toggleGenre = function(genre) {
      $scope.genres[genre] = !$scope.genres[genre];
    }

    $scope.toggleDetails = function(imdbid) {
      $scope.currentMovie = imdbid;
      $scope.scrollDisabled = !$scope.scrollDisabled;
    }

    $scope.resetGenre = function() {
      for (var genre in $scope.genres) {
        $scope.genres[genre] = false;
        $scope.genreCheckbox[genre] = false;
      }
      $scope.source = null;
      $scope.search
    }

    $scope.sortBy = function(propertyName) {
      $scope.propertyName = propertyName;
    }

    $scope.setSource = function(source) {
      $scope.source = source;
    }

  });
