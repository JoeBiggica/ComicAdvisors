Template.sectionArticlesPage.helpers({
	section: function() {
		return Session.get("querySection");
	}
});

Template.paginationControls.helpers({
	controls: function() {
		if (this.page_number) {
			const next_page = this.page_number + 1;
			const control_url = '/articles/' + next_page.toString();
			let control_button = '<a href="' + control_url + '" ><div class="pagination-button dark">Previous Articles <span class="pagination-arrow">&#10095</span></div></a>'
			return control_button;
		} else {
			let control_button = '<a href="/articles/1" ><div class="pagination-button dark">Previous Articles <span class="pagination-arrow">&#10095</span></div></a>'
			return control_button;
		}
	}
})