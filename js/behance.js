$(function () {

	var beUsername = 'ArponDas', // Behance User ID
		beApiKey = 'HJBEESZg9Ek9BSopGmgYM5ZBctPfhWbh', // Behance API KEY
		bePerPage = 12, // Behance Show Perpage
		beProjectAPI = '//www.behance.net/v2/users/' + beUsername + '/projects?callback=?&api_key=' + beApiKey + '&per_page=' + bePerPage,
		beItemWidth = 360,
		beItemHeight = 300,
		beLazyLoad = true,
		beLinkTarget = '_self';

	/**
	 * Get Data from Behance API
	 */
	if (sessionStorage.getItem('behanceProject')) {
		setPortfolioTemplate();
	} else {
		// Load JSON-encoded data from the Behance API & Store it in sessionStorage
		$.getJSON(beProjectAPI, function (project) {
			sessionStorage.setItem('behanceProject', JSON.stringify(project));
			setPortfolioTemplate();
		});
	}

	/**
	 * Populate Data
	 */
	function setPortfolioTemplate() {
		var projects = JSON.parse(sessionStorage.getItem('behanceProject')).projects;
		var portfolio = $('.behance-gallery').html('');
		var items = '';
		var image = '';

		$.each(projects, function (i, val) {
			
			var $cats = val.fields,
				$t = $cats.toString(),
				$imgUrl = val.covers['404'];
			
			
			// If Lazy load is enabled, edit the markup accordingly
			beLazyLoad ? image = 'src="img/Loading.png" data-lazy="' + $imgUrl + '"' : image = 'src="' + $imgUrl + '"';
			

			// Create the items template
			items += '<div class="be__item be__item__' + val.id + ' col-md-4 col-sm-6 padding-none">';
			items += '<a href="' + val.url + '" title="' + val.name + '" class="single-project-item" target="' + beLinkTarget + '">';
			items += '<img class="full-width" ' + image + ' width="' + beItemWidth + '" height="' + beItemHeight + '" alt="' + val.name + '">';
			items += '<div class="grid-caption">';
			items += '<h2>' + val.name + '</h2>';
			items += '<p>' + $t + '</p>';
			items += '</div>';
			items += '</a>';
			items += '</div>';

			// How many items are shown
			return i < bePerPage;
		});

		// Append items only once
		portfolio.each(function (index, el) {
			$(el).append(items);
		});

		// Create Lazy Load instance for Grid Layout
		if (beLazyLoad) {
			var layzr = new Layzr({
				container: '.be__grid',
				selector: '[data-lazy]',
				attr: 'data-lazy'
			});
		}


	}

});